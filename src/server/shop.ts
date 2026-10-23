// Shop API: catalog, coupons, PaymentIntents, orders, wishlist, downloads.
// Prices are ALWAYS recomputed server-side from src/config/products.ts.

import { PRODUCTS, formatPrice, getProduct } from "../config/products.ts";
import { getSessionCustomer } from "./auth.ts";
import type { Env } from "./env.ts";
import { tokenSecret } from "./env.ts";
import { json, readJson } from "./lib/http.ts";
import { emailButton, emailShell, sendEmail } from "./lib/mailer.ts";
import { newId, nowIso } from "./lib/db.ts";
import { createPaymentIntent } from "./lib/stripe.ts";
import { signToken, verifyToken } from "./lib/tokens.ts";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const MAX_QTY_PER_LINE = 5;
const DOWNLOAD_TOKEN_TTL_SECONDS = 7 * 24 * 3600; // 7 days
const MAX_CART_LINES = 50;

export const ORIGIN = "https://fullstackchris.dev";

const GENERIC_ERROR = "Something went wrong. Please try again later.";

// ---------- helpers ----------

const publicProduct = (id: string) => {
  const product = getProduct(id);
  if (!product) return null;
  const { fileKey: _fileKey, ...rest } = product;
  return rest;
};

interface CartLineInput {
  productId: string;
  qty: number;
}

const normalizeLines = (value: unknown): CartLineInput[] | null => {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_CART_LINES) return null;
  const lines: CartLineInput[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const { productId, qty } = item as Record<string, unknown>;
    if (typeof productId !== "string" || !getProduct(productId)) return null;
    const quantity = typeof qty === "number" && Number.isInteger(qty) ? qty : 1;
    if (quantity < 1 || quantity > MAX_QTY_PER_LINE) return null;
    lines.push({ productId, qty: quantity });
  }
  return lines;
};

const computeSubtotal = (lines: CartLineInput[]): number =>
  lines.reduce((sum, line) => sum + (getProduct(line.productId)?.priceCents ?? 0) * line.qty, 0);

const getCouponPercent = async (env: Env, code: string): Promise<number> => {
  if (!env.DB || !code) return 0;
  const row = await env.DB.prepare(
    "SELECT percent_off, active, expires_at FROM coupons WHERE code = ?",
  )
    .bind(code.toUpperCase())
    .first<{ percent_off: number; active: number; expires_at: string | null }>();
  if (!row || !row.active) return 0;
  if (row.expires_at && row.expires_at < nowIso()) return 0;
  return row.percent_off;
};

export const buildDownloadUrl = async (
  env: Env,
  orderId: string,
  productId: string,
): Promise<string> => {
  const token = await signToken({ orderId, productId }, tokenSecret(env), DOWNLOAD_TOKEN_TTL_SECONDS);
  return `${ORIGIN}/api/shop/download/${token}`;
};

const orderDownloads = async (env: Env, orderId: string) => {
  const lines = await env.DB!.prepare(
    "SELECT product_id FROM order_lines WHERE order_id = ?",
  )
    .bind(orderId)
    .all<{ product_id: string }>();

  return Promise.all(
    (lines.results ?? []).map(async (line) => {
      const product = getProduct(line.product_id);
      return {
        productId: line.product_id,
        title: product?.title ?? line.product_id,
        url: await buildDownloadUrl(env, orderId, line.product_id),
      };
    }),
  );
};

/** Best-effort Beehiiv subscribe for freebie claims (reuses newsletter conventions). */
const subscribeToNewsletter = async (env: Env, email: string, source: string): Promise<void> => {
  if (!env.BEEHIIV_API_KEY || !env.BEEHIIV_PUBLICATION_ID) return;
  const baseUrl = (env.BEEHIIV_API_BASE_URL || "https://api.beehiiv.com").replace(/\/+$/, "").replace(/\/v2$/i, "");
  try {
    await fetch(`${baseUrl}/v2/publications/${encodeURIComponent(env.BEEHIIV_PUBLICATION_ID)}/subscriptions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.BEEHIIV_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: false,
        utm_source: source,
        utm_medium: "organic",
        utm_campaign: "ai_clarity_newsletter",
        double_opt_override: "not_set",
      }),
    });
  } catch (error) {
    console.error("[shop] beehiiv subscribe failed", { error: String(error) });
  }
};

const sendOrderEmail = async (
  env: Env,
  order: { id: string; email: string; total_cents: number },
): Promise<void> => {
  const downloads = await orderDownloads(env, order.id);
  const listItems = downloads
    .map(
      (d) =>
        `<li style="margin:8px 0;"><strong>${d.title}</strong><br/><a href="${d.url}" style="color:#a78bfa;word-break:break-all;">Download</a></li>`,
    )
    .join("");

  await sendEmail(env, {
    to: order.email,
    subject: `Your order ${order.id.slice(0, 8)} — download links`,
    html: emailShell(
      "Thanks for your order!",
      `<p>Your order is confirmed. Your download links (valid 7 days):</p>
       <ul style="padding-left:18px;">${listItems}</ul>
       <p style="color:#a4a4af;font-size:13px;">Order reference: ${order.id} · Total: ${formatPrice(order.total_cents)}</p>
       <p style="color:#8f8f9d;font-size:13px;">Links expired? Sign in at fullstackchris.dev/shop/account with this email to regenerate them.</p>`,
    ),
  });
};

// ---------- route handlers ----------

const handleProducts = (): Response =>
  json({ products: PRODUCTS.map((p) => publicProduct(p.id)) });

const handleCouponValidate = async (request: Request, env: Env): Promise<Response> => {
  if (request.method !== "POST") {
    return json({ success: false, message: "Method not allowed." }, 405, { Allow: "POST" });
  }
  const body = await readJson(request);
  if (!body.ok) return body.response;

  const code = String(body.value.code ?? "").trim().toUpperCase();
  if (!code) return json({ valid: false, message: "Enter a coupon code." }, 200);

  const percentOff = await getCouponPercent(env, code);
  if (!percentOff) return json({ valid: false, message: "Invalid or expired code." }, 200);

  return json({ valid: true, code, percentOff });
};

const handlePaymentIntent = async (request: Request, env: Env): Promise<Response> => {
  if (request.method !== "POST") {
    return json({ success: false, message: "Method not allowed." }, 405, { Allow: "POST" });
  }
  if (!env.DB) return json({ success: false, message: "Service unavailable." }, 503);

  const body = await readJson(request);
  if (!body.ok) return body.response;

  const email = String(body.value.email ?? "").trim().toLowerCase();
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return json({ success: false, message: "Please enter a valid email address." }, 400);
  }

  const lines = normalizeLines(body.value.lines);
  if (!lines) {
    return json({ success: false, message: "Your cart is invalid. Please refresh and try again." }, 400);
  }

  const couponCode = String(body.value.couponCode ?? "").trim().toUpperCase();
  const percentOff = couponCode ? await getCouponPercent(env, couponCode) : 0;

  const subtotalCents = computeSubtotal(lines);
  const discountCents = Math.round((subtotalCents * percentOff) / 100);
  const totalCents = Math.max(0, subtotalCents - discountCents);

  // Attach to the logged-in customer when present; guest checkout otherwise.
  const customer = await getSessionCustomer(request, env);

  const orderId = newId();
  await env.DB.prepare(
    `INSERT INTO orders (id, customer_id, email, status, subtotal_cents, discount_cents, total_cents, coupon_code)
     VALUES (?, ?, ?, 'pending', ?, ?, ?, ?)`,
  )
    .bind(orderId, customer?.id ?? null, email, subtotalCents, discountCents, totalCents, percentOff ? couponCode : null)
    .run();

  for (const line of lines) {
    const product = getProduct(line.productId)!;
    await env.DB.prepare(
      "INSERT INTO order_lines (order_id, product_id, qty, unit_price_cents) VALUES (?, ?, ?, ?)",
    )
      .bind(orderId, line.productId, line.qty, product.priceCents)
      .run();
  }

  // Free order (all freebies or 100% coupon): no Stripe involved.
  if (totalCents === 0) {
    await env.DB.prepare("UPDATE orders SET status = 'paid', paid_at = ? WHERE id = ?")
      .bind(nowIso(), orderId)
      .run();

    await subscribeToNewsletter(env, email, "shop-freebie");
    const downloads = await orderDownloads(env, orderId);
    await sendOrderEmail(env, { id: orderId, email, total_cents: totalCents });

    return json({ success: true, free: true, orderId, downloads });
  }

  const paymentIntent = await createPaymentIntent(env, {
    amountCents: totalCents,
    metadata: { kind: "shop-order", orderId },
    receiptEmail: email,
    description: `Order ${orderId.slice(0, 8)} — fullstackchris.dev shop`,
  });

  if (!paymentIntent.ok) {
    return json({ success: false, message: GENERIC_ERROR }, 502);
  }

  await env.DB.prepare("UPDATE orders SET stripe_payment_intent = ? WHERE id = ?")
    .bind(paymentIntent.id!, orderId)
    .run();

  return json({
    success: true,
    free: false,
    orderId,
    clientSecret: paymentIntent.clientSecret,
    totals: {
      subtotalCents,
      discountCents,
      totalCents,
      couponCode: percentOff ? couponCode : null,
    },
  });
};

const handleOrders = async (request: Request, env: Env): Promise<Response> => {
  if (!env.DB) return json({ success: false, message: "Service unavailable." }, 503);
  const customer = await getSessionCustomer(request, env);
  if (!customer) return json({ success: false, message: "Not signed in." }, 401);

  // Match by email so guest orders placed before sign-up show up too.
  const rows = await env.DB.prepare(
    `SELECT id, status, subtotal_cents, discount_cents, total_cents, coupon_code, created_at, paid_at
     FROM orders WHERE email = ? ORDER BY created_at DESC LIMIT 100`,
  )
    .bind(customer.email)
    .all();

  const orders = [];
  for (const row of (rows.results ?? []) as Record<string, unknown>[]) {
    const lines = await env.DB.prepare(
      "SELECT product_id, qty, unit_price_cents FROM order_lines WHERE order_id = ?",
    )
      .bind(String(row.id))
      .all();

    const items = ((lines.results ?? []) as Record<string, unknown>[]).map((line) => {
      const product = getProduct(String(line.product_id));
      return {
        productId: String(line.product_id),
        title: product?.title ?? String(line.product_id),
        qty: Number(line.qty),
        unitPriceCents: Number(line.unit_price_cents),
      };
    });

    orders.push({
      id: String(row.id),
      status: String(row.status),
      totalCents: Number(row.total_cents),
      createdAt: String(row.created_at),
      paidAt: row.paid_at ? String(row.paid_at) : null,
      items,
      downloads:
        String(row.status) === "paid"
          ? await orderDownloads(env, String(row.id))
          : [],
    });
  }

  return json({ success: true, orders });
};

const handleWishlist = async (request: Request, env: Env): Promise<Response> => {
  if (!env.DB) return json({ success: false, message: "Service unavailable." }, 503);
  const customer = await getSessionCustomer(request, env);
  if (!customer) return json({ success: false, message: "Not signed in." }, 401);

  if (request.method === "GET") {
    const rows = await env.DB.prepare(
      "SELECT product_id FROM wishlists WHERE customer_id = ? ORDER BY created_at DESC",
    )
      .bind(customer.id)
      .all<{ product_id: string }>();
    return json({ success: true, productIds: (rows.results ?? []).map((r) => r.product_id) });
  }

  if (request.method === "PUT") {
    const body = await readJson(request);
    if (!body.ok) return body.response;

    const ids = Array.isArray(body.value.productIds) ? body.value.productIds : null;
    if (!ids || ids.length > 200 || ids.some((id) => typeof id !== "string" || !getProduct(id))) {
      return json({ success: false, message: "Invalid wishlist." }, 400);
    }

    await env.DB.prepare("DELETE FROM wishlists WHERE customer_id = ?").bind(customer.id).run();
    for (const productId of new Set(ids as string[])) {
      await env.DB.prepare("INSERT INTO wishlists (customer_id, product_id) VALUES (?, ?)")
        .bind(customer.id, productId)
        .run();
    }
    return json({ success: true });
  }

  return json({ success: false, message: "Method not allowed." }, 405, { Allow: "GET, PUT" });
};

/**
 * Public order status for the confirmation page. Gated by the order UUID
 * (122-bit random id, only known to the buyer); download links included only
 * once paid. No PII is returned.
 */
const handleOrderStatus = async (env: Env, orderId: string): Promise<Response> => {
  if (!env.DB) return json({ success: false, message: "Service unavailable." }, 503);

  const order = await env.DB.prepare(
    "SELECT id, status, total_cents, created_at FROM orders WHERE id = ?",
  )
    .bind(orderId)
    .first<{ id: string; status: string; total_cents: number; created_at: string }>();

  if (!order) return json({ success: false, message: "Unknown order." }, 404);

  const lines = await env.DB.prepare(
    "SELECT product_id, qty, unit_price_cents FROM order_lines WHERE order_id = ?",
  )
    .bind(orderId)
    .all<{ product_id: string; qty: number; unit_price_cents: number }>();

  return json({
    success: true,
    order: {
      id: order.id,
      status: order.status,
      totalCents: order.total_cents,
      items: (lines.results ?? []).map((line) => ({
        productId: line.product_id,
        title: getProduct(line.product_id)?.title ?? line.product_id,
        qty: line.qty,
        unitPriceCents: line.unit_price_cents,
      })),
      downloads: order.status === "paid" ? await orderDownloads(env, orderId) : [],
    },
  });
};

const handleDownload = async (env: Env, token: string): Promise<Response> => {  if (!env.DB || !env.DOWNLOADS) {
    return json({ success: false, message: "Service unavailable." }, 503);
  }

  const payload = await verifyToken<{ orderId: string; productId: string }>(token, tokenSecret(env));
  if (!payload) {
    return json({ success: false, message: "This download link is invalid or has expired." }, 403);
  }

  const order = await env.DB.prepare(
    "SELECT status FROM orders WHERE id = ?",
  )
    .bind(payload.orderId)
    .first<{ status: string }>();

  const line = await env.DB.prepare(
    "SELECT product_id FROM order_lines WHERE order_id = ? AND product_id = ?",
  )
    .bind(payload.orderId, payload.productId)
    .first();

  if (!order || order.status !== "paid" || !line) {
    return json({ success: false, message: "This download link is invalid." }, 403);
  }

  const product = getProduct(payload.productId);
  if (!product) {
    return json({ success: false, message: "Unknown product." }, 404);
  }

  const object = await env.DOWNLOADS.get(product.fileKey);
  if (!object) {
    console.error("[shop] missing R2 object", { fileKey: product.fileKey });
    return json(
      { success: false, message: "Your file is being prepared — please try again shortly or reply to your order email." },
      404,
    );
  }

  return new Response(object.body, {
    headers: {
      "Content-Type": object.httpMetadata?.contentType ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${product.slug}.zip"`,
      "Cache-Control": "private, no-store",
    },
  });
};

export const handleShopRequest = async (
  request: Request,
  env: Env,
  url: URL,
): Promise<Response> => {
  const path = url.pathname;

  if (path === "/api/shop/products" && request.method === "GET") return handleProducts();
  if (path === "/api/shop/coupon/validate") return handleCouponValidate(request, env);
  if (path === "/api/shop/payment-intent") return handlePaymentIntent(request, env);
  if (path === "/api/shop/orders" && request.method === "GET") return handleOrders(request, env);
  if (path === "/api/shop/wishlist") return handleWishlist(request, env);

  const downloadMatch = path.match(/^\/api\/shop\/download\/([^/]+)$/);
  if (downloadMatch && request.method === "GET") {
    return handleDownload(env, downloadMatch[1]);
  }

  const orderMatch = path.match(/^\/api\/shop\/order\/([0-9a-f-]{36})$/i);
  if (orderMatch && request.method === "GET") {
    return handleOrderStatus(env, orderMatch[1]);
  }

  return json({ success: false, message: "Not found." }, 404);
};

// ---------- webhook fulfillment (called from stripeWebhook.ts) ----------

export const fulfillShopOrder = async (
  env: Env,
  paymentIntent: Record<string, unknown>,
): Promise<void> => {
  if (!env.DB) return;
  const orderId = String(paymentIntent.metadata ? (paymentIntent.metadata as Record<string, unknown>).orderId : "");
  if (!orderId) {
    console.error("[shop] payment_intent without orderId", { id: paymentIntent.id });
    return;
  }

  const order = await env.DB.prepare(
    "SELECT id, email, status, total_cents FROM orders WHERE id = ?",
  )
    .bind(orderId)
    .first<{ id: string; email: string; status: string; total_cents: number }>();

  if (!order) {
    console.error("[shop] unknown order for payment_intent", { orderId, pi: paymentIntent.id });
    return;
  }
  if (order.status === "paid") return; // idempotent

  await env.DB.prepare("UPDATE orders SET status = 'paid', paid_at = ? WHERE id = ?")
    .bind(nowIso(), orderId)
    .run();

  await sendOrderEmail(env, { id: order.id, email: order.email, total_cents: order.total_cents });
};

export const failShopOrder = async (
  env: Env,
  paymentIntent: Record<string, unknown>,
): Promise<void> => {
  if (!env.DB) return;
  const orderId = String(paymentIntent.metadata ? (paymentIntent.metadata as Record<string, unknown>).orderId : "");
  if (!orderId) return;
  await env.DB.prepare("UPDATE orders SET status = 'failed' WHERE id = ? AND status = 'pending'")
    .bind(orderId)
    .run();
};
