// In-memory D1 stand-in backed by node:sqlite (Node 24), with the real
// migrations applied — tests exercise actual SQL semantics.

import { readFileSync, readdirSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";

const migrationsDir = new URL("../migrations/", import.meta.url);

export const makeFakeD1 = () => {
  const db = new DatabaseSync(":memory:");

  const migrationFiles = readdirSync(migrationsDir).filter((f) => f.endsWith(".sql")).sort();
  for (const file of migrationFiles) {
    db.exec(readFileSync(new URL(file, migrationsDir), "utf8"));
  }

  return {
    prepare(sql) {
      const state = { params: [] };
      const api = {
        bind(...params) {
          state.params = params;
          return api;
        },
        async first() {
          return db.prepare(sql).get(...state.params) ?? null;
        },
        async all() {
          return { results: db.prepare(sql).all(...state.params), success: true };
        },
        async run() {
          const info = db.prepare(sql).run(...state.params);
          return { success: true, meta: { changes: info.changes } };
        },
      };
      return api;
    },
  };
};

export const makeFakeR2 = (objects = {}) => ({
  async get(key) {
    const entry = objects[key];
    if (!entry) return null;
    return {
      body: entry.body ?? `fake-bytes:${key}`,
      httpMetadata: entry.httpMetadata ?? { contentType: "application/zip" },
    };
  },
});

export const makeTestEnv = (overrides = {}) => ({
  ASSETS: { fetch: async () => new Response("asset fallback", { status: 200 }) },
  DB: makeFakeD1(),
  ...overrides,
});

export const postJson = (path, body, headers = {}) =>
  new Request(`https://fullstackchris.dev${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });

export const getJson = (path, headers = {}) =>
  new Request(`https://fullstackchris.dev${path}`, { method: "GET", headers });
