"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, CheckCircle2 } from "lucide-react";
import { inputClass } from "@/components/portal/DynamicField";
import type { OrgGroup } from "@/lib/organizations";

type OrgMode = "existing" | "new";

export function AddClientForm({ groups }: { groups: OrgGroup[] }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orgMode, setOrgMode] = useState<OrgMode>(groups.length > 0 ? "existing" : "new");
  const [organizationId, setOrganizationId] = useState("");
  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgWebsite, setNewOrgWebsite] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (orgMode === "existing" && !organizationId) e.organizationId = "Select a business";
    if (orgMode === "new" && !newOrgName.trim()) e.newOrgName = "Enter a business name";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/portal/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || undefined,
          phone: phone || undefined,
          organizationId: orgMode === "existing" ? organizationId : undefined,
          newOrganization:
            orgMode === "new" ? { name: newOrgName, websiteUrl: newOrgWebsite } : undefined,
        }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass border border-[#c69947]/20 p-14 text-center"
        >
          <div className="w-16 h-16 mx-auto bg-[#c69947]/10 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-[#c69947]" />
          </div>
          <h2
            className="text-2xl font-bold text-[var(--portal-text-primary)] mb-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Client Added
          </h2>
          <p className="text-[var(--portal-text-secondary)] mb-6 text-sm">
            {email} has been added. No email was sent — use{" "}
            <span className="text-[var(--portal-text-primary)]">Send Client Email</span> when
            you&apos;re ready to onboard them.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => router.push("/portal/admin?section=users")}
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold cursor-pointer"
            >
              Back to Admin
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="glass border border-[var(--portal-border)] p-8 md:p-10 space-y-5"
          noValidate
        >
          <div>
            <h1
              className="text-2xl font-bold text-[var(--portal-text-primary)] mb-1"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Add Client
            </h1>
            <p className="text-[var(--portal-text-muted)] text-sm">
              Invites a client to the portal and gives them their own business space.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
              Email <span className="text-rose-400">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              placeholder="client@company.com"
              className={inputClass(!!errors.email)}
            />
            {errors.email && <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
                Contact Name{" "}
                <span className="text-[var(--portal-text-faint)] normal-case tracking-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                className={inputClass(false)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
                Phone{" "}
                <span className="text-[var(--portal-text-faint)] normal-case tracking-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(313) 555-0100"
                className={inputClass(false)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
              Business <span className="text-rose-400">*</span>
            </label>
            {groups.length > 0 && (
              <div className="flex gap-2 mb-3">
                {(["existing", "new"] as OrgMode[]).map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setOrgMode(m)}
                    className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors cursor-pointer ${
                      orgMode === m
                        ? "bg-[#c69947]/15 border-[#c69947]/40 text-[#c69947]"
                        : "bg-[var(--portal-card)] border-[var(--portal-border)] text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)]"
                    }`}
                  >
                    {m === "existing" ? "Existing Business" : "New Business"}
                  </button>
                ))}
              </div>
            )}

            {orgMode === "existing" && groups.length > 0 ? (
              <div>
                <select
                  value={organizationId}
                  onChange={(e) => {
                    setOrganizationId(e.target.value);
                    if (errors.organizationId) setErrors((prev) => ({ ...prev, organizationId: "" }));
                  }}
                  className={`${inputClass(!!errors.organizationId)} cursor-pointer`}
                >
                  <option value="" disabled>Select a business</option>
                  {groups.map((g) => (
                    <option key={g.key} value={g.key}>
                      {g.name}
                      {g.websiteUrl ? ` — ${g.websiteUrl}` : g.domain ? ` — ${g.domain}` : ""}
                    </option>
                  ))}
                </select>
                {errors.organizationId && (
                  <p className="mt-1.5 text-xs text-rose-400">{errors.organizationId}</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={newOrgName}
                    onChange={(e) => {
                      setNewOrgName(e.target.value);
                      if (errors.newOrgName) setErrors((prev) => ({ ...prev, newOrgName: "" }));
                    }}
                    placeholder="Business name — e.g. Dearborn Cleaners"
                    className={inputClass(!!errors.newOrgName)}
                  />
                  {errors.newOrgName && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.newOrgName}</p>
                  )}
                </div>
                <input
                  type="text"
                  value={newOrgWebsite}
                  onChange={(e) => setNewOrgWebsite(e.target.value)}
                  placeholder="Website (optional) — e.g. dearborncleaners.com"
                  className={inputClass(false)}
                />
              </div>
            )}
            <p className="mt-2 text-[11px] text-[var(--portal-text-faint)]">
              Every client gets their own business space, even if they share an email provider
              (e.g. gmail.com) with another client.
            </p>
          </div>

          {status === "error" && (
            <p className="text-rose-400 text-sm text-center py-2">
              Something went wrong — please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-primary w-full flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">
              {status === "submitting" ? "Adding..." : "Add Client"}
            </span>
            <UserPlus className="w-4 h-4 relative z-10" />
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
