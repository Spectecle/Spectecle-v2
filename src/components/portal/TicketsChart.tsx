"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function formatDay(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", { day: "numeric" });
}

function formatFullDate(label: React.ReactNode): string {
  return new Date(`${label}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function TicketsChart({ data }: { data: { date: string; count: number }[] }) {
  if (data.every((d) => d.count === 0)) {
    return <p className="text-sm text-[var(--portal-text-faint)] py-10 text-center">No tickets yet this month.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--portal-border)" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={formatDay}
          tick={{ fill: "var(--portal-text-faint)", fontSize: 11 }}
          axisLine={{ stroke: "var(--portal-border)" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "var(--portal-text-faint)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={32}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            background: "var(--portal-card)",
            border: "1px solid var(--portal-border)",
            borderRadius: 8,
            fontSize: 12,
            color: "var(--portal-text-primary)",
          }}
          labelFormatter={formatFullDate}
        />
        <Bar dataKey="count" fill="#f87444" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
