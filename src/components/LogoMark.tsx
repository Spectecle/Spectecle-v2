import Image from "next/image";

/* Drop your logo PNG at public/logo.png — this component renders it exactly as-is */
export function LogoMark({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Spectecle logo"
      width={28}
      height={32}
      priority
      className={className}
      style={{ objectFit: "contain", objectPosition: "top" }}
    />
  );
}
