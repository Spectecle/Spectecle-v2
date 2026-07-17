"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

const STANDALONE_ROUTES = ["/hello"];

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Portal routes have their own layout (header, theme, <main>) — render bare,
  // no marketing Navbar/Footer and no extra wrapping <main> (would nest invalidly).
  if (pathname.startsWith("/portal")) {
    return <>{children}</>;
  }

  const standalone = STANDALONE_ROUTES.includes(pathname);

  if (standalone) return <main className="flex-1">{children}</main>;

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
