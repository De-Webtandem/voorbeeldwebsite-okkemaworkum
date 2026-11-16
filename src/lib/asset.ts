/**
 * Submap waarin de site draait (bijv. "/voorbeeldwebsite-okkemaworkum" op
 * GitHub Pages). next/link voegt die zelf toe, maar next/image niet: gebruik
 * asset() voor elk pad naar een bestand in /public.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => (path.startsWith("/") ? `${basePath}${path}` : path);
