import { useCallback, useEffect, useState } from "react";

interface BookingView {
  id: string;
  service: { id: string; title: string; durationLabel: string };
  status: string;
  date: string;
  startTime: string;
  timezone: string;
  meetUrl: string | null;
  customerName: string;
  customerEmail: string;
  amount: string;
  canModify: boolean;
  cutoffAt: string;
}

const STATUS_BADGE: Record<string, string> = {
  confirmed: "badge-positive",
  rescheduled: "badge-accent",
  cancelled: "badge",
  held: "badge",
};

const ManageBooking = () => {
  const [booking, setBooking] = useState<BookingView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [busy, setBusy] = useState(false);
  const [rescheduling, setRescheduling] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [slots, setSlots] = useState<{ time: string; available: boolean }[] | null>(null);

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") ?? "";
  const token = params.get("t") ?? "";

  const load = useCallback(() => {
    if (!id || !token) {
      setError("This manage link is incomplete. Use the link from your booking email.");
      return;
    }
    fetch(`/api/booking/manage?id=${encodeURIComponent(id)}&t=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const body = await r.json();
        if (!r.ok || !body.success) throw new Error(body.message ?? "Invalid link.");
        setBooking(body.booking);
      })
      .catch((e) => setError(e.message ?? "Could not load your booking."));
  }, [id, token]);

  useEffect(load, [load]);

  const post = async (path: string, extra: Record<string, unknown> = {}) => {
    setBusy(true);
    try {
      const res = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, token, ...extra }),
      });
      const body = await res.json();
      if (!res.ok || !body.success) return { ok: false, message: body.message ?? "Something went wrong." };
      return { ok: true as const, booking: body.booking as BookingView | undefined };
    } catch {
      return { ok: false, message: "Network error. Please try again." };
    } finally {
      setBusy(false);
    }
  };

  const cancel = async () => {
    const result = await post("/api/booking/cancel");
    if (!result.ok) { setError(result.message); return; }
    setConfirmCancel(false);
    load();
  };

  const startReschedule = () => {
    if (!booking) return;
    // Default the date input to ~a week after the current booking.
    const suggested = new Date(`${booking.date}T12:00:00Z`);
    suggested.setUTCDate(suggested.getUTCDate() + 7);
    while ([0, 6].includes(new Date(`${suggested.toISOString().slice(0, 10)}T12:00:00Z`).getUTCDay())) {
      suggested.setUTCDate(suggested.getUTCDate() + 1);
    }
    setNewDate(suggested.toISOString().slice(0, 10));
    setSlots(null);
    setRescheduling(true);
  };

  const loadSlots = async (date: string) => {
    setSlots(null);
    if (!booking || !date) return;
    try {
      const res = await fetch(`/api/booking/availability?date=${date}&serviceId=${booking.service.id}`);
      const body = await res.json();
      setSlots(body.success ? body.groups.flatMap((g: { slots: { time: string; available: boolean }[] }) => g.slots) : []);
    } catch {
      setError("Could not load slots. Please try again.");
    }
  };

  const pickSlot = async (time: string) => {
    const result = await post("/api/booking/reschedule", { date: newDate, time });
    if (!result.ok) {
      setError(result.message);
      if (newDate) loadSlots(newDate);
      return;
    }
    if (result.booking) setBooking(result.booking);
    setRescheduling(false);
    setSlots(null);
  };

  if (error && !booking) {
    return (
      <div className="card">
        <div className="empty-state">
          <h4 className="t-h4">Can't open this link</h4>
          <p>{error}</p>
          <a href="/contact/" className="btn btn-primary btn-sm">Contact me</a>
        </div>
      </div>
    );
  }

  if (!booking) return <div className="skeleton" style={{ height: 280 }} />;

  const cancelled = booking.status === "cancelled";

  return (
    <>
      {error && <div className="error-banner" role="alert">{error}</div>}
      <div style={{ maxWidth: 720 }} className="stack gap-5">
        <div className="card manage-card">
          <div className="manage-head">
            <div>
              <h1 className="t-h3">{booking.service.title}</h1>
              <p className="t-small">for {booking.customerName} · {booking.customerEmail}</p>
            </div>
            <span className={`badge ${STATUS_BADGE[booking.status] ?? "badge"}`}>
              <span className="dot" />{booking.status}
            </span>
          </div>

          {!cancelled ? (
            <>
              <div className="summary-row"><span>Date</span><strong>{booking.date}</strong></div>
              <div className="summary-row"><span>Start</span><strong>{booking.startTime} ({booking.timezone})</strong></div>
              <div className="summary-row"><span>Duration</span><strong>{booking.service.durationLabel}</strong></div>
              <div className="summary-row"><span>Total</span><strong>{booking.amount}</strong></div>
              {booking.meetUrl && (
                <a href={booking.meetUrl} className="btn btn-secondary btn-sm" style={{ alignSelf: "flex-start" }}>
                  Join video call
                </a>
              )}
              <div className="cutoff-note">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-400)" strokeWidth="1.8" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {booking.canModify
                  ? "You can reschedule or cancel up to 24 hours before the start time."
                  : `Changes closed on ${booking.cutoffAt.slice(0, 10)} — reply to your confirmation email for anything urgent.`}
              </div>

              {rescheduling ? (
                <div className="cancel-confirm">
                  <p className="t-body">Pick a new slot — it replaces the current one immediately.</p>
                  <div className="field" style={{ maxWidth: 260 }}>
                    <label className="label" htmlFor="rs-date">New date</label>
                    <input
                      id="rs-date"
                      type="date"
                      className="input"
                      value={newDate}
                      min={booking.date}
                      onChange={(e) => { setNewDate(e.target.value); loadSlots(e.target.value); }}
                    />
                  </div>
                  {slots && (
                    <div className="slot-grid" style={{ width: "100%", gridTemplateColumns: "repeat(auto-fill, minmax(84px, 1fr))" }}>
                      {slots.filter((s) => s.available).map((s) => (
                        <button key={s.time} type="button" className="slot-btn" disabled={busy} onClick={() => pickSlot(s.time)}>
                          {s.time}
                        </button>
                      ))}
                    </div>
                  )}
                  {slots !== null && slots.every((s) => !s.available) && (
                    <p className="t-small">No open slots that day — try another date.</p>
                  )}
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setRescheduling(false)}>Keep current slot</button>
                </div>
              ) : (
                <div className="manage-actions">
                  <button type="button" className="btn btn-secondary" disabled={!booking.canModify || busy} onClick={() => setRescheduling(true)}>
                    Reschedule
                  </button>
                  <button type="button" className="btn btn-ghost" disabled={!booking.canModify || busy} style={{ color: "var(--negative)" }} onClick={() => setConfirmCancel(true)}>
                    Cancel booking
                  </button>
                </div>
              )}

              {confirmCancel && (
                <div className="card cancel-confirm" style={{ background: "var(--negative-soft)", borderColor: "rgba(244,115,115,0.35)" }}>
                  <h4 className="t-h4">Cancel this booking?</h4>
                  <p className="t-small">The slot is released immediately. Refunds are processed manually within 48h.</p>
                  <div className="manage-actions">
                    <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={cancel}>{busy ? "Cancelling…" : "Yes, cancel it"}</button>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmCancel(false)}>Keep booking</button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="cancelled-state stack gap-4">
              <h2 className="t-h3">This booking is cancelled</h2>
              <p className="t-body">If you paid and are owed a refund, it's handled manually within 48h.</p>
              <a href="/booking/" className="btn btn-primary btn-sm">Book a new session</a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageBooking;
