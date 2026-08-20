import { notFound, redirect } from "next/navigation";
import { getSession, isAdmin } from "@/lib/auth";
import { AdminDashboardShell } from "@/components/portal/AdminDashboardShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession();
  if (!user) redirect("/portal/sign-in?next=/portal/admin");
  if (!isAdmin(user.email)) notFound();

  return <AdminDashboardShell email={user.email}>{children}</AdminDashboardShell>;
}
