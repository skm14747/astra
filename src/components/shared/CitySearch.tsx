'use client';
import { useState, useRef, useEffect, useCallback } from 'react';

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface CityResult {
  city: string;
  latitude: number;
  longitude: number;
}

interface Props {
  onSelect: (result: CityResult) => void;
  initialValue?: string;
  className?: string;
}

export default function CitySearch({ onSelect, initialValue = '', className }: Props) {
  const [query, setQuery] = useState(initialValue);
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return; }
    setLoading(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&addressdetails=1`;
      const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
      const data: NominatimResult[] = await res.json();
      setResults(data);
      setOpen(data.length > 0);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (val: string) => {
    setQuery(val);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(val), 300);
  };

  const handleSelect = (r: NominatimResult) => {
    const parts = r.display_name.split(', ');
    const city = parts.slice(0, 2).join(', ');
    setQuery(city);
    setOpen(false);
    onSelect({ city, latitude: parseFloat(r.lat), longitude: parseFloat(r.lon) });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className ?? ''}`}>
      <input
        type="text"
        value={query}
        onChange={e => handleChange(e.target.value)}
        placeholder="Search city..."
        className="bg-zinc-800 border border-zinc-700 rounded px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-violet-500"
        autoComplete="off"
      />
      {loading && <div className="absolute right-2 top-2 text-xs text-zinc-500">...</div>}
      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-zinc-800 border border-zinc-700 rounded shadow-lg max-h-48 overflow-y-auto">
          {results.map(r => (
            <li
              key={r.place_id}
              onClick={() => handleSelect(r)}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-zinc-700 truncate"
            >
              {r.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
