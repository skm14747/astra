'use client';
import { useState } from 'react';

interface Props {
  onSubmit: (data: { date: Date; latitude: number; longitude: number; name?: string }) => void;
  showTime?: boolean;
  showLocation?: boolean;
  label?: string;
}

export default function DateTimePicker({ onSubmit, showTime = true, showLocation = true, label = 'Generate Chart' }: Props) {
  const [dateStr, setDateStr] = useState('1990-01-15');
  const [timeStr, setTimeStr] = useState('06:00');
  const [lat, setLat] = useState('28.6139');
  const [lng, setLng] = useState('77.2090');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [y, m, d] = dateStr.split('-').map(Number);
    const [hr, min] = timeStr.split(':').map(Number);
    const date = new Date(y, m - 1, d, hr || 0, min || 0);
    onSubmit({
      date,
      latitude: parseFloat(lat) || 28.6139,
      longitude: parseFloat(lng) || 77.209,
      name: name || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end p-4 bg-zinc-900 rounded-lg border border-zinc-800">
      <div>
        <label className="block text-xs text-zinc-400 mb-1">Name (optional)</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-sm w-32" />
      </div>
      <div>
        <label className="block text-xs text-zinc-400 mb-1">Date of Birth</label>
        <input type="date" value={dateStr} onChange={e => setDateStr(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-sm" />
      </div>
      {showTime && (
        <div>
          <label className="block text-xs text-zinc-400 mb-1">Time of Birth</label>
          <input type="time" value={timeStr} onChange={e => setTimeStr(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-sm" />
        </div>
      )}
      {showLocation && (
        <>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Latitude</label>
            <input type="number" step="any" value={lat} onChange={e => setLat(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-sm w-24" />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Longitude</label>
            <input type="number" step="any" value={lng} onChange={e => setLng(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-sm w-24" />
          </div>
        </>
      )}
      <button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-1.5 rounded text-sm font-medium">
        {label}
      </button>
    </form>
  );
}
