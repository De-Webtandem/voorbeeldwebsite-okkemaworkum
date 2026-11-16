type IconProps = { className?: string };

export function ArrowRight({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M3 10h13M11 4.5 16.5 10 11 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowUpRight({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M5.5 14.5 14.5 5.5M7 5.5h7.5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M4.5 3h3l1.5 4-2 1.25a9 9 0 0 0 4.75 4.75L13 11l4 1.5v3A1.5 1.5 0 0 1 15.5 17 12.5 12.5 0 0 1 3 4.5 1.5 1.5 0 0 1 4.5 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function MailIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="2.75" y="4.75" width="14.5" height="10.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="m3 5.5 7 5.5 7-5.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/**
 * Beeldmerk uit het logo: oranje vierkant met dunne constructielijnen.
 * Gebruikt als klein grafisch accent bij rubrieklabels (decoratief).
 */
export function BrandMark({ className = "h-3.5 w-3.5", lines = "currentColor" }: IconProps & { lines?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className={`shrink-0 ${className}`}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3 3h14v14H3V3Zm4 4v6h6V7H7Z" fill="var(--color-orange)" />
      <path d="M10 0v20M0 10h20" stroke={lines} strokeOpacity="0.45" strokeWidth="0.8" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M11.2 18v-7h2.3l.4-2.8h-2.7V6.5c0-.8.2-1.3 1.4-1.3H14V2.7c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v2.1H6.3V11h2.3v7h2.6Z" />
    </svg>
  );
}
