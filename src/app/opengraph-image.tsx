import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Spectecle SEO & Web Design: Web Design, SEO & AI Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f4f1e9",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "system-ui, -apple-system, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "28px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Location badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 24px",
              background: "rgba(198,153,71,0.12)",
              border: "1.5px solid rgba(198,153,71,0.4)",
              color: "#38190c",
              fontSize: "18px",
              fontWeight: "600",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                background: "#c69947",
              }}
            />
            Serving Clients Nationwide
          </div>

          {/* Wordmark */}
          <div
            style={{
              fontSize: "96px",
              fontWeight: "300",
              color: "#1e1e1e",
              letterSpacing: "-3px",
              lineHeight: 1,
            }}
          >
            Spectecle
          </div>

          {/* Services tagline */}
          <div
            style={{
              fontSize: "30px",
              color: "#7c776b",
              textAlign: "center",
              fontWeight: "400",
              letterSpacing: "0.5px",
            }}
          >
            Web Design · SEO · AI Automation
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "48px",
              marginTop: "8px",
              padding: "24px 48px",
              background: "#fdfbf5",
              border: "1px solid rgba(30,30,30,0.1)",
            }}
          >
            {[
              { val: "50+", lbl: "Projects Delivered" },
              { val: "$5.4M+", lbl: "Revenue Generated" },
              { val: "98%", lbl: "Client Retention" },
            ].map((s, i) => (
              <div
                key={s.lbl}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  paddingLeft: i > 0 ? "48px" : "0",
                  borderLeft: i > 0 ? "1px solid rgba(30,30,30,0.1)" : "none",
                }}
              >
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: "700",
                    color: "#c69947",
                    letterSpacing: "-1px",
                  }}
                >
                  {s.val}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#7c776b",
                    fontWeight: "500",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                  }}
                >
                  {s.lbl}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 38,
            color: "#7c776b",
            fontSize: "20px",
            fontWeight: "500",
            letterSpacing: "1px",
            zIndex: 1,
          }}
        >
          spectecle.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
