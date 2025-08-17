
'use client';
import { useEffect, useState } from 'react';

export function usePolling(url: string, intervalMs: number) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let timer: any;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const json = await res.json();
        if (mounted) setData(json);
        setError(null);
      } catch (e) {
        if (mounted) setError(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    if (intervalMs > 0) timer = setInterval(load, intervalMs);
    return () => { mounted = false; if (timer) clearInterval(timer); };
  }, [url, intervalMs]);

  return { data, error, loading };
}
