'use client';
import { useLocalizedArcana } from '@/lib/matrix/arcana-i18n';
import { getInterpretation, getPositionLabel, type PositionKey } from '@/lib/matrix/interpretations';
import { useSettings } from '@/lib/settings/context';
import { useT } from '@/lib/i18n';

interface Props {
  arcanaNumber: number;
  positionKey: PositionKey;
  onClose: () => void;
}

export default function ArcanaDetailPanel({ arcanaNumber, positionKey, onClose }: Props) {
  const { language } = useSettings();
  const arcana = useLocalizedArcana();
  const t = useT();
  const info = arcana(arcanaNumber);
  const interp = getInterpretation(arcanaNumber, language);
  const posLabel = getPositionLabel(positionKey, language);

  return (
    <div className="glass-card rounded-2xl p-5 matrix-glow animate-fade-in relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-300 transition text-lg"
        aria-label={t('common.close')}
      >
        ✕
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
          <span className="text-2xl font-bold text-violet-400">{arcanaNumber}</span>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-white">{info.name}</h3>
          <p className="text-xs text-zinc-500">{posLabel} • {info.theme}</p>
        </div>
      </div>

      <div className="space-y-3">
        {interp.positive && (
          <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-3">
            <div className="text-[10px] font-medium text-emerald-400 mb-1">✦ {t('matrixChart.positive') || 'Positive Energy'}</div>
            <p className="text-sm text-zinc-300 leading-relaxed">{interp.positive}</p>
          </div>
        )}
        {interp.shadow && (
          <div className="rounded-xl bg-red-500/5 border border-red-500/10 p-3">
            <div className="text-[10px] font-medium text-red-400 mb-1">☾ {t('matrixChart.shadow') || 'Shadow Side'}</div>
            <p className="text-sm text-zinc-300 leading-relaxed">{interp.shadow}</p>
          </div>
        )}
        {interp.advice && (
          <div className="rounded-xl bg-amber-500/5 border border-amber-500/10 p-3">
            <div className="text-[10px] font-medium text-amber-400 mb-1">⟡ {t('matrixChart.advice') || 'Advice'}</div>
            <p className="text-sm text-zinc-300 leading-relaxed">{interp.advice}</p>
          </div>
        )}
      </div>
    </div>
  );
}
