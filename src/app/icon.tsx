import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#040408",
          borderRadius: 7,
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top-right — small */}
        <div style={{
          position: "absolute", top: 2, right: 2,
          width: 9, height: 9, borderRadius: 2,
          background: "linear-gradient(135deg, #F07A3A 0%, #B83A10 100%)",
        }} />
        {/* Upper-center — medium */}
        <div style={{
          position: "absolute", top: 7, left: 11,
          width: 11, height: 11, borderRadius: 2.5,
          background: "linear-gradient(135deg, #F07A3A 0%, #B83A10 100%)",
        }} />
        {/* Left — large */}
        <div style={{
          position: "absolute", top: 11, left: 1,
          width: 15, height: 15, borderRadius: 3.5,
          background: "linear-gradient(135deg, #F07A3A 0%, #B83A10 100%)",
        }} />
        {/* Bottom-right — medium */}
        <div style={{
          position: "absolute", bottom: 2, right: 2,
          width: 10, height: 10, borderRadius: 2,
          background: "linear-gradient(135deg, #F07A3A 0%, #B83A10 100%)",
        }} />
      </div>
    ),
    { ...size }
  );
}
