'use client';
import Link, { type LinkProps } from 'next/link';
import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { useLocalePath } from '@/hooks/useLocalePath';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps & { children?: React.ReactNode };

/**
 * Drop-in replacement for next/link that automatically prepends the
 * current locale prefix. Use exactly like <Link>.
 */
const LocaleLink = forwardRef<HTMLAnchorElement, Props>(function LocaleLink(
  { href, ...rest },
  ref,
) {
  const lp = useLocalePath();
  const localeHref =
    typeof href === 'string'
      ? lp(href)
      : { ...href, pathname: href.pathname ? lp(href.pathname) : href.pathname };
  return <Link ref={ref} href={localeHref} {...rest} />;
});

export default LocaleLink;
