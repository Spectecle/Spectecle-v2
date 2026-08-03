import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Spectecle SEO & Web Design — Web Design, SEO & AI Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090f",
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
        {/* Radial gradient orb */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: "50%",
            marginLeft: -420,
            width: 840,
            height: 640,
            background:
              "radial-gradient(ellipse, rgba(210,81,36,0.55) 0%, rgba(210,81,36,0.12) 50%, transparent 75%)",
            borderRadius: "50%",
          }}
        />

        {/* Dot grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.07) 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Bottom edge gradient */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 180,
            background: "linear-gradient(to top, #09090f, transparent)",
          }}
        />

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
              background: "rgba(210,81,36,0.12)",
              border: "1.5px solid rgba(210,81,36,0.35)",
              borderRadius: "100px",
              color: "#F07A3A",
              fontSize: "18px",
              fontWeight: "600",
              letterSpacing: "0.2px",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#F07A3A",
              }}
            />
            Serving Clients Nationwide
          </div>

          {/* Wordmark */}
          <div
            style={{
              fontSize: "96px",
              fontWeight: "800",
              color: "white",
              letterSpacing: "-5px",
              lineHeight: 1,
            }}
          >
            Spectecle
          </div>

          {/* Services tagline */}
          <div
            style={{
              fontSize: "30px",
              color: "rgba(148,163,184,0.8)",
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
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "20px",
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
                  borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: "700",
                    color: "#F07A3A",
                    letterSpacing: "-1px",
                  }}
                >
                  {s.val}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "rgba(100,116,139,1)",
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
            color: "rgba(71,85,105,1)",
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
