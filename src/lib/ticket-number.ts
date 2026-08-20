export function formatTicketNumber(n: number): string {
  return `SPC-${String(n).padStart(5, "0")}`;
}
