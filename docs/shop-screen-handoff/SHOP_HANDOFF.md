# Shop — Implementation Handoff (Claude Code)

Static HTML prototype for the digital-products shop, built on the existing design system (`styles.css`, `motion.css`, `service.css`) + a new `shop/shop.css` + `shop/shop.js`. Cart/wishlist/coupon are mocked with `localStorage` — replace with real state (React context / Zustand / server session) and a real payment integration (Stripe Elements) in the build.

## Files
- `shop/shop.css` — all shop-specific styles (product grid, cart drawer, checkout, confirmation, account)
- `shop/shop.js` — cart state, drawer render, filters/sort/search, wishlist, coupon, tabs, gallery, FAQ. `window.shop` exposes `addToCart/cartLines/subtotal/discount/grandTotal/money/getCoupon/PRODUCTS` for reuse.
- `shop/index.html` — shop listing (all categories)
- `shop/category.html` — single category (Design Systems, as example)
- `shop/product.html` — single product (Violet Dark UI Kit)
- `shop/cart.html` — full cart page
- `shop/checkout.html` — checkout form + order summary
- `shop/confirmation.html` — thank-you / order confirmation
- `shop/account.html` — order history + wishlist (extra scope, tabs)

## Reusable components (map to your framework)
- **ProductCard** (`.pcard`): thumb (image/`.ph` placeholder), wishlist heart (`data-wish="id"`), category label, title, description, price (`.price-now`/`.price-was`/`.price-free`), CTA (`data-add="id"` add-to-cart or link-through for view-detail categories like design systems).
- **FilterToolbar** (`.filter-row`): search input (`#shopSearch`), filter pills (`.filter-pill[data-filter]`), sort select (`#shopSort`), result count. Card data attrs drive filtering: `data-cat`, `data-title`, `data-price`, `data-date`, `data-popular`.
- **CartDrawer**: injected once by `shop.js` (`injectDrawer()`) — any page with a `.cart-btn` in header gets it automatically. Replace localStorage cart with real cart context; keep the DOM structure/classes for styling continuity.
- **CouponField** (`.coupon-row` / `.coupon-applied`): client-side mock rates `WELCOME10`/`LAUNCH20` in `shop.js` — replace with a real coupon-validation API call.
- **CheckoutSteps** (`.checkout-steps`): pure visual progress indicator, 3 states (`done`/`active`/default).
- **OrderSummary** (`.order-summary`): reused on cart + checkout pages, sticky at `top: 88px` on desktop.
- **AccountTabs** (`.acct-tabs`/`.acct-panel`): simple show/hide; swap for router-based tabs if account becomes multi-route.

## Data model (suggested)
```
Product { id, title, category: 'Freebies'|'Templates'|'Design Systems'|'Others',
  price: number (0 = free), compareAtPrice?: number, description, whatsIncluded: string[],
  whoItsFor: {good: string[], bad: string[]}, techSpecs: {label,value}[], images: string[],
  rating, reviewCount, downloadCount, license, faqs: {q,a}[] }
CartLine { productId, qty }
Order { id, email, lines: CartLine[], subtotal, discount, total, couponCode?, createdAt, downloadUrls: {productId,url,expiresAt?}[] }
```

## Motion notes (all already CSS-driven, lightweight — safe for React re-renders)
- **Card hover**: `.card-hover:hover` → `translateY(-3px)` + border brighten (styles.css). Product thumb image scales `1.045` on `.pcard:hover .thumb .ph` (shop.css) — swap `.ph` for real `<img>`, keep the transform on the image element.
- **Wishlist toggle**: instant fill-color swap on `.wish-btn.active svg`, no animation needed; add a subtle `scale` pulse on click if desired.
- **Add-to-cart micro-interaction**: button label swaps to "Added ✓" + `.added` class (green) for 1.4s, then reverts — see `wireAddButtons()` in shop.js. Port as a local component state + `setTimeout`/`useEffect` cleanup.
- **Cart badge bump**: `.cart-btn.bump` replays a scale keyframe (`cartBump`) every time an item is added — retrigger by toggling the class (remove/reflow/add), same in React via a key change or class toggle.
- **Cart drawer**: slides in via `transform: translateX(100%) → 0`, `.4s cubic-bezier(.2,.8,.2,1)`, overlay fades `.3s`. Keep `overflow:hidden` on body while open.
- **Filter/sort transitions**: reuses `motion.css` `.filterable`/`.is-hidden` (opacity+scale fade, `.32s`) already used on Projects — apply the same classes when toggling product visibility instead of hard show/hide, so filtering animates instead of jumping.
- **Product gallery reveal**: thumbnail click cross-fades the main shot (`opacity 0→1`, 150ms swap) — replace with real image src swap in `wireGallery()` logic.
- **Confirmation checkmark**: soft pulsing ring (`confirmPulse`, 2.2s loop) — good candidate for a one-shot celebratory animation (e.g. a single scale-in + 2 pulses then rest) rather than infinite loop in production.
- **Reduced motion**: all shop animations should be added to the existing `@media (prefers-reduced-motion: reduce)` block in `motion.css`.

## States to build
- **Empty cart** (drawer + cart page + checkout with no items): `.empty-state` pattern, icon + copy + CTA back to shop.
- **Loading**: use `.skeleton` shimmer class on product cards while data fetches (shape included in shop.css, not yet wired to real async state — apply/remove class based on fetch status).
- **Invalid coupon**: input border flips to `--negative` + placeholder swaps to "Invalid code" (mock) — replace with real inline error message from API response.
- **Hover states**: card lift, thumb zoom, wishlist heart border-accent, filter pill highlight, price-row hover on any table rows you add.

## Payment integration
Checkout form (`shop/checkout.html`) mocks Stripe Elements visually (card number/expiry/CVC fields with icon, brand chips, secure note). Replace the raw `<input>` fields with actual Stripe Elements mounts (`cardNumberElement`, `cardExpiryElement`, `cardCvcElement`) inside the same `.cc-field`/`.field-grid` wrappers to preserve styling — Stripe Elements accepts custom CSS via its `style` option; match `--text-hi`/`--bg-4`/`--border-strong` tokens.

## Known simplifications (flagged, not hidden)
- No real auth — the "create account" toggle at checkout and Account page are static/mock.
- Cart math has no tax/VAT line — add if the business needs it (EU digital VAT/MOSS handling).
- No shipping fields anywhere (correct for digital-only).
- Single hero product page built out (Violet Dark UI Kit) — replicate its section structure for other products; the categories/what's-included/who's-it-for/tech/reviews/FAQ/related order is the intended pattern for every PDP.
