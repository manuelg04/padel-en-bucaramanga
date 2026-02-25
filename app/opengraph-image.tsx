import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Padel Bucaramanga – Directorio y Guías";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
          padding: "80px",
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px"
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "10px",
              background: "#f97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 900,
              fontSize: "18px",
              letterSpacing: "-1px"
            }}
          >
            PB
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "4px",
              textTransform: "uppercase"
            }}
          >
            PADEL BUCARAMANGA
          </span>
        </div>

        <div
          style={{
            color: "white",
            fontSize: "72px",
            fontWeight: 900,
            lineHeight: 1.05,
            textTransform: "uppercase",
            letterSpacing: "-2px",
            maxWidth: "900px"
          }}
        >
          Juega Padel en{" "}
          <span style={{ color: "#f97316" }}>Bucaramanga</span>
        </div>

        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "28px",
            marginTop: "28px",
            fontWeight: 400
          }}
        >
          Directorio de clubes · Guías prácticas · Área metropolitana
        </div>
      </div>
    ),
    size
  );
}
