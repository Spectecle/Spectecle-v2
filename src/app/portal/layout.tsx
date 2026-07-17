import { PortalThemeProvider } from "@/components/portal/PortalThemeProvider";
import { PortalHeader } from "@/components/portal/PortalHeader";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalThemeProvider>
      <PortalHeader />
      <main>{children}</main>
    </PortalThemeProvider>
  );
}
