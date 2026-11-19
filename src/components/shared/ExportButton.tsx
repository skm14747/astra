'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { useT } from '@/lib/i18n';

interface Props {
  targetRef: React.RefObject<HTMLElement | null>;
  filename?: string;
}

export default function ExportButton({ targetRef, filename = 'chart' }: Props) {
  const t = useT();
  const [downloadFeedback, setDownloadFeedback] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const dlTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const cpTimer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (dlTimer.current) clearTimeout(dlTimer.current);
      if (cpTimer.current) clearTimeout(cpTimer.current);
    };
  }, []);

  const handleDownload = useCallback(async () => {
    if (!targetRef.current) return;
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(targetRef.current, { backgroundColor: '#0c0e1a' });
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = dataUrl;
      link.click();
      setDownloadFeedback(true);
      if (dlTimer.current) clearTimeout(dlTimer.current);
      dlTimer.current = setTimeout(() => setDownloadFeedback(false), 2000);
    } catch (err) {
      console.error('Export failed:', err);
    }
  }, [targetRef, filename]);

  const handleCopy = useCallback(async () => {
    if (!targetRef.current) return;
    try {
      const el = targetRef.current;
      const item = new ClipboardItem({
        'image/png': import('html-to-image')
          .then(({ toPng }) => toPng(el, { backgroundColor: '#0c0e1a' }))
          .then(dataUrl => fetch(dataUrl))
          .then(res => res.blob()),
      });
      await navigator.clipboard.write([item]);
      setCopyFeedback(true);
      if (cpTimer.current) clearTimeout(cpTimer.current);
      cpTimer.current = setTimeout(() => setCopyFeedback(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
      try {
        const { toPng } = await import('html-to-image');
        const dataUrl = await toPng(targetRef.current!, { backgroundColor: '#0c0e1a' });
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopyFeedback(true);
        if (cpTimer.current) clearTimeout(cpTimer.current);
        cpTimer.current = setTimeout(() => setCopyFeedback(false), 2000);
      } catch {
        /* silent fallback failure */
      }
    }
  }, [targetRef]);

  return (
    <>
      <button onClick={handleDownload} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition shadow-md cursor-pointer" title={t('export.downloadPng')}>
        {downloadFeedback ? '✅' : '📥'} {downloadFeedback ? 'Saved!' : t('export.downloadPng')}
      </button>
      <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-sm font-medium transition cursor-pointer" title={t('export.copyClipboard')}>
        {copyFeedback ? '✅' : '📋'} {copyFeedback ? 'Copied!' : t('export.copyClipboard')}
      </button>
    </>
  );
}
