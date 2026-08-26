import { useEffect, useState } from "react";
import { getBookingService } from "../../../config/bookingServices";
import { clearSchedule, getDraft, patchDraft } from "./draft";

/** Post-payment confirmation: shows the booked slot + what happens next.
 *  The authoritative details (Meet link, .ics) arrive by email once the
 *  webhook confirms the booking. */
const BookingConfirmation = () => {
  const [bookingId, setBookingId] = useState<string | null>(null);

  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search).get("b");
    const draft = getDraft();
    const id = urlParam ?? draft.confirmedBookingId ?? draft.holdId ?? null;
    setBookingId(id);
    patchDraft({ confirmedBookingId: id ?? undefined });
    // The slot is now taken — drop schedule state so a new booking starts fresh.
    clearSchedule();
  }, []);

  const draft = getDraft();
  const service = draft.serviceId ? getBookingService(draft.serviceId) : undefined;

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <div className="confirm-hero bk" style={{ padding: 0, marginBottom: "var(--sp-6)" }}>
        <div className="confirm-check">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h1 className="t-h2">Your booking is confirmed!</h1>
        <p className="t-body">
          Payment received — check your inbox for the confirmation email with the video-call link and calendar file.
        </p>
      </div>

      <div className="card meeting-card" style={{ marginBottom: "var(--sp-5)", display: "flex" }}>
        <div className="info">
          <span className="ic">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </span>
          <div>
            <h4 className="t-h4">{service?.title ?? "Booking"}{draft.date ? ` — ${draft.date}` : ""}{draft.slot ? `, ${draft.slot}` : ""}</h4>
            {bookingId && <span className="t-small">Booking reference: {bookingId.slice(0, 8)}</span>}
          </div>
        </div>
      </div>

      <div className="card next-steps">
        <h3 className="t-h4" style={{ marginBottom: "var(--sp-3)" }}>What happens next</h3>
        <div className="step"><span className="step-num">1</span><div><strong>Confirmation email</strong><p className="t-small">Arrives within a minute — it contains the Google Meet link and an .ics file.</p></div></div>
        <div className="step"><span className="step-num">2</span><div><strong>Prepare your session</strong><p className="t-small">Share any repos or docs in advance using the link in the email — it makes the session far more effective.</p></div></div>
        <div className="step"><span className="step-num">3</span><div><strong>Manage anytime</strong><p className="t-small">Reschedule or cancel up to 24h before we start, straight from the email link.</p></div></div>
        <a href="/booking/" className="btn btn-secondary btn-sm" style={{ alignSelf: "flex-start", marginTop: "var(--sp-4)" }}>Back to booking <span className="arrow">→</span></a>
      </div>
    </div>
  );
};

export default BookingConfirmation;
