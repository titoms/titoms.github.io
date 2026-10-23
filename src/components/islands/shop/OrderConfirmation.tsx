import { useEffect, useState } from "react";
import { formatPrice } from "../../../config/products";

interface DownloadItem {
  productId: string;
  title: string;
  url: string;
}

interface OrderView {
  id: string;
  status: string;
  totalCents: number;
  items: { productId: string; title: string; qty: number; unitPriceCents: number }[];
  downloads: DownloadItem[];
}

const OrderConfirmation = () => {
  const [order, setOrder] = useState<OrderView | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const orderId = new URLSearchParams(window.location.search).get("order") ?? "";

  useEffect(() => {
    // Cart was just converted into this order.
    try { localStorage.removeItem("fsc_cart"); localStorage.removeItem("fsc_coupon"); } catch {}

    if (!orderId) { setNotFound(true); return; }

    let cancelled = false;

    // The Stripe webhook may land a second or two after redirect — poll briefly.
    const poll = async (attempt: number): Promise<void> => {
      try {
        const res = await fetch(`/api/shop/order/${encodeURIComponent(orderId)}`);
        if (res.status === 404) { if (!cancelled) setNotFound(true); return; }
        const body = await res.json();
        if (!res.ok || !body.success) return;
        setOrder(body.order);
        if (body.order.status === "paid" || attempt >= 8) return;
        window.setTimeout(() => !cancelled && poll(attempt + 1), 1500);
      } catch {
        if (!cancelled && attempt < 8) window.setTimeout(() => !cancelled && poll(attempt + 1), 1500);
      }
    };

    poll(attempts);
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  if (notFound) {
    return (
      <div className="card" style={{ maxWidth: 560, margin: "0 auto" }}>
        <div className="empty-state">
          <h4 className="t-h4">Order not found</h4>
          <p>Check the link in your confirmation email, or sign in to your account to see your orders.</p>
          <a href="/shop/account/" className="btn btn-primary btn-sm">My account</a>
        </div>
      </div>
    );
  }

  if (!order) {
    return <div className="skeleton" style={{ height: 260, maxWidth: 560, margin: "0 auto" }} />;
  }

  const paid = order.status === "paid";

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }} className="stack gap-5">
      <div className="confirm-hero" style={{ padding: 0, marginBottom: 0 }}>
        <div className="confirm-check">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h1 className="t-h2">{paid ? "Thanks — your order is confirmed!" : "Processing your payment…"}</h1>
        <p className="t-body">
          Order <span className="order-num">{order.id.slice(0, 8)}</span> · {formatPrice(order.totalCents)}
          {!paid && <span> — refresh in a moment.</span>}
        </p>
      </div>

      {paid && order.downloads.length > 0 && (
        <div className="card">
          <h3 className="t-h4" style={{ marginBottom: "var(--sp-4)" }}>Your downloads</h3>
          <div className="download-list">
            {order.downloads.map((d) => (
              <a key={d.productId} href={d.url} className="card card-hover download-row" style={{ textDecoration: "none", color: "inherit", padding: "var(--sp-4) var(--sp-5)" }}>
                <span className="ic">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </span>
                <span className="meta">
                  <h5>{d.title}</h5>
                  <span>Download link valid for 7 days</span>
                </span>
                <span className="btn btn-primary btn-sm">Get files</span>
              </a>
            ))}
          </div>
          <p className="t-small" style={{ marginTop: "var(--sp-4)" }}>
            A copy of these links was sent to your email. Links expired later? Regenerate them anytime from{" "}
            <a href="/shop/account/" style={{ color: "var(--accent-400)" }}>your account</a>.
          </p>
        </div>
      )}

      <div className="card next-steps">
        <h3 className="t-h4" style={{ marginBottom: "var(--sp-3)" }}>Next steps</h3>
        <div className="step"><span className="step-num">1</span><div><strong>Download your files</strong><p className="t-small">Everything above is yours — no expiry inside the files themselves.</p></div></div>
        <div className="step"><span className="step-num">2</span><div><strong>Need help?</strong><p className="t-small">Reply to the order email — I answer personally.</p></div></div>
        <div className="step"><span className="step-num">3</span><div><strong>Keep browsing</strong><p className="t-small">Back to the shop for more templates and resources.</p></div></div>
        <a href="/shop/" className="btn btn-secondary btn-sm" style={{ alignSelf: "flex-start", marginTop: "var(--sp-4)" }}>Back to shop <span className="arrow">→</span></a>
      </div>
    </div>
  );
};

export default OrderConfirmation;
