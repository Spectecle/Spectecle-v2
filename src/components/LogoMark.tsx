import Image from "next/image";

// Displayed at 64px at most (navbar), so 64x64 gives a 1x/2x srcset instead of the 510px original.
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <Image
      src="/Spectecle-mark.png"
      alt="Spectecle logo"
      width={64}
      height={64}
      loading="eager"
      className={`${className} object-contain`}
    />
  );
}
