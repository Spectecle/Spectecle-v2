export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/Spectecle-mark.png" alt="Spectecle logo" className={`${className} object-contain`} />
  );
}
