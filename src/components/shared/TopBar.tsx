'use client';
import { useState, useRef, useEffect } from 'react';
import LocaleLink from './LocaleLink';
import { useProfile } from '@/lib/profile/context';
import ProfileModal from './ProfileModal';

export default function TopBar() {
  const { profiles, activeProfile, setActiveProfile } = useProfile();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const formatDate = (iso: string) => {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center gap-3 px-4 py-2 bg-zinc-950/80 backdrop-blur border-b border-zinc-800">
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => activeProfile ? setDropdownOpen(!dropdownOpen) : setModalOpen(true)}
            className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-full px-3 py-1 text-sm hover:border-violet-500 transition"
          >
            {activeProfile ? (
              <>
                <span className="w-2 h-2 rounded-full bg-violet-500" />
                <span className="font-medium">{activeProfile.name}</span>
                <span className="text-zinc-500 hidden sm:inline">— {formatDate(activeProfile.dateOfBirth)}, {activeProfile.city}</span>
                <svg className="w-3 h-3 text-zinc-500" viewBox="0 0 12 12" fill="none"><path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </>
            ) : (
              <span className="text-zinc-400">+ Create Profile</span>
            )}
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-1 w-64 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 overflow-hidden">
              {profiles.map(p => (
                <button
                  key={p.id}
                  onClick={() => { setActiveProfile(p.id); setDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-zinc-800 flex items-center gap-2 ${p.id === activeProfile?.id ? 'bg-violet-600/10 text-violet-300' : 'text-zinc-300'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${p.id === activeProfile?.id ? 'bg-violet-500' : 'bg-zinc-600'}`} />
                  <span className="font-medium truncate">{p.name}</span>
                  <span className="text-zinc-500 text-xs ml-auto">{formatDate(p.dateOfBirth)}</span>
                </button>
              ))}
              <div className="border-t border-zinc-800">
                <button
                  onClick={() => { setDropdownOpen(false); setModalOpen(true); }}
                  className="w-full text-left px-3 py-2 text-sm text-violet-400 hover:bg-zinc-800"
                >
                  + New Profile
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1" />

        <LocaleLink href="/settings" className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition" title="Settings">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </LocaleLink>
      </div>

      <ProfileModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
