'use client';
import { useState } from 'react';
import ProfileModal from './ProfileModal';

interface Props {
  icon?: string;
  title: string;
  description: string;
}

export default function EmptyState({ icon = '✦', title, description }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center justify-center py-28 text-center max-w-md mx-auto">
        {/* Cosmic orb behind icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-violet-600/20 to-pink-600/10 blur-xl -m-2" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-violet-600/15 to-transparent flex items-center justify-center border border-violet-500/10">
            <span className="text-4xl drop-shadow-[0_0_12px_rgba(124,92,252,0.4)]">{icon}</span>
          </div>
        </div>
        <h2 className="font-display text-2xl font-bold mb-3 text-white">{title}</h2>
        <p className="text-sm text-zinc-400 leading-relaxed mb-8">{description}</p>
        <button onClick={() => setModalOpen(true)} className="cosmic-btn">
          ✦ Create Birth Profile
        </button>
      </div>
      <ProfileModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
