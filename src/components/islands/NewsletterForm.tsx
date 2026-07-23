import { useEffect, useState } from "react";
import { Button } from "../ui";
import { trackEvent } from "../../utils/analytics";
import { useTranslations } from "../../i18n/ui";

type NewsletterResponse = {
  success: boolean;
  message?: string;
};

type NewsletterFormProps = {
  locale?: string;
};

const NewsletterForm = ({ locale = "en" }: NewsletterFormProps) => {
  const t = useTranslations(locale);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const honeypot = String(formData.get("honeypot") ?? "");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "homepage",
          interest: "AI workflows",
          honeypot,
        }),
      });

      const result = await response.json() as NewsletterResponse;

      if (!response.ok || !result.success) {
        setStatus("error");
        return;
      }

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
        <p className="text-sm text-positive">{t("newsletter.successFallback")}</p>
        <p className="mt-1 text-xs text-mid">{t("newsletter.confirmationHint")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
      <label className="hidden" aria-hidden="true">
        {t("newsletter.honeypotLabel")}
        <input
          type="text"
          name="honeypot"
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
      <label htmlFor="newsletter-email" className="sr-only">
        {t("newsletter.emailLabel")}
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("newsletter.placeholder")}
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
        {status === "loading" ? t("newsletter.sending") : t("newsletter.subscribe")}
      </Button>
      {status === "error" && (
        <p className="w-full text-sm text-negative">{t("newsletter.errorFallback")}</p>
      )}
    </form>
  );
};

export default NewsletterForm;
