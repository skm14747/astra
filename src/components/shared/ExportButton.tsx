'use client';
import { useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { useT } from '@/lib/i18n';

interface Props {
  targetRef: React.RefObject<HTMLElement | null>;
  filename?: string;
}

export default function ExportButton({ targetRef, filename = 'chart' }: Props) {
  const t = useT();
  const handleDownload = useCallback(async () => {
    if (!targetRef.current) return;
    try {
      const dataUrl = await toPng(targetRef.current, { backgroundColor: '#0c0e1a' });
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    }
  }, [targetRef, filename]);

  const handleCopy = useCallback(async () => {
    if (!targetRef.current) return;
    try {
      const dataUrl = await toPng(targetRef.current, { backgroundColor: '#0c0e1a' });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }, [targetRef]);

  return (
    <div className="flex gap-2 mt-3">
      <button onClick={handleDownload} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition shadow-md" title={t('export.downloadPng')}>
        📥 {t('export.downloadPng')}
      </button>
      <button onClick={handleCopy} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-sm font-medium transition" title={t('export.copyClipboard')}>
        📋 {t('export.copyClipboard')}
      </button>
    </div>
  );
}
