'use client';
import { useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';

interface Props {
  targetRef: React.RefObject<HTMLElement | null>;
  filename?: string;
}

export default function ExportButton({ targetRef, filename = 'chart' }: Props) {
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
    <div className="flex gap-1">
      <button onClick={handleDownload} className="text-[10px] px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition" title="Download PNG">
        PNG
      </button>
      <button onClick={handleCopy} className="text-[10px] px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition" title="Copy to clipboard">
        Copy
      </button>
    </div>
  );
}
