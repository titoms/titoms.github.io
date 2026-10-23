import { useState } from "react";
import { PRODUCTS, formatPrice } from "../../../config/products";
import { cartStore, useCartStore, type AppliedCoupon } from "./cartStore";

const CouponControls = ({ coupon }: { coupon: AppliedCoupon | null }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const apply = async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    try {
      const res = await fetch("/api/shop/coupon/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmed }),
      });
      const body = await res.json();
      if (body.valid) {
        cartStore.applyCoupon({ code: body.code, percentOff: body.percentOff });
        setCode("");
        setError(false);
      } else setError(true);
    } catch {
      setError(true);
    }
  };

  if (coupon) {
    return (
      <div className="coupon-applied">
        <span>{coupon.code} applied · -{coupon.percentOff}%</span>
        <button type="button" aria-label="Remove coupon" onClick={() => cartStore.clearCoupon()}>✕</button>
      </div>
    );
  }

  return (
    <div className="coupon-row">
      <input
        className="input"
        placeholder="Coupon code"
        value={code}
        style={error ? { borderColor: "var(--negative)" } : undefined}
        onChange={(e) => { setCode(e.target.value); setError(false); }}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); apply(); } }}
      />
      <button type="button" className="btn btn-secondary btn-sm" onClick={apply}>Apply</button>
    </div>
  );
};

const CartPage = () => {
  const { cart, coupon } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="card" style={{ padding: "var(--sp-7)" }}>
        <div className="empty-state">
          <div className="ic">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </div>
          <h4 className="t-h4">Your cart is empty</h4>
          <p>Browse templates, design systems and free resources to get started.</p>
          <a href="/shop/" className="btn btn-primary">Browse shop <span className="arrow">→</span></a>
        </div>
      </div>
    );
  }

  const subtotal = cart.reduce(
    (sum, line) => sum + (PRODUCTS.find((p) => p.id === line.productId)?.priceCents ?? 0) * line.qty,
    0,
  );
  const discount = coupon ? Math.round((subtotal * coupon.percentOff) / 100) : 0;
  const total = Math.max(0, subtotal - discount);

  return (
    <>
      <div className="card">
        {cart.map((line) => {
          const product = PRODUCTS.find((p) => p.id === line.productId);
          if (!product) return null;
          return (
            <div key={line.productId} className="cart-line cart-page-line">
              <div className="thumb ph">{product.category}</div>
              <div className="info">
                <div className="cat">{product.category}</div>
                <h5><a href={`/shop/product/${product.slug}/`} style={{ color: "inherit", textDecoration: "none" }}>{product.title}</a></h5>
                <p className="t-small">{product.tagline}</p>
                <div className="row-bottom">
                  <div className="qty-stepper">
                    <button type="button" aria-label="Decrease quantity" onClick={() => cartStore.setQty(line.productId, line.qty - 1)}>−</button>
                    <span className="qv">{line.qty}</span>
                    <button type="button" aria-label="Increase quantity" onClick={() => cartStore.setQty(line.productId, line.qty + 1)}>+</button>
                  </div>
                  <span className="lprice">{product.priceCents === 0 ? "Free" : formatPrice(product.priceCents * line.qty)}</span>
                </div>
                <button type="button" className="remove-line" onClick={() => cartStore.removeFromCart(line.productId)}>Remove</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card order-summary" style={{ position: "static" }}>
        <h3 className="t-h4">Summary</h3>
        <CouponControls coupon={coupon} />
        <div className="sum-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        {discount > 0 && <div className="sum-row"><span>Discount</span><span>−{formatPrice(discount)}</span></div>}
        <div className="sum-row total"><span>Total</span><span className="amt">{formatPrice(total)}</span></div>
        <a className="btn btn-primary btn-lg" href="/shop/checkout/" style={{ width: "100%" }}>
          Checkout <span className="arrow">→</span>
        </a>
        <p className="t-small" style={{ textAlign: "center" }}>Digital products — no shipping, instant delivery.</p>
      </div>
    </>
  );
};

export default CartPage;
