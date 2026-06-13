const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const SAFE_TEXT_PATTERN = /^[\w .:@/+,-]{0,80}$/u;
const CONTROL_CHARS_PATTERN = /[\u0000-\u001f\u007f]/u;

const cleanString = (value) => (typeof value === "string" ? value.trim() : "");

export const normalizeSignupInput = (value) => {
  const data = value && typeof value === "object" ? value : {};

  return {
    email: cleanString(data.email).toLowerCase(),
    source: cleanString(data.source),
    interest: cleanString(data.interest),
    honeypot: cleanString(data.honeypot || data.website),
  };
};

export const validateSignupInput = (input) => {
  if (input.honeypot) {
    return { ok: false, message: "Unable to process this subscription." };
  }

  if (!input.email || input.email.length > 254 || !EMAIL_PATTERN.test(input.email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  if (CONTROL_CHARS_PATTERN.test(input.email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  if (!SAFE_TEXT_PATTERN.test(input.source) || !SAFE_TEXT_PATTERN.test(input.interest)) {
    return { ok: false, message: "Unable to process this subscription." };
  }

  return { ok: true };
};

export const buildBeehiivPayload = (input, options = {}) => {
  const payload = {
    email: input.email,
    reactivate_existing: false,
    send_welcome_email: false,
    utm_source: input.source || "website",
    utm_medium: "organic",
    utm_campaign: "ai_clarity_newsletter",
    double_opt_override: "not_set",
  };

  const existingCustomFieldNames = options.existingCustomFieldNames || new Set();
  if (options.customFieldsEnabled && input.interest && existingCustomFieldNames.has("Interest")) {
    const customFields = [{ name: "Interest", value: input.interest }];

    if (existingCustomFieldNames.has("Source")) {
      customFields.push({ name: "Source", value: input.source || "website" });
    }

    payload.custom_fields = customFields;
  }

  return payload;
};
