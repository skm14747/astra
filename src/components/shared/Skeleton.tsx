interface Props {
  className?: string;
  lines?: number;
  chart?: boolean;
}

const SKELETON_WIDTHS = ['92%', '84%', '76%', '88%', '70%'];

export default function Skeleton({ className, lines = 3, chart }: Props) {
  if (chart) {
    return (
      <div className={`animate-pulse-subtle ${className ?? ''}`}>
        <div className="w-80 h-80 bg-zinc-800/50 rounded-lg" />
      </div>
    );
  }
  return (
    <div className={`space-y-3 ${className ?? ''}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 bg-zinc-800/50 rounded animate-pulse-subtle" style={{ width: SKELETON_WIDTHS[i % SKELETON_WIDTHS.length] }} />
      ))}
    </div>
  );
}
