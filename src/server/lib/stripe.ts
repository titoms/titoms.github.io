// Stripe client — fetch-based (no stripe npm package), Workers-safe.
// Webhook signature verification uses WebCrypto HMAC-SHA256.

import { hexEncode, timingSafeEqual } from "./tokens.ts";

const STRIPE_API = "https://api.stripe.com/v1";
const encoder = new TextEncoder();

export interface StripeEnv {
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
}

export interface PaymentIntentInput {
  amountCents: number;
  currency?: string;
  metadata: Record<string, string>;
  receiptEmail?: string;
  description?: string;
}

export interface PaymentIntentResult {
  ok: boolean;
  status: number;
  id?: string;
  clientSecret?: string;
  error?: string;
}

export const createPaymentIntent = async (
  env: StripeEnv,
  input: PaymentIntentInput,
): Promise<PaymentIntentResult> => {
  if (!env.STRIPE_SECRET_KEY) {
    return { ok: false, status: 0, error: "stripe not configured" };
  }

  const params = new URLSearchParams();
  params.set("amount", String(input.amountCents));
  params.set("currency", input.currency ?? "eur");
  params.set("automatic_payment_methods[enabled]", "true");
  if (input.receiptEmail) params.set("receipt_email", input.receiptEmail);
  if (input.description) params.set("description", input.description);
  for (const [key, value] of Object.entries(input.metadata)) {
    params.set(`metadata[${key}]`, String(value).slice(0, 500));
  }

  try {
    const response = await fetch(`${STRIPE_API}/payment_intents`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const body = (await response.json().catch(() => null)) as Record<string, unknown> | null;
    if (!response.ok || !body) {
      const error =
        body && typeof body.error === "object" && body.error !== null
          ? String((body.error as Record<string, unknown>).message ?? "stripe error")
          : "stripe error";
      console.error("[stripe] payment_intent create failed", { status: response.status, error });
      return { ok: false, status: response.status, error };
    }

    return {
      ok: true,
      status: response.status,
      id: String(body.id),
      clientSecret: String(body.client_secret),
    };
  } catch (error) {
    console.error("[stripe] network error", { error: String(error) });
    return { ok: false, status: 0, error: "network error" };
  }
};

export const cancelPaymentIntent = async (
  env: StripeEnv,
  paymentIntentId: string,
): Promise<void> => {
  if (!env.STRIPE_SECRET_KEY) return;
  try {
    await fetch(`${STRIPE_API}/payment_intents/${encodeURIComponent(paymentIntentId)}/cancel`, {
      method: "POST",
      headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` },
    });
  } catch (error) {
    console.error("[stripe] cancel failed", { paymentIntentId, error: String(error) });
  }
};

/**
 * Verifies a Stripe webhook signature header (`t=...,v1=...[,v1=...]`).
 * See https://docs.stripe.com/webhooks/signature
 */
export const verifyStripeSignature = async (
  payload: string,
  signatureHeader: string,
  secret: string,
  toleranceSeconds = 300,
): Promise<boolean> => {
  let timestamp = "";
  const signatures: string[] = [];

  for (const item of signatureHeader.split(",")) {
    const idx = item.indexOf("=");
    if (idx < 0) continue;
    const key = item.slice(0, idx).trim();
    const value = item.slice(idx + 1).trim();
    if (key === "t") timestamp = value;
    if (key === "v1") signatures.push(value);
  }

  if (!timestamp || signatures.length === 0) return false;

  const ageSeconds = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
  if (!Number.isFinite(ageSeconds) || ageSeconds > toleranceSeconds) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const expected = hexEncode(
    await crypto.subtle.sign("HMAC", key, encoder.encode(`${timestamp}.${payload}`)),
  );

  return signatures.some((sig) => timingSafeEqual(expected, sig));
};

export interface StripeEvent {
  id: string;
  type: string;
  data: { object: Record<string, unknown> };
}
