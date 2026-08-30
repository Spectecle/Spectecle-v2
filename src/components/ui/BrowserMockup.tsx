import Image from "next/image";

export function BrowserMockup({
  screenshotUrl,
  alt,
  size = "default",
  priority = false,
}: {
  url: string;
  screenshotUrl: string;
  alt: string;
  size?: "default" | "compact";
  priority?: boolean;
}) {
  const compact = size === "compact";

  return (
    <div className="relative w-full aspect-[1600/557] overflow-hidden">
      <Image
        src={screenshotUrl}
        alt={alt}
        fill
        className="object-cover object-top"
        sizes={compact ? "(max-width: 768px) 100vw, 400px" : "(max-width: 1024px) 100vw, 1024px"}
        priority={priority}
      />
    </div>
  );
}
