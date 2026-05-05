import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f5f5",
          color: "#171717",
          padding: "56px 64px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 2, color: "#666" }}>
          towerdefense-cj.online
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 82, fontWeight: 700, lineHeight: 1.05 }}>
            Tower Defense CJ
          </div>
          <div style={{ fontSize: 36, color: "#404040" }}>
            Sito ufficiale e futura versione web giocabile
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#737373" }}>
          Devlog • Updates • Play Coming Soon
        </div>
      </div>
    ),
    size,
  );
}
