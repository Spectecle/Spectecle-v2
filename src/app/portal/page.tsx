import { redirect } from "next/navigation";
import { getSession, isAdmin } from "@/lib/auth";

export default async function PortalIndexPage() {
  const user = await getSession();
  if (!user) redirect("/portal/sign-in");
  redirect(isAdmin(user.email) ? "/portal/admin" : "/portal/dashboard");
}
