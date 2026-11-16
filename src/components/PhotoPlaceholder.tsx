import type { AspectRatio } from "@/data/imageRequirements";

export type PlaceholderVariant = "light" | "stone" | "dark";

type Props = {
  label: string;
  description: string;
  aspectRatio: AspectRatio;
  size?: string;
  variant?: PlaceholderVariant;
  className?: string;
};

const variants: Record<PlaceholderVariant, string> = {
  light: "bg-ph text-ink/80 [--ph-line:rgb(37_37_37/0.13)]",
  stone: "bg-stone-deep text-ink/80 [--ph-line:rgb(37_37_37/0.12)]",
  dark: "bg-ph-dark text-paper/75 [--ph-line:rgb(245_245_243/0.12)]",
};

/**
 * Ontworpen grijs fotovlak voor beeld dat nog moet worden aangeleverd.
 * Houdt de exacte beeldverhouding vast, zodat echte fotografie later
 * zonder layoutverschuiving kan worden ingewisseld.
 */
export function PhotoPlaceholder({ label, description, aspectRatio, size, variant = "light", className = "" }: Props) {
  return (
    <div
      className={`@container relative isolate w-full overflow-hidden ${variants[variant]} ${className}`}
      style={{ aspectRatio: aspectRatio.replace("/", " / ") }}
      data-placeholder
    >
      {/* Constructielijnen: diagonalen en kader, als in een bouwtekening */}
      <svg aria-hidden className="absolute inset-0 -z-10 h-full w-full" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="var(--ph-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="var(--ph-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <div aria-hidden className="absolute inset-3 -z-10 @md:inset-5">
        <div className="absolute inset-0 border border-[var(--ph-line)]" />
        {["-left-px -top-px border-l border-t", "-right-px -top-px border-r border-t", "-bottom-px -left-px border-b border-l", "-bottom-px -right-px border-b border-r"].map(
          (pos) => (
            <span key={pos} className={`absolute h-4 w-4 border-current opacity-50 @md:h-6 @md:w-6 ${pos}`} />
          ),
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5 @md:gap-2.5 @md:p-8 @3xl:p-10">
        <p className="label text-[0.625rem] @md:text-[0.6875rem]">Fotografie / nog toe te voegen</p>
        <p className="text-[0.9375rem] font-medium leading-tight tracking-[-0.01em] text-current @md:text-xl @3xl:text-2xl">
          <span className="sr-only">Benodigde foto: </span>
          {label}
        </p>
        <p className="line-clamp-4 max-w-[46ch] text-[0.75rem] leading-snug @sm:line-clamp-4 @md:text-sm @3xl:line-clamp-none">
          {description}
        </p>
      </div>
      <p aria-hidden className="num absolute right-5 top-5 hidden text-[0.625rem] tracking-[0.12em] @sm:block @md:right-8 @md:top-8">
        {aspectRatio.replace("/", ":")}
        {size ? ` · ${size}` : ""}
      </p>
    </div>
  );
}
