// Small shared helpers for D1-backed modules.

export const newId = (): string => crypto.randomUUID();

export const nowIso = (): string => new Date().toISOString();

export const addSecondsIso = (iso: string, seconds: number): string =>
  new Date(new Date(iso).getTime() + seconds * 1000).toISOString();
