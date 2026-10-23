import { useState } from "react";
import { getBookingService } from "../../../config/bookingServices";
import { getDraft, hasLiveHold, patchDraft } from "./draft";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const DetailsForm = () => {
  const draft = getDraft();
  const service = draft.serviceId ? getBookingService(draft.serviceId) : undefined;
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!service || service.priceCents === null || !draft.date || !draft.slot) {
    return (
      <div className="card">
        <div className="empty-state">
          <h4 className="t-h4">No slot selected</h4>
          <p>Choose a date and time first.</p>
          <a href="/booking/schedule/" className="btn btn-primary btn-sm">Back to schedule</a>
        </div>
      </div>
    );
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasLiveHold(getDraft())) {
      setError("Your slot hold expired — pick the slot again to reserve it.");
      return;
    }
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();

    if (!name) return setError("Please enter your name.");
    if (!EMAIL_PATTERN.test(email)) return setError("Please enter a valid email address.");

    setError(null);
    setBusy(true);
    patchDraft({
      name,
      email,
      company: String(form.get("company") ?? "").trim(),
      projectDetails: String(form.get("projectDetails") ?? "").trim(),
      prepNotes: String(form.get("prepNotes") ?? "").trim(),
    });
    window.location.href = "/booking/checkout/";
  };

  const editSchedule = () => {
    window.location.href = "/booking/schedule/";
  };

  return (
    <div className="sched-grid">
      <form onSubmit={submit}>
        {error && <div className="error-banner" role="alert">{error}</div>}

        <div className="card form-section">
          <h3>Contact</h3>
          <div className="form-grid">
            <div className="field">
              <label className="label" htmlFor="bk-name">Name *</label>
              <input id="bk-name" name="name" className="input" required defaultValue={draft.name} placeholder="Your name" />
            </div>
            <div className="field">
              <label className="label" htmlFor="bk-email">Email *</label>
              <input id="bk-email" name="email" type="email" required defaultValue={draft.email} placeholder="you@example.com" />
            </div>
          </div>
          <div className="field" style={{ marginTop: "var(--sp-4)" }}>
            <label className="label" htmlFor="bk-company">Company / project</label>
            <input id="bk-company" name="company" className="input" defaultValue={draft.company} placeholder="Optional" />
          </div>
        </div>

        <div className="card form-section">
          <h3>Project details</h3>
          <div className="field">
            <label className="label" htmlFor="bk-details">What should we work on? *</label>
            <textarea
              id="bk-details"
              name="projectDetails"
              className="textarea"
              required
              minLength={20}
              defaultValue={draft.projectDetails}
              placeholder="Describe your project, your blocker or the feature you have in mind…"
            />
          </div>
          <div className="field" style={{ marginTop: "var(--sp-4)" }}>
            <label className="label" htmlFor="bk-prep">Anything to prepare?</label>
            <textarea
              id="bk-prep"
              name="prepNotes"
              className="textarea"
              style={{ minHeight: 80 }}
              defaultValue={draft.prepNotes}
              placeholder="Optional — links to repos, docs, screenshots…"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }} disabled={busy}>
          Continue to payment <span className="arrow">→</span>
        </button>
        <p className="t-small" style={{ textAlign: "center", marginTop: "var(--sp-3)" }}>You won't be charged yet.</p>
      </form>

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
        <div className="summary-row">
          <span>Schedule</span>
          <a href="/booking/schedule/" className="edit">Edit</a>
        </div>
        <div className="summary-total"><span>Total</span><span>€{Math.round(service.priceCents / 100)}</span></div>
        {!hasLiveHold(draft) && (
          <p className="t-small" style={{ color: "var(--negative)" }}>Slot hold expired — you'll re-reserve it on the next step.</p>
        )}
      </aside>
    </div>
  );
};

export default DetailsForm;
