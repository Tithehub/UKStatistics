
# UK Analytics — SaaS Starter (with Markets)

Next.js 14 (App Router) + Tailwind. Live dashboard with categories, inline editing, reset, and API stubs.

## Quickstart
```bash
npm i
npm run dev
# open http://localhost:3000
```

## Markets tiles
- BTC (USD) — `/api/markets-btc` → `{ usd }`
- Gold/oz (USD) — `/api/markets-gold` → `{ usd }`
- Silver/oz (USD) — `/api/markets-silver` → `{ usd }`
- GBP/USD — `/api/fx-gbpusd` → `{ rate }`

## Structure
- `app/page.tsx` — dashboard
- `app/api/*/route.ts` — mock APIs (swap with real providers + caching)
- `components/Tile.tsx` — card with inline edit
- `lib/config.ts` — categories, styles, default tiles
- `lib/migrate.ts` — config migration (schema v3)
- `styles/globals.css` — base styles

Built 2025-08-17T06:26:53.258847Z
