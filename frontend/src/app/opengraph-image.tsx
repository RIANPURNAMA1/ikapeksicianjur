import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "IKAPEKSI Cianjur — Merajut Alumni, Membangun Cianjur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "linear-gradient(135deg, #1a0a0d 0%, #3d1418 55%, #6d1d24 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "120px",
              height: "120px",
              borderRadius: "9999px",
              background: "#ffffff",
              color: "#C62930",
              fontSize: "48px",
              fontWeight: 900,
            }}
          >
            IK
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                fontSize: "64px",
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              IKAPEKSI
            </div>
            <div
              style={{
                fontSize: "32px",
                fontWeight: 600,
                color: "#f3b0b4",
              }}
            >
              DPC Cianjur
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "28px",
            fontSize: "28px",
            color: "#ffffff",
            opacity: 0.9,
          }}
        >
          Merajut Alumni, Membangun Cianjur
        </div>
      </div>
    ),
    { ...size }
  );
}
