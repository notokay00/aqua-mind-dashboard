import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dailyData = [
  { name: "Mon", usage: 120 },
  { name: "Tue", usage: 180 },
  { name: "Wed", usage: 95 },
  { name: "Thu", usage: 210 },
  { name: "Fri", usage: 150 },
  { name: "Sat", usage: 250 },
  { name: "Sun", usage: 175 },
];

const monthlyData = [
  { name: "Jan", usage: 3200 },
  { name: "Feb", usage: 2800 },
  { name: "Mar", usage: 3500 },
  { name: "Apr", usage: 4100 },
  { name: "May", usage: 3800 },
  { name: "Jun", usage: 4600 },
  { name: "Jul", usage: 5200 },
  { name: "Aug", usage: 4900 },
  { name: "Sep", usage: 4200 },
  { name: "Oct", usage: 3600 },
  { name: "Nov", usage: 3100 },
  { name: "Dec", usage: 2900 },
];

const yearlyData = [
  { name: "2020", usage: 38000 },
  { name: "2021", usage: 42000 },
  { name: "2022", usage: 39500 },
  { name: "2023", usage: 45000 },
  { name: "2024", usage: 41000 },
  { name: "2025", usage: 36800 },
];

type Period = "daily" | "monthly" | "yearly";

const dataMap: Record<Period, typeof dailyData> = {
  daily: dailyData,
  monthly: monthlyData,
  yearly: yearlyData,
};

const unitMap: Record<Period, string> = {
  daily: "L",
  monthly: "L",
  yearly: "L",
};

const Analytics = () => {
  const [period, setPeriod] = useState<Period>("daily");

  const periods: { key: Period; label: string }[] = [
    { key: "daily", label: "Daily" },
    { key: "monthly", label: "Monthly" },
    { key: "yearly", label: "Yearly" },
  ];

  return (
    <div className="rounded-lg bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Water Usage Analytics
        </h2>
      </div>

      {/* Period tabs */}
      <div className="flex gap-1 mb-5 p-1 bg-secondary rounded-lg">
        {periods.map((p) => (
          <button
            key={p.key}
            onClick={() => setPeriod(p.key)}
            className={`flex-1 py-2 px-3 rounded-md text-xs font-semibold uppercase tracking-wide transition-all ${
              period === p.key
                ? "bg-water text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dataMap[period]} barSize={period === "yearly" ? 32 : undefined}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 18%)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "hsl(215 12% 52%)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "hsl(215 12% 52%)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220 18% 10%)",
                border: "1px solid hsl(220 14% 18%)",
                borderRadius: "8px",
                color: "hsl(210 20% 92%)",
                fontSize: 12,
              }}
              formatter={(value: number) => [`${value}${unitMap[period]}`, "Usage"]}
            />
            <Bar
              dataKey="usage"
              fill="hsl(185 72% 48%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
