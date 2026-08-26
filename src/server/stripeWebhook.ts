// POST /api/stripe/webhook — single endpoint for all Stripe events.
// Verifies the signature, enforces idempotency via the webhook_events table,
// then routes by metadata.kind ('shop-order' | 'booking').

import { confirmBooking, failBooking } from "./booking.ts";
import type { Env } from "./env.ts";
import { json } from "./lib/http.ts";
import { verifyStripeSignature, type StripeEvent } from "./lib/stripe.ts";
import { failShopOrder, fulfillShopOrder } from "./shop.ts";

export const handleStripeWebhook = async (request: Request, env: Env): Promise<Response> => {
  if (request.method !== "POST") {
    return json({ received: false, message: "Method not allowed." }, 405, { Allow: "POST" });
  }

  if (!env.STRIPE_WEBHOOK_SECRET || !env.DB) {
    console.error("[webhook] not configured");
    return json({ received: false }, 500);
  }

  const signature = request.headers.get("stripe-signature") ?? "";
  const payload = await request.text();

  const valid = await verifyStripeSignature(payload, signature, env.STRIPE_WEBHOOK_SECRET);
  if (!valid) {
    console.warn("[webhook] invalid signature");
    return json({ received: false, message: "Invalid signature." }, 400);
  }

  let event: StripeEvent;
  try {
    event = JSON.parse(payload) as StripeEvent;
  } catch {
    return json({ received: false, message: "Invalid payload." }, 400);
  }

  if (!event.id || !event.type) {
    return json({ received: false, message: "Invalid event." }, 400);
  }

  // Idempotency: first writer wins; duplicates get a clean 200.
  try {
    await env.DB.prepare("INSERT INTO webhook_events (id) VALUES (?)").bind(event.id).run();
  } catch {
    return json({ received: true, duplicate: true });
  }

  try {
    const object = event.data?.object ?? {};

    if (event.type === "payment_intent.succeeded") {
      const kind = String((object.metadata as Record<string, unknown> | undefined)?.kind ?? "");
      if (kind === "shop-order") await fulfillShopOrder(env, object);
      else if (kind === "booking") await confirmBooking(env, object);
      else console.warn("[webhook] payment_intent.succeeded with unknown kind", { id: event.id, kind });
    } else if (event.type === "payment_intent.payment_failed") {
      const kind = String((object.metadata as Record<string, unknown> | undefined)?.kind ?? "");
      if (kind === "shop-order") await failShopOrder(env, object);
      else if (kind === "booking") await failBooking(env, object);
    }
    // Other event types are acknowledged and ignored.
  } catch (error) {
    console.error("[webhook] handler failed", { id: event.id, type: event.type, error: String(error) });
    // 500 → Stripe retries; the idempotency row makes retries safe.
    await env.DB.prepare("DELETE FROM webhook_events WHERE id = ?").bind(event.id).run();
    return json({ received: false }, 500);
  }

  return json({ received: true });
};
