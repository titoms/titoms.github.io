// Resend transactional email client (fetch-based, Workers-safe).

export interface EmailAttachment {
  filename: string;
  /** base64-encoded content */
  contentBase64: string;
}

export interface EmailMessage {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  attachments?: EmailAttachment[];
}

export interface MailerEnv {
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
  DEBUG_EMAIL_LINKS?: string;
}

const RESEND_API_URL = "https://api.resend.com/emails";

export const sendEmail = async (
  env: MailerEnv,
  message: EmailMessage,
): Promise<{ ok: boolean; status: number; error?: string }> => {
  if (!env.RESEND_API_KEY) {
    console.error("[mailer] RESEND_API_KEY missing — email not sent", { subject: message.subject });
    return { ok: false, status: 0, error: "mailer not configured" };
  }

  const payload: Record<string, unknown> = {
    from: env.EMAIL_FROM || "Full Stack Chris <hello@fullstackchris.dev>",
    to: Array.isArray(message.to) ? message.to : [message.to],
    subject: message.subject,
    html: message.html,
  };
  if (message.text) payload.text = message.text;
  if (message.attachments?.length) {
    payload.attachments = message.attachments.map((a) => ({
      filename: a.filename,
      content: a.contentBase64,
    }));
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("[mailer] resend failure", { status: response.status, body: body.slice(0, 500) });
      return { ok: false, status: response.status, error: "resend failure" };
    }

    return { ok: true, status: response.status };
  } catch (error) {
    console.error("[mailer] network error", { error: String(error) });
    return { ok: false, status: 0, error: "network error" };
  }
};

/** Simple branded HTML shell shared by all transactional emails. */
export const emailShell = (title: string, bodyHtml: string): string => `<!doctype html>
<html><body style="margin:0;padding:24px;background:#0d0d10;color:#f4f4f6;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#1a1a20;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px;">
    <div style="font-family:monospace;font-size:12px;letter-spacing:0.08em;color:#a78bfa;margin-bottom:16px;">FULLSTACKCHRIS.DEV</div>
    <h1 style="font-size:20px;margin:0 0 16px;">${title}</h1>
    ${bodyHtml}
    <p style="color:#8f8f9d;font-size:12px;margin-top:32px;">Christophe Crognier — fullstackchris.dev</p>
  </div>
</body></html>`;

export const emailButton = (href: string, label: string): string =>
  `<a href="${href}" style="display:inline-block;background:#a78bfa;color:#15101f;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:10px;margin:8px 0;">${label}</a>`;
