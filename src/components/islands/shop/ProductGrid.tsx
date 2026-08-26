import { useMemo, useState } from "react";
import { PRODUCTS, categoryToSlug, formatPrice, type Product } from "../../../config/products";
import { cartStore, useCartStore } from "./cartStore";

const HeartIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

export const WishlistButton = ({ productId }: { productId: string }) => {
  const { wishlist } = useCartStore();
  const active = wishlist.includes(productId);
  return (
    <button
      type="button"
      className={`wish-btn${active ? " active" : ""}`}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      onClick={(e) => { e.preventDefault(); cartStore.toggleWishlist(productId); }}
    >
      <HeartIcon />
    </button>
  );
};

export const AddToCartButton = ({ productId, label = "Add to cart" }: { productId: string; label?: string }) => {
  const [added, setAdded] = useState(false);
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return null;

  const onClick = () => {
    cartStore.addToCart(productId, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <button type="button" className={`btn btn-primary btn-sm btn-add${added ? " added" : ""}`} onClick={onClick}>
      {added ? "Added ✓" : product.priceCents === 0 ? "Get free" : label}
    </button>
  );
};

const ProductCard = ({ product }: { product: Product }) => (
  <article
    className="card card-hover pcard filterable"
    data-cat={product.category}
    data-title={product.title}
    data-price={product.priceCents}
    data-date={product.addedDate}
    data-popular={product.popular}
  >
    <a className="thumb" href={`/shop/product/${product.slug}/`}>
      <span className="ph">{product.title}</span>
      {product.compareAtPriceCents ? (
        <span className="thumb-badges"><span className="badge badge-accent">Sale</span></span>
      ) : product.priceCents === 0 ? (
        <span className="thumb-badges"><span className="badge badge-positive">Free</span></span>
      ) : null}
    </a>
    <WishlistButton productId={product.id} />
    <div className="body">
      <span className="cat">{product.category}</span>
      <h4><a href={`/shop/product/${product.slug}/`} style={{ color: "inherit", textDecoration: "none" }}>{product.title}</a></h4>
      <p className="desc">{product.tagline}</p>
      <div className="foot">
        <span>
          {product.compareAtPriceCents ? <span className="price-was">{formatPrice(product.compareAtPriceCents)}</span> : null}
          <span className={product.priceCents === 0 ? "price-free" : "price-now"}>{formatPrice(product.priceCents)}</span>
        </span>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  </article>
);

type SortMode = "popular" | "price-asc" | "price-desc" | "newest";

interface ProductGridProps {
  /** Restrict to one category slug (category pages); undefined = all. */
  categorySlug?: string;
}

const ProductGrid = ({ categorySlug }: ProductGridProps) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>(categorySlug ?? "all");
  const [sort, setSort] = useState<SortMode>("popular");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = PRODUCTS.filter((p) => {
      const matchCat = filter === "all" || categoryToSlug(p.category) === filter;
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
    const sorted = [...filtered];
    switch (sort) {
      case "price-asc": sorted.sort((a, b) => a.priceCents - b.priceCents); break;
      case "price-desc": sorted.sort((a, b) => b.priceCents - a.priceCents); break;
      case "newest": sorted.sort((a, b) => b.addedDate - a.addedDate); break;
      default: sorted.sort((a, b) => b.popular - a.popular);
    }
    return sorted;
  }, [query, filter, sort]);

  const pills = ["all", "freebies", "templates", "design-systems", "others"] as const;
  const pillLabel = (slug: string) =>
    slug === "all" ? "All" : slug === "design-systems" ? "Design Systems" : slug[0].toUpperCase() + slug.slice(1);

  return (
    <>
      <div className="shop-toolbar">
        <div className="search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            className="input"
            type="search"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />
        </div>
        <div className="sort-wrap">
          <span className="result-count">{visible.length} product{visible.length === 1 ? "" : "s"}</span>
          <select className="select" value={sort} onChange={(e) => setSort(e.target.value as SortMode)} aria-label="Sort products">
            <option value="popular">Most popular</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </div>

      <div className="filter-row">
        <div className="filter-pills" role="tablist">
          {pills.map((slug) => (
            <button
              key={slug}
              type="button"
              className={`filter-pill${filter === slug ? " active" : ""}`}
              onClick={() => setFilter(slug)}
            >
              {pillLabel(slug)}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="empty-state">
          <h4 className="t-h4">Nothing matches</h4>
          <p>Try a different search or category.</p>
        </div>
      ) : (
        <div className="pgrid">
          {visible.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </>
  );
};

export default ProductGrid;
