import { useState } from "react";

const CustomQuoteForm = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError(null);

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/booking/custom-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          company: form.get("company"),
          message: form.get("message"),
          honeypot: form.get("honeypot"),
        }),
      });
      const body = await res.json();
      if (!res.ok || !body.success) {
        setError(body.message ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setError("Network error. Please try again.");
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <div className="card svc-select">
        <span className="badge badge-positive">Request sent</span>
        <h3 className="t-h4">Thanks — talk soon.</h3>
        <p className="desc">
          I'll reply within 1–2 business days with a scope and time proposal. No calendar needed yet.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card svc-select">
      <h3 className="t-h3">Custom service</h3>
      <p className="desc">Something more specific? Describe it and I'll propose a scope and time.</p>

      {error && <div className="error-banner">{error}</div>}

      <div className="form-grid">
        <div className="field">
          <label className="label" htmlFor="cq-name">Name *</label>
          <input id="cq-name" name="name" className="input" required placeholder="Your name" />
        </div>
        <div className="field">
          <label className="label" htmlFor="cq-email">Email *</label>
          <input id="cq-email" name="email" type="email" required placeholder="you@example.com" />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="cq-company">Company / project</label>
        <input id="cq-company" name="company" placeholder="Optional" />
      </div>
      <div className="field">
        <label className="label" htmlFor="cq-message">What do you need? *</label>
        <textarea
          id="cq-message"
          name="message"
          className="textarea"
          required
          minLength={20}
          placeholder="Describe your project, your goal and what 'done' looks like…"
        />
      </div>
      <label hidden aria-hidden="true">
        Ignore this field <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" />
      </label>
      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : <>Send request <span className="arrow">→</span></>}
      </button>
    </form>
  );
};

export default CustomQuoteForm;
