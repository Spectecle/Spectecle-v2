import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#1e1e1e",
          borderRadius: 40,
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top-right — small */}
        <div style={{
          position: "absolute", top: 12, right: 12,
          width: 50, height: 50,
          background: "#c69947",
        }} />
        {/* Upper-center — medium */}
        <div style={{
          position: "absolute", top: 38, left: 62,
          width: 63, height: 63,
          background: "#c69947",
        }} />
        {/* Left — large */}
        <div style={{
          position: "absolute", top: 62, left: 6,
          width: 84, height: 84,
          background: "#c69947",
        }} />
        {/* Bottom-right — medium */}
        <div style={{
          position: "absolute", bottom: 12, right: 12,
          width: 56, height: 56,
          background: "#c69947",
        }} />
      </div>
    ),
    { ...size }
  );
}
