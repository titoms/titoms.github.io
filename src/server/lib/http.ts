// Shared HTTP helpers for /api/* modules (JSON responses + bounded JSON body reads).

export const json = (body: unknown, status = 200, headers: HeadersInit = {}): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  });

const MAX_BODY_BYTES = 16384;

export type JsonReadResult =
  | { ok: true; value: Record<string, unknown> }
  | { ok: false; response: Response };

export const readJson = async (request: Request): Promise<JsonReadResult> => {
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return { ok: false, response: json({ success: false, message: "Request payload is too large." }, 413) };
  }

  try {
    const text = await request.text();
    if (!text || text.length > MAX_BODY_BYTES) {
      return { ok: false, response: json({ success: false, message: "Request payload is invalid." }, 400) };
    }
    const value = JSON.parse(text);
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return { ok: false, response: json({ success: false, message: "Request payload must be a JSON object." }, 400) };
    }
    return { ok: true, value: value as Record<string, unknown> };
  } catch {
    return { ok: false, response: json({ success: false, message: "Request payload must be valid JSON." }, 400) };
  }
};
