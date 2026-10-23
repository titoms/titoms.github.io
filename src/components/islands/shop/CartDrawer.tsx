import { useCallback, useEffect, useState } from "react";
import { PRODUCTS, formatPrice } from "../../../config/products";
import { cartCount, cartStore, useCartStore, type AppliedCoupon } from "./cartStore";

const CartLineRow = ({ productId, qty }: { productId: string; qty: number }) => {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return null;

  return (
    <div className="cart-line">
      <div className="thumb ph" aria-hidden="true">img</div>
      <div className="info">
        <div className="cat">{product.category}</div>
        <h5>{product.title}</h5>
        <div className="row-bottom">
          <div className="qty-stepper">
            <button type="button" aria-label="Decrease quantity" onClick={() => cartStore.setQty(productId, qty - 1)}>−</button>
            <span className="qv">{qty}</span>
            <button type="button" aria-label="Increase quantity" onClick={() => cartStore.setQty(productId, qty + 1)}>+</button>
          </div>
          <span className="lprice">{product.priceCents === 0 ? "Free" : formatPrice(product.priceCents * qty)}</span>
        </div>
        <button type="button" className="remove-line" onClick={() => cartStore.removeFromCart(productId)}>Remove</button>
      </div>
    </div>
  );
};

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
      } else {
        setError(true);
      }
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

const CartDrawer = () => {
  const { cart, coupon } = useCartStore();
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);

  // Header cart buttons are plain DOM (Astro header) — delegate clicks + sync count.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest("[data-cart-open]")) {
        event.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const count = cartCount(cart);
    document.querySelectorAll<HTMLElement>(".cart-count").forEach((el) => {
      el.textContent = String(count);
      el.style.display = count ? "grid" : "none";
    });
    if (count) setBump((b) => b + 1);
  }, [cart]);

  useEffect(() => {
    document.querySelectorAll(".cart-btn").forEach((el) => {
      el.classList.remove("bump");
      void (el as HTMLElement).offsetWidth;
      if (bump > 1) el.classList.add("bump");
    });
  }, [bump]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const subtotal = cart.reduce(
    (sum, line) => sum + (PRODUCTS.find((p) => p.id === line.productId)?.priceCents ?? 0) * line.qty,
    0,
  );
  const discount = coupon ? Math.round((subtotal * coupon.percentOff) / 100) : 0;
  const total = Math.max(0, subtotal - discount);

  return (
    <>
      <div className={`cart-overlay${open ? " open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`cart-drawer${open ? " open" : ""}`} aria-label="Shopping cart" aria-hidden={!open}>
        <div className="cd-head">
          <h3 className="t-h4">Your Cart</h3>
          <button type="button" className="cd-close" aria-label="Close cart" onClick={() => setOpen(false)}>✕</button>
        </div>
        <div className="cd-body">
          {cart.length === 0 ? (
            <div className="empty-state">
              <div className="ic">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              </div>
              <h4 className="t-h4">Your cart is empty</h4>
              <p>Browse templates, design systems and free resources to get started.</p>
              <a href="/shop/" className="btn btn-secondary btn-sm">Browse shop</a>
            </div>
          ) : (
            cart.map((line) => <CartLineRow key={line.productId} {...line} />)
          )}
        </div>
        {cart.length > 0 && (
          <div className="cd-foot">
            <CouponControls coupon={coupon} />
            <div className="sum-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            {discount > 0 && <div className="sum-row"><span>Discount</span><span>−{formatPrice(discount)}</span></div>}
            <div className="sum-row total"><span>Total</span><span className="amt">{formatPrice(total)}</span></div>
            <a className="btn btn-primary btn-lg" href="/shop/checkout/" style={{ width: "100%" }}>
              Checkout <span className="arrow">→</span>
            </a>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
