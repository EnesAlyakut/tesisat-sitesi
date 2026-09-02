import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Varsayilan Open Graph / Twitter gorseli.
 * Build sirasinda PNG olarak uretilir; sayfalar kendi gorselini
 * vermedigi surece bu gorsel kullanilir.
 */

export const runtime = "nodejs";
export const dynamic = "force-static";
export const alt = `${site.name} — İstanbul 7/24 Su Tesisatçısı`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #060b14 0%, #0e1929 55%, #132135 100%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* Blueprint cizgileri */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, rgba(74,168,239,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(74,168,239,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 99,
              background: "#d99a68",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 8,
              color: "#d99a68",
              fontWeight: 700,
              display: "flex",
            }}
          >
            MARSAK TEKNİK TESİSAT
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 74,
              lineHeight: 1.08,
              color: "#f7f9fc",
              fontWeight: 700,
              letterSpacing: -2,
              display: "flex",
              maxWidth: 940,
            }}
          >
            İstanbul 7/24 Su Tesisatçısı
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.4,
              color: "rgba(247,249,252,0.62)",
              display: "flex",
              maxWidth: 880,
            }}
          >
            Su kaçağı tespiti · Kırmadan tespit · Tıkanıklık açma · Kameralı gider
            görüntüleme
          </div>
        </div>

        {/* Boru serit */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", height: 8, width: 280, background: "#c47f4a", borderRadius: 99 }} />
          <div style={{ display: "flex", height: 8, width: 120, background: "#2b8ede", borderRadius: 99 }} />
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "rgba(247,249,252,0.45)",
              marginLeft: "auto",
            }}
          >
            {site.hours.label}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
