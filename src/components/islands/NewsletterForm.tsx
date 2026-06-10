import { useState } from "react";
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
      trackEvent("newsletter_signup", { source: "footer" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="text-sm text-positive">
        You're in! Check your inbox for a confirmation email.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={status === "loading"}
        className="flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-white placeholder:text-low focus:border-accent focus:outline-none disabled:opacity-60"
      />
      <Button type="submit" variant="primary" size="md" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Subscribe"}
      </Button>
      {status === "error" && (
        <p className="w-full text-sm text-negative">Something went wrong. Please try again.</p>
      )}
    </form>
  );
};

export default NewsletterForm;
