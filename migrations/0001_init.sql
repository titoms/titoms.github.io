-- Phase 14: shop + booking backend
-- All timestamps are ISO-8601 UTC strings (datetime('now') default).

CREATE TABLE customers (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  locale TEXT NOT NULL DEFAULT 'en',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE magic_tokens (
  token_hash TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  next TEXT,
  expires_at TEXT NOT NULL,
  used_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_magic_tokens_email ON magic_tokens(email);

CREATE TABLE sessions (
  token_hash TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL REFERENCES customers(id),
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_sessions_customer ON sessions(customer_id);

CREATE TABLE coupons (
  code TEXT PRIMARY KEY,
  percent_off INTEGER NOT NULL CHECK (percent_off BETWEEN 1 AND 100),
  active INTEGER NOT NULL DEFAULT 1,
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_id TEXT REFERENCES customers(id),
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
  subtotal_cents INTEGER NOT NULL,
  discount_cents INTEGER NOT NULL DEFAULT 0,
  total_cents INTEGER NOT NULL,
  coupon_code TEXT REFERENCES coupons(code),
  stripe_payment_intent TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  paid_at TEXT
);
CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_customer ON orders(customer_id);

CREATE TABLE order_lines (
  order_id TEXT NOT NULL REFERENCES orders(id),
  product_id TEXT NOT NULL,
  qty INTEGER NOT NULL CHECK (qty > 0),
  unit_price_cents INTEGER NOT NULL,
  PRIMARY KEY (order_id, product_id)
);

CREATE TABLE wishlists (
  customer_id TEXT NOT NULL REFERENCES customers(id),
  product_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (customer_id, product_id)
);

CREATE TABLE bookings (
  id TEXT PRIMARY KEY,
  service_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'held' CHECK (status IN ('held', 'confirmed', 'cancelled', 'rescheduled')),
  date TEXT NOT NULL,          -- YYYY-MM-DD in Europe/Paris
  start_time TEXT NOT NULL,    -- HH:MM in Europe/Paris
  duration_min INTEGER NOT NULL,
  timezone TEXT NOT NULL,      -- visitor IANA timezone
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  company TEXT,
  project_details TEXT,
  prep_notes TEXT,
  amount_cents INTEGER NOT NULL,
  stripe_payment_intent TEXT,
  gcal_event_id TEXT,
  meet_url TEXT,
  manage_secret TEXT NOT NULL,
  cutoff_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_bookings_slot ON bookings(date, start_time, status);
CREATE INDEX idx_bookings_email ON bookings(customer_email);

-- Stripe webhook idempotency
CREATE TABLE webhook_events (
  id TEXT PRIMARY KEY,          -- stripe event id
  processed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Short-lived slot holds (booking flow). Expired rows are deleted lazily on read.
-- UNIQUE(date, start_time) enforces one active hold per slot; inserts delete
-- expired rows first.
CREATE TABLE slot_holds (
  booking_id TEXT PRIMARY KEY REFERENCES bookings(id),
  date TEXT NOT NULL,
  start_time TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  UNIQUE (date, start_time)
);

-- "Custom service" quote requests from /booking/
CREATE TABLE custom_quotes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Seed coupons (replace the handoff's client-side mock)
INSERT INTO coupons (code, percent_off) VALUES
  ('WELCOME10', 10),
  ('LAUNCH20', 20);
