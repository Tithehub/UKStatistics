
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { CATEGORIES, CATEGORY_STYLES, defaultConfig, PersistedConfig } from '@/lib/config';
import { migrateConfig } from '@/lib/migrate';
import { Tile } from '@/components/Tile';

export default function HomePage() {
  const [config, setConfig] = useState<PersistedConfig>(() => {
    try {
      const savedRaw = localStorage.getItem('ukrt_config');
      const saved = savedRaw ? JSON.parse(savedRaw) : null;
      return migrateConfig(saved);
    } catch {
      return defaultConfig;
    }
  });
  const [edit, setEdit] = useState(false);

  const pollMs = Math.max(5, Number(config.refreshSeconds || 60)) * 1000;

  useEffect(() => {
        // ?reset=1 support
        try {
          const p = new URLSearchParams(window.location.search);
          if (p.get('reset') === '1') {
            localStorage.removeItem('ukrt_config');
            p.delete('reset');
            const url = window.location.pathname + (p.toString() ? '?' + p.toString() : '');
            window.history.replaceState({}, '', url);
            location.reload();
          }
        } catch {}

    localStorage.setItem('ukrt_config', JSON.stringify(config));
  }, [config]);

  function updateTile(t: any) {
    setConfig((c) => ({ ...c, tiles: c.tiles.map((x) => (x.id === t.id ? t : x)) }));
  }

  const categoriesInUse = useMemo(() => {
    const s = new Set(config.tiles.map((t) => t.category).filter(Boolean));
    return CATEGORIES.filter((c) => s.has(c));
  }, [config.tiles]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-200 via-yellow-500 to-amber-700" />
            <div className="font-extrabold">UK Real‑Time Analytics</div>
            <div className="text-xs text-white/60">SaaS • editable</div>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-white/70">Refresh (s)</label>
            <input
              type="number"
              min={5}
              className="w-20 bg-transparent border border-white/20 rounded-lg px-2 py-1"
              value={config.refreshSeconds}
              onChange={(e) => setConfig((c) => ({ ...c, refreshSeconds: Number(e.target.value || 60) }))}
            />
            <button className="px-3 py-1 rounded-xl bg-white text-black font-bold" onClick={() => setEdit((v) => !v)}>
              {edit ? 'Done' : 'Edit'}
            </button>
            <button
              className="px-3 py-1 rounded-xl border border-white/30 text-white/80"
              onClick={() => { localStorage.removeItem('ukrt_config'); location.reload(); }}
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      <main className="container p-4 space-y-6">
        <div className="flex flex-wrap gap-2">
          {categoriesInUse.map((c) => (
            <span key={c} className={`px-3 py-1 rounded-full border ${CATEGORY_STYLES[c].chip}`}>
              {c}
            </span>
          ))}
        </div>

        {categoriesInUse.map((cat) => (
          <section key={cat} className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${CATEGORY_STYLES[cat].chip.replace('text-','bg-').replace('/15','/60')}`} />
              <h2 className="text-sm uppercase tracking-wide text-white/70">{cat}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {config.tiles.filter((t) => t.category === cat).map((tile) => (
                <Tile key={tile.id} tile={tile as any} edit={edit} onUpdate={updateTile} pollMs={pollMs} />
              ))}
            </div>
          </section>
        ))}

        <footer className="text-xs text-white/60 border-t border-white/10 pt-4">
          <div>© {new Date().getFullYear()} UK Real‑Time Analytics • Build {new Date().toISOString()}</div>
        </footer>
      </main>
    </div>
  );
}
