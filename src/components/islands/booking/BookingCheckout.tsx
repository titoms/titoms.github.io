import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { getBookingService } from "../../../config/bookingServices";
import { getDraft, hasLiveHold, patchDraft } from "./draft";

const stripePromise = loadStripe((import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY as string) ?? "");

const PayForm = ({ bookingId }: { bookingId: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || paying) return;
    setPaying(true);
    setError(null);

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: { return_url: `${window.location.origin}/booking/confirmation/?b=${bookingId}` },
    });

    if (confirmError) {
      setError(confirmError.message ?? "Payment failed. Please try again.");
      setPaying(false);
      return;
    }

    window.location.href = `/booking/confirmation/?b=${bookingId}`;
  };

  return (
    <form onSubmit={submit}>
      <div className="field" style={{ marginBottom: "var(--sp-5)" }}>
        <label className="label">Card details</label>
        <div className="cc-field">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          <PaymentElement />
        </div>
      </div>
      {error && <div className="error-banner">{error}</div>}
      <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }} disabled={!stripe || paying}>
        {paying ? "Processing…" : <>Confirm & pay <span className="arrow">→</span></>}
      </button>
      <p className="t-small" style={{ textAlign: "center", marginTop: "var(--sp-4)" }}>
        Payments are processed securely by Stripe. Your card details never touch our servers.
      </p>
    </form>
  );
};

const BookingCheckout = () => {
  const draft = getDraft();
  const service = draft.serviceId ? getBookingService(draft.serviceId) : undefined;

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestedRef = useRef("");

  // If the hold expired while the user typed their details, re-reserve first.
  const reholdIfNeeded = useCallback(async (): Promise<boolean> => {
    const current = getDraft();
    if (hasLiveHold(current)) return true;
    try {
      const res = await fetch("/api/booking/hold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: current.serviceId,
          date: current.date,
          time: current.slot,
          timezone: current.tz,
        }),
      });
      const body = await res.json();
      if (!res.ok || !body.success) {
        window.location.href = "/booking/schedule/?error=slot";
        return false;
      }
      patchDraft({ holdId: body.holdId, holdExpiresAt: body.expiresAt });
      return true;
    } catch {
      setError("Network error. Please try again.");
      return false;
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = "";
    if (!service || service.priceCents === null || !draft.date || !draft.slot) {
      window.location.href = "/booking/schedule/";
      return;
    }
    (async () => {
      if (!(await reholdIfNeeded())) return;
      if (requestedRef.current) return;
      requestedRef.current = "1";
      setBusy(true);

      const current = getDraft();
      try {
        const res = await fetch("/api/booking/payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            holdId: current.holdId,
            name: current.name,
            email: current.email,
            company: current.company,
            projectDetails: current.projectDetails,
            prepNotes: current.prepNotes,
          }),
        });
        const body = await res.json();

        if (!res.ok || !body.success) {
          if (body.code === "slot-taken" || body.code === "hold-expired") {
            window.location.href = "/booking/schedule/?error=slot";
            return;
          }
          setError(body.message ?? "Something went wrong. Please try again.");
          setBusy(false);
          return;
        }

        setClientSecret(body.clientSecret);
        setBookingId(current.holdId ?? null);
        setBusy(false);
      } catch {
        setError("Network error. Please try again.");
        requestedRef.current = "";
        setBusy(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = useMemo(
    () => ({
      clientSecret: clientSecret ?? "",
      appearance: {
        theme: "night" as const,
        variables: {
          colorPrimary: "#a78bfa",
          colorBackground: "#22222a",
          colorText: "#f4f4f6",
          colorDanger: "#f47373",
          fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
          borderRadius: "10px",
        },
      },
    }),
    [clientSecret],
  );

  if (!service || service.priceCents === null) return null;

  return (
    <>
      {error && <div className="error-banner" role="alert">{error}</div>}
      <div className="sched-grid">
        <div className="card co-section" style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}>
          <h3 className="t-h4">Payment</h3>
          {busy && <div className="skeleton" style={{ height: 180 }} />}
          {!busy && !clientSecret && <p className="t-body">Could not start payment — refresh to retry.</p>}
          {clientSecret && bookingId && (
            <Elements key={clientSecret} stripe={stripePromise} options={options}>
              <PayForm bookingId={bookingId} />
            </Elements>
          )}
        </div>

        <aside className="card summary-card">
          <h4 className="t-h4">Your booking</h4>
          <div className="svc-line">
            <div>
              <h4>{service.title}</h4>
              <span className="t-small">{service.durationLabel}</span>
            </div>
            <span className="price-tag">€{Math.round(service.priceCents / 100)}</span>
          </div>
          <div className="summary-row"><span>Date</span><strong>{draft.date}</strong></div>
          <div className="summary-row"><span>Time</span><strong>{draft.slot}</strong></div>
          <div className="summary-row"><span>Timezone</span><strong>{draft.tz}</strong></div>
          <div className="summary-total"><span>Total</span><span>€{Math.round(service.priceCents / 100)}</span></div>
          <a href="/booking/details/" className="edit" style={{ textAlign: "center", color: "var(--accent-400)", fontSize: "0.8rem" }}>Edit details</a>
        </aside>
      </div>
    </>
  );
};

export default BookingCheckout;
