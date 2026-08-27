import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { SearchConsoleQueryRow } from "@/lib/search-console";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "Helvetica", color: "#211a13" },
  eyebrow: { fontSize: 9, color: "#8b7e6a", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 },
  title: { fontSize: 22, marginBottom: 24 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 13, marginBottom: 8, color: "#9a5423", fontFamily: "Helvetica-Bold" },
  statRow: { flexDirection: "row", gap: 24, marginBottom: 4 },
  statBlock: { flexDirection: "column" },
  statValue: { fontSize: 20, fontFamily: "Helvetica-Bold" },
  statLabel: { fontSize: 9, color: "#5b4e3f", marginTop: 2 },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e4d8bd",
  },
  tableCellQuery: { flex: 1, paddingRight: 12 },
  tableCellNum: { width: 60, textAlign: "right" },
  muted: { color: "#8b7e6a", fontSize: 10 },
  footer: { position: "absolute", bottom: 30, left: 40, right: 40, fontSize: 8, color: "#8b7e6a" },
});

function monthLabel(periodMonth: string): string {
  const [year, month] = periodMonth.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function MonthlyReportDocument({
  orgName,
  periodMonth,
  visitors,
  pageViews,
  topQueries,
  requestCount,
}: {
  orgName: string;
  periodMonth: string; // YYYY-MM
  visitors: number | null;
  pageViews: number | null;
  topQueries: SearchConsoleQueryRow[] | null;
  requestCount: number;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.eyebrow}>Monthly Report — {monthLabel(periodMonth)}</Text>
        <Text style={styles.title}>{orgName}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Website Traffic</Text>
          {visitors === null && pageViews === null ? (
            <Text style={styles.muted}>Analytics not connected for this account.</Text>
          ) : (
            <View style={styles.statRow}>
              <View style={styles.statBlock}>
                <Text style={styles.statValue}>{visitors ?? "—"}</Text>
                <Text style={styles.statLabel}>Visitors</Text>
              </View>
              <View style={styles.statBlock}>
                <Text style={styles.statValue}>{pageViews ?? "—"}</Text>
                <Text style={styles.statLabel}>Page Views</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Search Queries</Text>
          {!topQueries || topQueries.length === 0 ? (
            <Text style={styles.muted}>No search query data available for this period.</Text>
          ) : (
            topQueries.map((q) => (
              <View key={q.query} style={styles.tableRow}>
                <Text style={styles.tableCellQuery}>{q.query}</Text>
                <Text style={styles.tableCellNum}>{q.clicks} clicks</Text>
                <Text style={styles.tableCellNum}>#{q.position.toFixed(1)}</Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Requests</Text>
          <View style={styles.statRow}>
            <View style={styles.statBlock}>
              <Text style={styles.statValue}>{requestCount}</Text>
              <Text style={styles.statLabel}>Requests submitted this period</Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer}>Prepared by Spectecle · spectecle.com</Text>
      </Page>
    </Document>
  );
}
