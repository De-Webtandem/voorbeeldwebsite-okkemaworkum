/** Klein rubrieklabel met een oranje vierkantje, verwijzing naar het vierkant in het logo. */
export function Eyebrow({ children, tone = "light", className = "" }: { children: React.ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <p className={`label flex items-center gap-3 ${tone === "dark" ? "text-paper/65" : "text-muted"} ${className}`}>
      <span aria-hidden className="h-2 w-2 shrink-0 bg-orange" />
      {children}
    </p>
  );
}
