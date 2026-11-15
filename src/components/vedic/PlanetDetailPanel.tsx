'use client';
import { motion, AnimatePresence } from 'framer-motion';
import type { PlanetPosition, Planet, Dignity } from '@/lib/vedic/types';
import { PLANET_GLYPH } from '@/lib/vedic/glyphs';
import { useT } from '@/lib/i18n';

interface Props {
  planet: Planet | null;
  position: PlanetPosition | null;
  dignity: Dignity | null;
  isCombust: boolean;
  onClose: () => void;
}

export default function PlanetDetailPanel({ planet, position, dignity, isCombust: combust, onClose }: Props) {
  const t = useT();

  return (
    <AnimatePresence>
      {planet && position && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-80 bg-zinc-900 border-l border-zinc-800 z-[60] p-5 overflow-y-auto shadow-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{PLANET_GLYPH[planet]}</span>
              <h2 className="text-lg font-bold">{planet}</h2>
            </div>
            <button onClick={onClose} className="text-zinc-400 hover:text-zinc-200 text-lg">&times;</button>
          </div>

          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-zinc-800 rounded">
                <div className="text-[10px] text-zinc-500">{t('kundli.sign')}</div>
                <div className="font-medium">{position.rashiName}</div>
              </div>
              <div className="p-2 bg-zinc-800 rounded">
                <div className="text-[10px] text-zinc-500">{t('kundli.degree')}</div>
                <div className="font-medium font-mono">{position.degree}°{position.minutes}&apos;{position.seconds}&quot;</div>
              </div>
              <div className="p-2 bg-zinc-800 rounded">
                <div className="text-[10px] text-zinc-500">{t('panchang.nakshatra')}</div>
                <div className="font-medium">{position.nakshatraName}</div>
              </div>
              <div className="p-2 bg-zinc-800 rounded">
                <div className="text-[10px] text-zinc-500">{t('panchang.pada')}</div>
                <div className="font-medium">{position.pada}</div>
              </div>
              <div className="p-2 bg-zinc-800 rounded">
                <div className="text-[10px] text-zinc-500">{t('kundli.house')}</div>
                <div className="font-medium">{position.house}</div>
              </div>
              <div className="p-2 bg-zinc-800 rounded">
                <div className="text-[10px] text-zinc-500">{t('panchang.nakshatra')} {t('common.lord')}</div>
                <div className="font-medium">{position.nakshatraLord}</div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {dignity && (
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  dignity === 'exalted' ? 'bg-green-900/30 text-green-400 border border-green-800' :
                  dignity === 'debilitated' ? 'bg-red-900/30 text-red-400 border border-red-800' :
                  dignity === 'own' ? 'bg-blue-900/30 text-blue-400 border border-blue-800' :
                  'bg-zinc-800 text-zinc-400 border border-zinc-700'
                }`}>
                  {dignity === 'exalted' ? t('kundli.exalted') :
                   dignity === 'debilitated' ? t('kundli.debilitated') :
                   dignity === 'own' ? t('kundli.own') :
                   dignity.charAt(0).toUpperCase() + dignity.slice(1)}
                </span>
              )}
              {position.isRetrograde && (
                <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-900/30 text-yellow-400 border border-yellow-800">
                  {t('kundli.retrograde')}
                </span>
              )}
              {combust && (
                <span className="px-2 py-1 rounded text-xs font-medium bg-red-900/30 text-red-400 border border-red-800">
                  {t('kundli.combust')}
                </span>
              )}
            </div>

            <div className="pt-2 border-t border-zinc-800">
              <div className="text-[10px] text-zinc-500 mb-1">{t('kundli.speed')}</div>
              <div className="font-mono text-xs">{position.speed.toFixed(4)}°/day</div>
            </div>

            <div className="border-t border-zinc-800 pt-2">
              <div className="text-[10px] text-zinc-500 mb-1">{t('kundli.siderealLongitude')}</div>
              <div className="font-mono text-xs">{position.siderealLongitude.toFixed(4)}°</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
