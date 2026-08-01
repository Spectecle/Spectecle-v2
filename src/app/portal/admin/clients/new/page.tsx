import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { AddClientForm } from "@/components/portal/AddClientForm";
import type { OrgRecord } from "@/lib/organizations";

export default async function AdminAddClientPage() {
  const user = await getSession();
  if (!user) redirect("/portal/sign-in?next=/portal/admin/clients/new");
  if (!isAdmin(user.email)) notFound();

  const { data: orgs } = await supabase
    .from("organizations")
    .select("id, domain, name, website_url")
    .order("name", { ascending: true });

  return (
    <section className="relative min-h-[80vh] pt-32 pb-20 px-6 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.12) 0%, transparent 70%)" }}
      />
      <div className="relative max-w-xl mx-auto">
        <Link
          href="/portal/admin?section=users"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--portal-text-muted)] hover:text-[var(--portal-text-primary)] cursor-pointer transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Admin
        </Link>
        <AddClientForm orgs={(orgs ?? []) as OrgRecord[]} />
      </div>
    </section>
  );
}
