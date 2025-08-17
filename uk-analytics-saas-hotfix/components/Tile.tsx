
'use client';
import React, { useMemo } from 'react';
import { CATEGORY_STYLES } from '@/lib/config';
import { usePolling } from './usePolling';

export interface TileProps {
  tile: any;
  edit: boolean;
  onUpdate: (t: any) => void;
  pollMs: number;
}

function fmtValue(kind: string, value: any) {
  if (value == null) return '—';
  switch (kind) {
    case 'number': return Number(value).toLocaleString();
    case 'integer': return Math.round(Number(value)).toLocaleString();
    case 'percent1': return `${Number(value).toFixed(1)}%`;
    case 'millions2': return `${Number(value).toFixed(2)}m`;
    case 'debt': {
      const v = value || {};
      const left = v.bn != null ? `£${Math.round(v.bn).toLocaleString()}bn` : '—';
      const right = v.pct != null ? ` (${Number(v.pct).toFixed(1)}% GDP)` : '';
      return left + right;
    }
    case 'list': return Array.isArray(value) ? value.join(', ') : String(value);
    case 'string': default: return String(value);
  }
}

export function Tile({ tile, edit, onUpdate, pollMs }: TileProps) {
  const { data, error, loading } = usePolling(tile.endpoint, pollMs);

  const derived = useMemo(() => {
    let val: any;
    if (data) {
      if (!tile.path) {
        if (tile.fmt === 'debt') val = { bn: (data as any).psnd_gbp_bn ?? null, pct: (data as any).psnd_gdp_pct ?? null };
      } else {
        val = tile.path.split('.').reduce((acc: any, key: string) => (acc ? acc[key] : undefined), data);
      }
    }
    if (val == null) val = tile.fallback;
    return val;
  }, [data, tile.path, tile.fmt, tile.fallback]);

  const accent = CATEGORY_STYLES[tile.category]?.tile || 'border-white/10 hover:bg-white/10';

  return (
    <div className={`card ${accent}`}>
      <div className="flex">
        {edit ? (
          <input
            className="bg-transparent border border-white/10 rounded-lg px-2 py-1 w-full"
            value={tile.title}
            onChange={(e) => onUpdate({ ...tile, title: e.target.value })}
          />
        ) : (
          <h3>{tile.title}</h3>
        )}
        <span className="small">{loading ? 'Loading…' : error ? 'Error' : ''}</span>
      </div>

      <div className="value">{fmtValue(tile.fmt, derived)}</div>

      <div className="small mt-2">
        {edit ? (
          <div className="flex gap-2 items-center">
            <span className="opacity-80">Endpoint</span>
            <input
              className="bg-transparent border border-white/10 rounded-lg px-2 py-1 w-full"
              value={tile.endpoint}
              onChange={(e) => onUpdate({ ...tile, endpoint: e.target.value })}
            />
            <span className="opacity-80">Path</span>
            <input
              className="bg-transparent border border-white/10 rounded-lg px-2 py-1 w-40"
              value={tile.path ?? ''}
              onChange={(e) => onUpdate({ ...tile, path: e.target.value })}
            />
          </div>
        ) : (
          tile.source && (
            <a className="text-white/70 underline" href={tile.source.href} target="_blank" rel="noreferrer">
              {tile.source.label}
            </a>
          )
        )}
      </div>
    </div>
  );
}
