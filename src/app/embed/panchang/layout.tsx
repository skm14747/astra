export const metadata = {
  title: 'Today\'s Panchang Widget | Astra Destiny',
  robots: {
    index: false,
    follow: true,
  },
};

export default function EmbedPanchangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-3 sm:p-4 font-sans antialiased selection:bg-violet-500/30">
      {children}
    </div>
  );
}
