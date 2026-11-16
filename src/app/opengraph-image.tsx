import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Okkema Workum: betonwerken, betonvloeren en bouwmaatvoering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(join(process.cwd(), "public/images/okkema-logo-white.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

/** Gedeelde Open Graph-afbeelding (ook gebruikt als X/Twitter-kaart). */
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#252525",
          color: "#f5f5f3",
          padding: "72px 80px",
        }}
      >
        <img src={logoSrc} width={460} height={115} alt="" />
        <div style={{ display: "flex", flexDirection: "column", fontWeight: 700 }}>
          <div style={{ fontSize: 84, lineHeight: 1, letterSpacing: -1, textTransform: "uppercase" }}>Vakwerk in beton.</div>
          <div style={{ fontSize: 84, lineHeight: 1, letterSpacing: -1, textTransform: "uppercase", color: "#f39200" }}>
            Op de millimeter.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 26, color: "#cfcfcb" }}>
          <div style={{ width: 16, height: 16, background: "#f39200" }} />
          Betonwerken · Betonvloeren · Bouwmaatvoering · Workum
        </div>
      </div>
    ),
    size,
  );
}
