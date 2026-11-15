'use client';
import LocaleLink from '../shared/LocaleLink';

export default function Breadcrumbs({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-zinc-500">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <LocaleLink href="/" className="hover:text-zinc-300 transition-colors">
            Home
          </LocaleLink>
        </li>
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1">
            <span aria-hidden="true" className="text-zinc-600">/</span>
            {i === items.length - 1 ? (
              <span className="text-zinc-300" aria-current="page">
                {item.label}
              </span>
            ) : (
              <LocaleLink href={item.href} className="hover:text-zinc-300 transition-colors">
                {item.label}
              </LocaleLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
