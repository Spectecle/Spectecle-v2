/* Drop your logo PNG at public/logo.png — this component renders it exactly as-is */
export function LogoMark({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Spectecle logo"
      className={className}
      style={{ objectFit: "contain", objectPosition: "top" }}
    />
  );
}
