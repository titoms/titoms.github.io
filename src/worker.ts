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
}

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

const MAX_BODY_BYTES = 4096;
const DEFAULT_BEEHIIV_API_BASE_URL = "https://api.beehiiv.com";
const GENERIC_NEWSLETTER_ERROR = "We could not subscribe you right now. Please try again later.";

const ALLOWED_CORS_ORIGINS = new Set([
  "https://fullstackchris.dev",
  "http://localhost:4321",
  "http://localhost:5173",
  "http://localhost:8787",
]);

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

  // Runtime-only Cloudflare secrets. Missing values are intentionally hidden
  // from the browser response so deployment details are not exposed.
  if (!beehiivApiKey || !publicationId) {
    return jsonResponse({ success: false, message: GENERIC_NEWSLETTER_ERROR }, 500, corsHeaders);
  }

  const apiBaseUrl = (env.BEEHIIV_API_BASE_URL || DEFAULT_BEEHIIV_API_BASE_URL).replace(/\/+$/, "");
  const beehiivResponse = await fetch(
    `${apiBaseUrl}/v2/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${beehiivApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildBeehiivPayload(input)),
    },
  );

  if (!beehiivResponse.ok) {
    return jsonResponse({ success: false, message: GENERIC_NEWSLETTER_ERROR }, 502, corsHeaders);
  }

  return jsonResponse({
    success: true,
    message: "Check your inbox to confirm your subscription.",
  }, 200, corsHeaders);
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
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

    if (url.pathname === "/api/newsletter/subscribe") {
      return handleNewsletterSubscribe(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
