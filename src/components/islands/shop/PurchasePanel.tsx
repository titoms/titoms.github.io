import { useState } from "react";
import { PRODUCTS } from "../../../config/products";
import { cartStore, useCartStore } from "./cartStore";
import { AddToCartButton, WishlistButton } from "./ProductGrid";

/** Sticky PDP purchase panel: primary CTA adapts to cart state, wishlist toggle. */
const PurchasePanel = ({ productId }: { productId: string }) => {
  const product = PRODUCTS.find((p) => p.id === productId);
  const { cart } = useCartStore();
  const [buyNowBusy, setBuyNowBusy] = useState(false);

  if (!product) return null;

  const inCart = cart.find((l) => l.productId === productId);

  const buyNow = () => {
    if (!inCart) cartStore.addToCart(productId, 1);
    setBuyNowBusy(true);
    window.location.href = "/shop/checkout/";
  };

  return (
    <>
      <div className="pdp-cta">
        {inCart ? (
          <a className="btn btn-primary btn-lg" href="/shop/cart/">
            In cart ({inCart.qty}) — view <span className="arrow">→</span>
          </a>
        ) : (
          <AddToCartButton productId={productId} label={product.priceCents === 0 ? "Get free" : "Add to cart"} />
        )}
        {product.priceCents > 0 && (
          <button type="button" className="btn btn-secondary btn-lg" onClick={buyNow} disabled={buyNowBusy}>
            Buy now
          </button>
        )}
      </div>
      <div className="row gap-3" style={{ marginTop: "var(--sp-4)" }}>
        <WishlistButton productId={productId} />
        <span className="t-small">Save for later</span>
      </div>
    </>
  );
};

export default PurchasePanel;
