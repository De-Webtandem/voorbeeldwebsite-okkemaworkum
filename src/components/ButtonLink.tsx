import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./Icons";

type Variant = "orange" | "ink" | "outline" | "outline-light";

const styles: Record<Variant, string> = {
  orange: "bg-orange text-ink hover:bg-orange-deep",
  ink: "bg-ink text-paper hover:bg-ink-soft",
  outline: "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  "outline-light": "border border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
};

export function ButtonLink({ href, children, variant = "ink", className = "", arrow = true }: Props) {
  const external = /^(tel:|mailto:|https?:)/.test(href);
  const classes = `group inline-flex min-h-12 items-center justify-between gap-6 rounded-[2px] px-6 py-3 text-[0.9375rem] font-semibold tracking-[0.01em] transition-colors duration-300 ${styles[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out-quart group-hover:translate-x-1" />}
    </>
  );
  if (external) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={classes} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
        {newTab && <span className="sr-only"> (opent in een nieuw venster)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
