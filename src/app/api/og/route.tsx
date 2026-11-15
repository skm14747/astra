import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

const TOOL_ICONS: Record<string, string> = {
  kundli: '☉',
  divisional: '◎',
  yogas: '♃',
  remedies: '💎',
  dashas: '⏳',
  transits: '♄',
  nakshatra: '☽',
  kp: '⊕',
  panchang: '📅',
  muhurta: '🕐',
  ashtakavarga: '⬡',
  compatibility: '♥',
  shadbala: '⚖',
  jaimini: '♈',
  career: '💼',
  wealth: '₹',
  health: '❤',
  predictions: '🔮',
  nadi: '🌀',
  report: '📋',
  'mangal-dosha': '♂',
  'kaal-sarp-dosha': '🐍',
  navamsa: '◎',
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Astra — Vedic Astrology';
  const tool = searchParams.get('tool') || '';
  const icon = TOOL_ICONS[tool] || '✦';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0f0a1a 0%, #1a0e2e 40%, #0d1117 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle gradient orb */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Icon */}
        <div
          style={{
            fontSize: '72px',
            marginBottom: '24px',
            display: 'flex',
          }}
        >
          {icon}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '48px',
            fontWeight: 700,
            color: '#ffffff',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.2,
            display: 'flex',
          }}
        >
          {title}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '24px',
            color: '#a1a1aa',
            marginTop: '16px',
            display: 'flex',
          }}
        >
          Free • NASA-Precision • Private
        </div>

        {/* Brand */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#8b5cf6',
              letterSpacing: '2px',
              display: 'flex',
            }}
          >
            ASTRA DESTINY
          </div>
          <div
            style={{
              fontSize: '18px',
              color: '#71717a',
              display: 'flex',
            }}
          >
            astradestiny.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
