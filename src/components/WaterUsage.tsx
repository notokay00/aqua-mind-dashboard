import { Droplets, Clock, RotateCcw } from "lucide-react";

interface WaterUsageProps {
  usedToday: number;
  pumpRuntime: string;
  refillCycles: number;
}

const WaterUsage = ({ usedToday, pumpRuntime, refillCycles }: WaterUsageProps) => {
  const stats = [
    {
      icon: Droplets,
      label: "Used Today",
      value: `${usedToday}L`,
      color: "text-water",
    },
    {
      icon: Clock,
      label: "Pump Runtime",
      value: pumpRuntime,
      color: "text-foreground",
    },
    {
      icon: RotateCcw,
      label: "Refill Cycles",
      value: String(refillCycles),
      color: "text-foreground",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-lg bg-card p-4 text-center">
          <stat.icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {stat.label}
          </p>
          <p className={`text-lg font-bold font-mono ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default WaterUsage;
