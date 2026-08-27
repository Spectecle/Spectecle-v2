export function getEmailDomain(email: string): string {
  return email.split("@")[1]?.toLowerCase() ?? email;
}

/** Best-effort default display name for a domain that hasn't been renamed yet. */
export function prettifyDomain(domain: string): string {
  const base = domain.replace(/\.(com|net|org|io|co|us|biz)$/i, "");
  return base
    .replace(/[-_.]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export type OrgUser = {
  id: string;
  email: string;
  status: string;
  organization_id?: string | null;
  name?: string | null;
  phone?: string | null;
};

export type OrgRecord = {
  id: string;
  domain: string | null;
  name: string;
  website_url: string | null;
  dashboard_tier?: string | null;
  ga4_property_id?: string | null;
  stripe_customer_id?: string | null;
};

/** A group of users sharing an organization. `key` is the stable identifier
 * to use in URLs/selects — a real organization `id` once assigned, or a
 * synthetic `domain:<domain>` key for users not yet assigned to one. */
export type OrgGroup = {
  key: string;
  id: string | null;
  domain: string | null;
  name: string;
  websiteUrl: string | null;
  dashboardTier: string | null;
  users: OrgUser[];
  ticketCount: number;
};

/** The stable group key + display name for a user — a real organization
 * `id` once assigned, or a synthetic `domain:<domain>` key for a legacy,
 * not-yet-assigned user. Shared by `groupByOrganization` and any per-record
 * (e.g. per-request) filtering that needs to match the same grouping. */
export function organizationKeyFor(
  user: { email: string; organization_id?: string | null },
  orgNames: Record<string, string>,
  orgsById: Record<string, OrgRecord> = {}
): { key: string; org: OrgRecord | null } {
  if (user.organization_id && orgsById[user.organization_id]) {
    const org = orgsById[user.organization_id];
    return { key: org.id, org };
  }
  const domain = getEmailDomain(user.email);
  return {
    key: `domain:${domain}`,
    org: null,
  };
}

export function groupByOrganization(
  users: OrgUser[],
  orgNames: Record<string, string>,
  ticketCountByUserId: Record<string, number>,
  orgsById: Record<string, OrgRecord> = {}
): OrgGroup[] {
  const groups = new Map<string, OrgGroup>();

  for (const user of users) {
    const { key, org } = organizationKeyFor(user, orgNames, orgsById);
    let group = groups.get(key);
    if (!group) {
      const domain = getEmailDomain(user.email);
      group = org
        ? {
            key,
            id: org.id,
            domain: org.domain,
            name: org.name,
            websiteUrl: org.website_url,
            dashboardTier: org.dashboard_tier ?? null,
            users: [],
            ticketCount: 0,
          }
        : {
            key,
            id: null,
            domain,
            name: orgNames[domain] ?? prettifyDomain(domain),
            websiteUrl: null,
            dashboardTier: null,
            users: [],
            ticketCount: 0,
          };
      groups.set(key, group);
    }

    group.users.push(user);
    group.ticketCount += ticketCountByUserId[user.id] ?? 0;
  }

  return Array.from(groups.values()).sort((a, b) => a.name.localeCompare(b.name));
}
