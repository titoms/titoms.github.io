// Cart + wishlist store: localStorage-persisted, tiny pub/sub so independent
// React islands on the same page stay in sync (React islands hydrate
// separately, so this replaces cross-island context).

import { useSyncExternalStore } from "react";

export interface CartLine {
  productId: string;
  qty: number;
}

export interface AppliedCoupon {
  code: string;
  percentOff: number;
}

const CART_KEY = "fsc_cart";
const WISHLIST_KEY = "fsc_wishlist";
const COUPON_KEY = "fsc_coupon";

interface StoreState {
  cart: CartLine[];
  wishlist: string[];
  coupon: AppliedCoupon | null;
}

const readJson = <T,>(key: string, fallback: T): T => {
  if (typeof localStorage === "undefined") return fallback;
  try {
    return (JSON.parse(localStorage.getItem(key) ?? "") as T) ?? fallback;
  } catch {
    return fallback;
  }
};

let state: StoreState = {
  cart: readJson<CartLine[]>(CART_KEY, []),
  wishlist: readJson<string[]>(WISHLIST_KEY, []),
  coupon: readJson<AppliedCoupon | null>(COUPON_KEY, null),
};

const listeners = new Set<() => void>();

const persist = () => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishlist));
    if (state.coupon) localStorage.setItem(COUPON_KEY, JSON.stringify(state.coupon));
    else localStorage.removeItem(COUPON_KEY);
  } catch {
    /* storage unavailable — keep in-memory state */
  }
};

const setState = (patch: Partial<StoreState>) => {
  state = { ...state, ...patch };
  persist();
  listeners.forEach((listener) => listener());
};

export const cartStore = {
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getState: () => state,

  addToCart: (productId: string, qty = 1) => {
    const cart = [...state.cart];
    const line = cart.find((l) => l.productId === productId);
    if (line) line.qty = Math.min(5, line.qty + qty);
    else cart.push({ productId, qty });
    setState({ cart });
  },
  setQty: (productId: string, qty: number) => {
    const cart = state.cart
      .map((l) => (l.productId === productId ? { ...l, qty: Math.max(1, Math.min(5, qty)) } : l));
    setState({ cart });
  },
  removeFromCart: (productId: string) => {
    setState({ cart: state.cart.filter((l) => l.productId !== productId) });
  },
  clearCart: () => setState({ cart: [], coupon: null }),

  applyCoupon: (coupon: AppliedCoupon) => setState({ coupon }),
  clearCoupon: () => setState({ coupon: null }),

  toggleWishlist: (productId: string) => {
    const wishlist = state.wishlist.includes(productId)
      ? state.wishlist.filter((id) => id !== productId)
      : [...state.wishlist, productId];
    setState({ wishlist });
  },
  setWishlist: (wishlist: string[]) => setState({ wishlist }),
};

const emptyState: StoreState = { cart: [], wishlist: [], coupon: null };

/** React hook — subscribes the calling island to cart/wishlist/coupon state. */
export const useCartStore = (): StoreState =>
  useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getState,
    () => emptyState, // server snapshot (islands are client-only anyway)
  );

export const cartCount = (cart: CartLine[]): number =>
  cart.reduce((sum, line) => sum + line.qty, 0);
