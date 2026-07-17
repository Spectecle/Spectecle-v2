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
};

export type OrgGroup = {
  domain: string;
  name: string;
  users: OrgUser[];
  ticketCount: number;
};

export function groupByOrganization(
  users: OrgUser[],
  orgNames: Record<string, string>,
  ticketCountByUserId: Record<string, number>
): OrgGroup[] {
  const groups = new Map<string, OrgGroup>();

  for (const user of users) {
    const domain = getEmailDomain(user.email);
    if (!groups.has(domain)) {
      groups.set(domain, {
        domain,
        name: orgNames[domain] ?? prettifyDomain(domain),
        users: [],
        ticketCount: 0,
      });
    }
    const group = groups.get(domain)!;
    group.users.push(user);
    group.ticketCount += ticketCountByUserId[user.id] ?? 0;
  }

  return Array.from(groups.values()).sort((a, b) => a.name.localeCompare(b.name));
}
