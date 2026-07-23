/// <reference types="@cloudflare/workers-types" />

import {
  buildBeehiivPayload,
  normalizeSignupInput,
  validateSignupInput,
} from "./server/newsletter.js";

export interface Env {
  ASSETS: Fetcher;
  BEEHIIV_API_KEY?: string;
  BEEHIIV_PUBLICATION_ID?: string;
  BEEHIIV_API_BASE_URL?: string;
  DEBUG_BEEHIIV?: string;
  BEEHIIV_CUSTOM_FIELDS_ENABLED?: string;
}

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

const MAX_BODY_BYTES = 4096;
const DEFAULT_BEEHIIV_API_BASE_URL = "https://api.beehiiv.com";
const GENERIC_NEWSLETTER_ERROR = "We could not subscribe you right now. Please try again later.";
const MAX_BEEHIIV_DEBUG_BODY_CHARS = 1000;

const ALLOWED_CORS_ORIGINS = new Set([
  "https://fullstackchris.dev",
  "http://localhost:4321",
  "http://localhost:5173",
  "http://localhost:8787",
]);

const CANONICAL_HOST = "fullstackchris.dev";
const ROUTE_FILE_EXTENSION = /\.[^/]+$/;

const isStaticPagePath = (pathname: string) =>
  pathname !== "/" &&
  !pathname.startsWith("/api/") &&
  !pathname.startsWith("/cdn-cgi/") &&
  !pathname.startsWith("/.well-known/") &&
  !ROUTE_FILE_EXTENSION.test(pathname);

const getCanonicalRedirect = (request: Request) => {
  const url = new URL(request.url);
  let changed = false;

  if (url.protocol !== "https:") {
    url.protocol = "https:";
    changed = true;
  }

  if (url.hostname === "www.fullstackchris.dev") {
    url.hostname = CANONICAL_HOST;
    changed = true;
  }

  if ((request.method === "GET" || request.method === "HEAD") && isStaticPagePath(url.pathname) && !url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
    changed = true;
  }

  return changed ? Response.redirect(url.toString(), 308) : null;
};

type JsonBody = Record<string, unknown>;

const jsonResponse = (body: JsonBody, status = 200, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...headers,
    },
  });

const getCorsHeaders = (request: Request) => {
  const origin = request.headers.get("Origin");
  if (!origin || !ALLOWED_CORS_ORIGINS.has(origin)) return {};

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
};

const readJsonBody = async (request: Request) => {
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return { ok: false as const, status: 413, message: "Request payload is too large." };
  }

  try {
    const text = await request.text();
    if (!text || text.length > MAX_BODY_BYTES) {
      return { ok: false as const, status: 400, message: "Request payload is invalid." };
    }

    return { ok: true as const, value: JSON.parse(text) };
  } catch {
    return { ok: false as const, status: 400, message: "Request payload must be valid JSON." };
  }
};

const handleNewsletterOptions = (request: Request) =>
  new Response(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });

const isDebugBeehiivEnabled = (env: Env) => env.DEBUG_BEEHIIV === "true";

const isBeehiivCustomFieldsEnabled = (env: Env) => env.BEEHIIV_CUSTOM_FIELDS_ENABLED === "true";

const publicationIdLooksValid = (publicationId?: string) => Boolean(publicationId?.startsWith("pub_"));

const getBeehiivApiBaseUrl = (env: Env) => {
  const rawBaseUrl = (env.BEEHIIV_API_BASE_URL || DEFAULT_BEEHIIV_API_BASE_URL).trim();
  const withoutTrailingSlashes = rawBaseUrl.replace(/\/+$/, "");

  return withoutTrailingSlashes.replace(/\/v2$/i, "") || DEFAULT_BEEHIIV_API_BASE_URL;
};

const buildBeehiivUrl = (env: Env, publicationId: string, path: string) =>
  `${getBeehiivApiBaseUrl(env)}/v2/publications/${encodeURIComponent(publicationId)}${path}`;

const sanitizeDebugText = (value: string) =>
  value
    .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, "[email]")
    .slice(0, MAX_BEEHIIV_DEBUG_BODY_CHARS);

const readBeehiivFailureBody = async (response: Response) => {
  try {
    return sanitizeDebugText(await response.text());
  } catch {
    return "";
  }
};

const extractCustomFieldName = (field: unknown) => {
  if (!field || typeof field !== "object") return "";

  const record = field as Record<string, unknown>;
  const candidate = record.name || record.display || record.display_name || record.key;

  return typeof candidate === "string" ? candidate : "";
};

const extractCustomFieldType = (field: unknown) => {
  if (!field || typeof field !== "object") return "";

  const record = field as Record<string, unknown>;
  const candidate = record.type || record.kind || record.field_type;

  return typeof candidate === "string" ? candidate : "";
};

const getCustomFieldsFromResponseBody = (body: unknown) => {
  if (Array.isArray(body)) return body;
  if (!body || typeof body !== "object") return [];

  const record = body as Record<string, unknown>;
  if (Array.isArray(record.data)) return record.data;
  if (Array.isArray(record.custom_fields)) return record.custom_fields;

  return [];
};

const fetchBeehiivCustomFields = async (env: Env, beehiivApiKey: string, publicationId: string) => {
  const response = await fetch(buildBeehiivUrl(env, publicationId, "/custom_fields"), {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${beehiivApiKey}`,
    },
  });

  if (!response.ok) {
    return {
      ok: false as const,
      status: response.status,
      body: await readBeehiivFailureBody(response),
      fields: [],
    };
  }

  try {
    const responseBody = await response.json();
    return {
      ok: true as const,
      status: response.status,
      body: "",
      fields: getCustomFieldsFromResponseBody(responseBody),
    };
  } catch {
    return {
      ok: false as const,
      status: response.status,
      body: "beehiiv custom fields response was not valid JSON",
      fields: [],
    };
  }
};

const getExistingBeehiivCustomFieldNames = async (
  env: Env,
  beehiivApiKey: string,
  publicationId: string,
) => {
  if (!isBeehiivCustomFieldsEnabled(env)) return new Set<string>();

  const result = await fetchBeehiivCustomFields(env, beehiivApiKey, publicationId);
  if (!result.ok) {
    console.warn("[beehiiv-newsletter] custom fields lookup failed", {
      status: result.status,
      body: result.body,
    });

    return new Set<string>();
  }

  return new Set(result.fields.map(extractCustomFieldName).filter(Boolean));
};

const handleNewsletterDebugConfig = (env: Env) =>
  jsonResponse({
    ok: true,
    hasBeehiivApiKey: Boolean(env.BEEHIIV_API_KEY),
    hasBeehiivPublicationId: Boolean(env.BEEHIIV_PUBLICATION_ID),
    beehiivApiBaseUrl: getBeehiivApiBaseUrl(env),
    publicationIdLooksValid: publicationIdLooksValid(env.BEEHIIV_PUBLICATION_ID),
  });

const handleNewsletterCustomFields = async (env: Env) => {
  if (!isDebugBeehiivEnabled(env)) {
    return jsonResponse({ ok: false, message: "Not found." }, 404);
  }

  const beehiivApiKey = env.BEEHIIV_API_KEY;
  const publicationId = env.BEEHIIV_PUBLICATION_ID;

  if (!beehiivApiKey || !publicationId) {
    return jsonResponse({ ok: false, message: GENERIC_NEWSLETTER_ERROR }, 500);
  }

  const result = await fetchBeehiivCustomFields(env, beehiivApiKey, publicationId);
  if (!result.ok) {
    return jsonResponse({
      ok: false,
      message: GENERIC_NEWSLETTER_ERROR,
      debug: {
        beehiivStatus: result.status,
        beehiivBody: result.body,
      },
    }, 502);
  }

  return jsonResponse({
    ok: true,
    customFields: result.fields.map((field) => {
      const record = field && typeof field === "object" ? field as Record<string, unknown> : {};

      return {
        id: typeof record.id === "string" ? record.id : "",
        name: extractCustomFieldName(field),
        type: extractCustomFieldType(field),
      };
    }),
  });
};

const handleNewsletterSubscribe = async (request: Request, env: Env) => {
  const corsHeaders = getCorsHeaders(request);

  if (request.method !== "POST") {
    return jsonResponse({ success: false, message: "Method not allowed." }, 405, {
      Allow: "POST, OPTIONS",
      ...corsHeaders,
    });
  }

  const body = await readJsonBody(request);
  if (!body.ok) {
    return jsonResponse({ success: false, message: body.message }, body.status, corsHeaders);
  }

  const input = normalizeSignupInput(body.value);
  const validation = validateSignupInput(input);
  if (!validation.ok) {
    return jsonResponse({ success: false, message: validation.message }, 400, corsHeaders);
  }

  const beehiivApiKey = env.BEEHIIV_API_KEY;
  const publicationId = env.BEEHIIV_PUBLICATION_ID;
  const beehiivDebugEnabled = isDebugBeehiivEnabled(env);

  console.log("[beehiiv-newsletter] subscribe request received", {
    hasSource: Boolean(input.source),
    hasInterest: Boolean(input.interest),
  });

  console.log("[beehiiv-newsletter] config", {
    hasBeehiivApiKey: Boolean(beehiivApiKey),
    hasBeehiivPublicationId: Boolean(publicationId),
    publicationIdLooksValid: publicationIdLooksValid(publicationId),
  });

  // Runtime-only Cloudflare secrets. Missing values are intentionally hidden
  // from the browser response so deployment details are not exposed.
  if (!beehiivApiKey || !publicationId) {
    return jsonResponse({ success: false, message: GENERIC_NEWSLETTER_ERROR }, 500, corsHeaders);
  }

  const existingCustomFieldNames = input.interest
    ? await getExistingBeehiivCustomFieldNames(env, beehiivApiKey, publicationId)
    : new Set<string>();

  const beehiivResponse = await fetch(
    buildBeehiivUrl(env, publicationId, "/subscriptions"),
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${beehiivApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildBeehiivPayload(input, {
        customFieldsEnabled: isBeehiivCustomFieldsEnabled(env),
        existingCustomFieldNames,
      })),
    },
  );

  console.log("[beehiiv-newsletter] beehiiv response", {
    status: beehiivResponse.status,
    ok: beehiivResponse.ok,
  });

  if (!beehiivResponse.ok) {
    const beehiivBody = await readBeehiivFailureBody(beehiivResponse);

    console.warn("[beehiiv-newsletter] beehiiv failure body", {
      status: beehiivResponse.status,
      body: beehiivBody,
    });

    const responseBody: JsonBody = {
      success: false,
      message: GENERIC_NEWSLETTER_ERROR,
    };

    if (beehiivDebugEnabled) {
      responseBody.debug = {
        beehiivStatus: beehiivResponse.status,
        beehiivBody,
      };
    }

    return jsonResponse(responseBody, 502, corsHeaders);
  }

  return jsonResponse({
    success: true,
    message: "Check your inbox to confirm your subscription.",
  }, 200, corsHeaders);
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const canonicalRedirect = getCanonicalRedirect(request);
    if (canonicalRedirect) return canonicalRedirect;

    const url = new URL(request.url);

    if (url.pathname === "/api/health" && request.method === "GET") {
      return jsonResponse({
        ok: true,
        service: "fullstackchris-api",
      });
    }

    if (url.pathname === "/api/newsletter/subscribe" && request.method === "OPTIONS") {
      return handleNewsletterOptions(request);
    }

    if (url.pathname === "/api/newsletter/debug-config" && request.method === "GET") {
      return handleNewsletterDebugConfig(env);
    }

    if (url.pathname === "/api/newsletter/custom-fields" && request.method === "GET") {
      return handleNewsletterCustomFields(env);
    }

    if (url.pathname === "/api/newsletter/subscribe") {
      return handleNewsletterSubscribe(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
