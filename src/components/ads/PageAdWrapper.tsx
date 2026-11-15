import AdSlot from './AdSlot';

/**
 * Wraps page content with an ad slot at the bottom.
 * Use in server-component layouts to inject ads below page content.
 */
export default function PageAdWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pb-8">
        <AdSlot format="auto" />
      </div>
    </>
  );
}
