import { useEffect, useState } from "react";
import { Button } from "../ui";
import { BEEHIIV_PUBLICATION_ID } from "../../config/constants";
import { trackEvent } from "../../utils/analytics";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      // no-cors makes the response opaque — we cannot tell if beehiiv accepted,
      // rejected, deduped, or rate-limited the email. The success state means
      // "request submitted", not "subscription active". For real confirmation,
      // proxy this through a server (Worker / API route) and inspect the response.
      await fetch(`https://embeds.beehiiv.com/${BEEHIIV_PUBLICATION_ID}/subscribe`, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          email,
          utm_source: "website",
          utm_medium: "organic",
          utm_campaign: "newsletter-footer",
          double_opt_in: "false",
        }).toString(),
      });
      setStatus("success");
      setEmail("");
      trackEvent("newsletter_signup_submit", { source: "footer" });
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status === "success") {
      trackEvent("newsletter_signup_success_view", { source: "footer" });
    }
  }, [status]);

  if (status === "success") {
    return (
      <div data-analytics="newsletter_signup_success">
        <p className="text-sm text-positive">
          Check your inbox to confirm your subscription.
        </p>
        <p className="mt-1 text-xs text-mid">
          If confirmation is required, you'll receive an email from AI Clarity Newsletter shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        disabled={status === "loading"}
        className="min-h-[48px] flex-1 rounded-lg border border-strong bg-raised/80 px-4 py-3 text-sm text-white placeholder:text-low focus:border-accent focus:outline-none disabled:opacity-60"
      />
      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={status === "loading"}
        data-analytics="newsletter_signup_submit"
      >
        {status === "loading" ? "Sending…" : "Subscribe"}
      </Button>
      {status === "error" && (
        <p className="w-full text-sm text-negative">Something went wrong. Please try again.</p>
      )}
    </form>
  );
};

export default NewsletterForm;
