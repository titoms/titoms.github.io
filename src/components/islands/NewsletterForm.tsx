import { useState } from "react";
import { Button } from "../ui";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("success");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-white placeholder:text-low focus:border-accent focus:outline-none"
      />
      <Button type="submit" variant="primary" size="md">
        Subscribe
      </Button>
      {status === "success" && (
        <p className="w-full text-sm text-positive">You're in! Check your inbox.</p>
      )}
    </form>
  );
};

export default NewsletterForm;
