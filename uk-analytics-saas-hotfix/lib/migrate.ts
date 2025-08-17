
import { defaultConfig, defaultTiles, PersistedConfig, SCHEMA_VERSION } from './config';

export function migrateConfig(saved: any): PersistedConfig {
  if (!saved || typeof saved !== 'object') return defaultConfig;
  const result: PersistedConfig = { ...defaultConfig, ...(saved as PersistedConfig) };
  if ((saved.schemaVersion || 0) < SCHEMA_VERSION) {
    result.schemaVersion = SCHEMA_VERSION;
  }
  const byIdDefault = Object.fromEntries(defaultTiles.map(t => [t.id, t]));
  const byIdSaved = Object.fromEntries((saved.tiles || []).map((t: any) => [t.id, t]));
  const merged = Object.keys(byIdDefault).map(id => {
    const d: any = (byIdDefault as any)[id];
    const s: any = byIdSaved[id] || {};
    return {
      ...d,
      ...s,
      id: d.id,
      title: s.title || d.title,
      category: s.category || d.category,
      endpoint: s.endpoint || d.endpoint,
      path: s.path ?? d.path,
      fmt: s.fmt || d.fmt,
      fallback: s.fallback ?? d.fallback,
      source: s.source || d.source,
    };
  });
  (result as any).tiles = merged;
  return result;
}
