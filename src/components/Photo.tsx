import Image from "next/image";
import { getImage } from "@/data/imageRequirements";
import { PhotoPlaceholder, type PlaceholderVariant } from "./PhotoPlaceholder";

type Props = {
  /** Id uit src/data/imageRequirements.ts */
  id: string;
  variant?: PlaceholderVariant;
  className?: string;
  /** `sizes`-attribuut voor next/image zodra er een echte foto is. */
  sizes?: string;
  /** Alleen voor beeld boven de vouw (LCP). */
  priority?: boolean;
  /** Afwijkende verhouding (uitsnede), bijv. voor een uniform raster. */
  aspectRatio?: string;
};

/**
 * Toont de echte foto zodra `src` in imageRequirements is ingevuld, en tot die
 * tijd een beschrijvend placeholdervlak in exact dezelfde verhouding.
 */
export function Photo({ id, variant, className = "", sizes = "100vw", priority, aspectRatio }: Props) {
  const image = getImage(id);

  if (image.src) {
    const contain = image.fit === "contain";
    return (
      <div
        className={`relative w-full overflow-hidden ${contain ? "bg-white" : "bg-ph"} ${className}`}
        style={{ aspectRatio: (aspectRatio ?? image.aspectRatio).replace("/", " / ") }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={contain ? "object-contain p-[4%]" : "object-cover"}
          style={image.position && !contain ? { objectPosition: image.position } : undefined}
        />
        {image.kind && (
          <span className="label absolute bottom-3 left-3 bg-paper/90 px-2.5 py-1.5 text-[0.625rem] text-ink md:bottom-4 md:left-4">
            {image.kind === "impressie" ? "Impressie" : "Tekening"}
          </span>
        )}
      </div>
    );
  }

  return (
    <PhotoPlaceholder
      label={image.label}
      description={image.description}
      aspectRatio={image.aspectRatio}
      size={image.size}
      variant={variant}
      className={className}
    />
  );
}
