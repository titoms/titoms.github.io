import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { PRODUCTS, formatPrice } from "../../../config/products";
import { cartStore, useCartStore } from "./cartStore";

const stripePromise = loadStripe((import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY as string) ?? "");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

interface Totals {
  subtotalCents: number;
  discountCents: number;
  totalCents: number;
}

const PayForm = ({ orderId }: { orderId: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || paying) return;
    setPaying(true);
    setError(null);

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: { return_url: `${window.location.origin}/shop/confirmation/?order=${orderId}` },
    });

    if (confirmError) {
      setError(confirmError.message ?? "Payment failed. Please try again.");
      setPaying(false);
      return;
    }

    window.location.href = `/shop/confirmation/?order=${orderId}`;
  };

  return (
    <form onSubmit={submit}>
      <div className="field" style={{ marginBottom: "var(--sp-5)" }}>
        <label className="label">Card details</label>
        <div className="cc-field">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          <PaymentElement />
        </div>
      </div>
      {error && <div className="error-banner">{error}</div>}
      <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }} disabled={!stripe || paying}>
        {paying ? "Processing…" : <>Pay & get instant access <span className="arrow">→</span></>}
      </button>
      <p className="t-small" style={{ textAlign: "center", marginTop: "var(--sp-4)" }}>
        Payments are processed securely by Stripe. Your card details never touch our servers.
      </p>
    </form>
  );
};

const ShopCheckout = () => {
  const { cart, coupon } = useCartStore();
  const [email, setEmail] = useState("");
  const emailValid = EMAIL_PATTERN.test(email.trim());

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [totals, setTotals] = useState<Totals | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestedRef = useRef("");

  // Server-computed totals for display (mirrors what the API will charge).
  const displaySubtotal = cart.reduce(
    (sum, line) => sum + (PRODUCTS.find((p) => p.id === line.productId)?.priceCents ?? 0) * line.qty,
    0,
  );

  useEffect(() => {
    document.body.style.overflow = "";
  }, []);

  const createIntent = useCallback(async () => {
    if (!emailValid || cart.length === 0) return;
    const signature = JSON.stringify({ lines: cart, coupon: coupon?.code ?? null });
    if (requestedRef.current === signature) return;
    requestedRef.current = signature;

    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/shop/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          lines: cart,
          couponCode: coupon?.code ?? undefined,
        }),
      });
      const body = await res.json();

      if (!res.ok || !body.success) {
        setError(body.message ?? "Something went wrong. Please try again.");
        setClientSecret(null);
        return;
      }

      if (body.free) {
        // €0 order — no Stripe; go straight to confirmation.
        cartStore.clearCart();
        window.location.href = `/shop/confirmation/?order=${body.orderId}`;
        return;
      }

      setClientSecret(body.clientSecret);
      setOrderId(body.orderId);
      setTotals(body.totals);
    } catch {
      setError("Network error. Please try again.");
      setClientSecret(null);
    } finally {
      setBusy(false);
    }
  }, [cart, coupon, email, emailValid]);

  // Create the intent once the email is valid (debounced).
  useEffect(() => {
    const timer = window.setTimeout(createIntent, 600);
    return () => window.clearTimeout(timer);
  }, [createIntent]);

  const options = useMemo(
    () => ({
      clientSecret: clientSecret ?? "",
      appearance: {
        theme: "night" as const,
        variables: {
          colorPrimary: "#a78bfa",
          colorBackground: "#22222a",
          colorText: "#f4f4f6",
          colorDanger: "#f47373",
          fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
          borderRadius: "10px",
        },
      },
    }),
    [clientSecret],
  );

  const discount = totals?.discountCents ?? (coupon ? Math.round((displaySubtotal * coupon.percentOff) / 100) : 0);
  const total = totals?.totalCents ?? Math.max(0, displaySubtotal - discount);

  if (cart.length === 0) {
    return (
      <div className="card">
        <div className="empty-state">
          <h4 className="t-h4">No items in cart</h4>
          <p>Add something from the shop before checking out.</p>
          <a href="/shop/" className="btn btn-primary btn-sm">Browse shop</a>
        </div>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="co-section">
          <h3>Contact</h3>
          <div className="field">
            <label className="label" htmlFor="co-email">Email</label>
            <input
              id="co-email"
              className="input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <p className="t-small" style={{ marginTop: "var(--sp-3)" }}>
            Download links are sent to this address. Want them in an account too?{" "}
            <a href="/shop/account/" style={{ color: "var(--accent-400)" }}>Sign in first</a>.
          </p>
        </div>

        {emailValid && (
          <div className="co-section">
            <h3>Payment</h3>
            <div className="row wrap gap-3" style={{ justifyContent: "space-between", marginBottom: "var(--sp-4)" }}>
              <span className="t-small">Card details</span>
              <span className="card-brands"><span>VISA</span><span>MC</span><span>AMEX</span></span>
            </div>
            {error && <div className="error-banner">{error}</div>}
            {busy && !clientSecret && <div className="skeleton" style={{ height: 140 }} />}
            {clientSecret && orderId && (
              <Elements key={clientSecret} stripe={stripePromise} options={options}>
                <PayForm orderId={orderId} />
              </Elements>
            )}
          </div>
        )}
      </form>

      <div className="card order-summary">
        <h3 className="t-h4">Order summary</h3>
        {cart.map((line) => {
          const product = PRODUCTS.find((p) => p.id === line.productId);
          if (!product) return null;
          return (
            <div key={line.productId} className="cart-line">
              <div className="thumb ph">{product.category}</div>
              <div className="info">
                <span className="cat">{product.category}</span>
                <h5>{product.title}</h5>
                <div className="row-bottom">
                  <span className="t-small">×{line.qty}</span>
                  <span className="lprice">{product.priceCents === 0 ? "Free" : formatPrice(product.priceCents * line.qty)}</span>
                </div>
              </div>
            </div>
          );
        })}
        {coupon && (
          <div className="coupon-applied">
            <span>{coupon.code} applied · -{coupon.percentOff}%</span>
            <button type="button" aria-label="Remove coupon" onClick={() => cartStore.clearCoupon()}>✕</button>
          </div>
        )}
        <div className="sum-row"><span>Subtotal</span><span>{formatPrice(displaySubtotal)}</span></div>
        {discount > 0 && <div className="sum-row"><span>Discount</span><span>−{formatPrice(discount)}</span></div>}
        <div className="sum-row total"><span>Total due</span><span className="amt">{formatPrice(total)}</span></div>
        <p className="t-small">By completing this purchase you agree to the Terms and Refund Policy.</p>
      </div>
    </>
  );
};

export default ShopCheckout;
