import { useCallback, useEffect, useState } from "react";
import { formatPrice } from "../../../config/products";
import { cartStore, useCartStore } from "./cartStore";

interface OrderView {
  id: string;
  status: string;
  totalCents: number;
  createdAt: string;
  items: { productId: string; title: string; qty: number; unitPriceCents: number }[];
  downloads: { productId: string; title: string; url: string }[];
}

type MeState =
  | { phase: "loading" }
  | { phase: "anonymous" }
  | { phase: "authed"; email: string };

const MagicLinkForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, next: "/shop/account/" }),
      });
    } finally {
      setStatus("sent");
    }
  };

  if (status === "sent") {
    return (
      <div className="card" style={{ maxWidth: 480 }}>
        <h3 className="t-h4">Check your inbox</h3>
        <p className="t-body">If that address has orders with us, a sign-in link is on its way. It expires in 15 minutes.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 480 }}>
      <div className="card">
        <h3 className="t-h4">Sign in to your account</h3>
        <p className="t-small" style={{ margin: "var(--sp-2) 0 var(--sp-5)" }}>No password — we email you a one-time sign-in link.</p>
        <div className="field">
          <label className="label" htmlFor="acct-email">Email</label>
          <input
            id="acct-email"
            className="input"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "var(--sp-4)" }} disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Email me a sign-in link"}
        </button>
      </div>
    </form>
  );
};

const AccountView = () => {
  const [me, setMe] = useState<MeState>({ phase: "loading" });
  const [orders, setOrders] = useState<OrderView[] | null>(null);
  const { wishlist, setWishlist } = useCartStore();

  const loadAccount = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) { setMe({ phase: "anonymous" }); return; }
      const body = await res.json();
      setMe({ phase: "authed", email: body.email });
    } catch {
      setMe({ phase: "anonymous" });
    }
  }, []);

  useEffect(() => { loadAccount(); }, [loadAccount]);

  useEffect(() => {
    if (me.phase !== "authed") return;
    fetch("/api/shop/orders")
      .then((r) => (r.ok ? r.json() : null))
      .then((b) => b?.orders && setOrders(b.orders))
      .catch(() => setOrders([]));

    // Merge the local wishlist into the account wishlist.
    if (wishlist.length > 0) {
      fetch("/api/shop/wishlist", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds: wishlist }),
      })
        .then(() => cartStore.setWishlist([]))
        .catch(() => undefined);
    } else {
      fetch("/api/shop/wishlist")
        .then((r) => (r.ok ? r.json() : null))
        .then((b) => b?.productIds && setWishlist(b.productIds))
        .catch(() => undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me.phase]);

  if (me.phase === "loading") {
    return <div className="skeleton" style={{ height: 220 }} />;
  }

  if (me.phase === "anonymous") {
    return (
      <>
        {new URLSearchParams(window.location.search).get("error") && (
          <div className="error-banner">That sign-in link was invalid or expired. Request a new one below.</div>
        )}
        <MagicLinkForm />
      </>
    );
  }

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    window.location.href = "/shop/account/";
  };

  return (
    <>
      <div className="row wrap gap-3" style={{ justifyContent: "space-between", marginBottom: "var(--sp-6)" }}>
        <div>
          <h1 className="t-h3">My account</h1>
          <p className="t-small">{me.email}</p>
        </div>
        <button type="button" className="btn btn-secondary btn-sm" onClick={logout}>Sign out</button>
      </div>

      <div className="acct-tabs" role="tablist">
        <button type="button" className="acct-tab active" data-tab="orders">Orders</button>
        <button type="button" className="acct-tab" data-tab="wishlist">Wishlist</button>
      </div>

      <div id="orders" className="acct-panel active">
        {orders === null && <div className="skeleton" style={{ height: 160 }} />}
        {orders !== null && orders.length === 0 && (
          <div className="empty-state card">
            <h4 className="t-h4">No orders yet</h4>
            <p>Anything you buy shows up here with permanent download access.</p>
            <a href="/shop/" className="btn btn-primary btn-sm">Browse shop</a>
          </div>
        )}
        {orders !== null && orders.map((order) => (
          <div key={order.id} className="order-row">
            <span className="oid">{order.id.slice(0, 8)}<br /><span className="badge badge-positive">{order.status}</span></span>
            <span className="items">{order.items.map((i) => `${i.qty}× ${i.title}`).join(", ")}</span>
            <span className="otot">{formatPrice(order.totalCents)}</span>
            <span className="stack gap-2">
              {order.downloads.map((d) => (
                <a key={d.productId} href={d.url} className="btn btn-secondary btn-sm">Download {d.title}</a>
              ))}
            </span>
          </div>
        ))}
      </div>

      <div id="wishlist" className="acct-panel">
        {wishlist.length === 0 ? (
          <div className="empty-state card">
            <h4 className="t-h4">Nothing saved yet</h4>
            <p>Tap the heart on any product to keep it here.</p>
            <a href="/shop/" className="btn btn-primary btn-sm">Browse shop</a>
          </div>
        ) : (
          <ul className="included-list card">
            {wishlist.map((id) => (
              <li key={id}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="var(--accent-400)" stroke="var(--accent-400)" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <a href="/shop/" style={{ color: "inherit" }}>{id}</a>
                <button type="button" className="remove-line" onClick={() => cartStore.toggleWishlist(id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default AccountView;
