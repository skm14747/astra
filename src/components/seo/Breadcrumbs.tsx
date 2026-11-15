import Link from 'next/link';

export default function Breadcrumbs({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-zinc-500">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-zinc-300 transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1">
            <span aria-hidden="true" className="text-zinc-600">/</span>
            {i === items.length - 1 ? (
              <span className="text-zinc-300" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-zinc-300 transition-colors">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
