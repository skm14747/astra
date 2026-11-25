"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "astra.analytics-consent";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setVisible(stored !== "granted" && stored !== "denied");
  }, []);

  if (!visible) return null;

  function choose(value: "granted" | "denied") {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[200] border-t border-zinc-800 bg-astra-bg/95 backdrop-blur-sm px-4 py-3 shadow-lg">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-xs leading-relaxed text-zinc-400">
          We use cookies and analytics to improve your experience. All Vedic
          calculations run in your browser — no personal birth data is collected
          or stored on our servers.
        </p>
        <div className="flex flex-shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-violet-500"
          >
            Allow
          </button>
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-400 transition-colors hover:border-violet-500 hover:text-zinc-300"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
