import { useState } from "react";
import { Droplets } from "lucide-react";
import TankLevel from "@/components/TankLevel";
import PumpControl from "@/components/PumpControl";
import WaterUsage from "@/components/WaterUsage";
import Analytics from "@/components/Analytics";

const Index = () => {
  const [pumpOn, setPumpOn] = useState(false);

  return (
    <div className="min-h-screen bg-background px-4 py-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-water/10">
          <Droplets className="h-6 w-6 text-water" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">AquaMonitor</h1>
          <p className="text-xs text-muted-foreground">Smart Tank Dashboard</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-pump-on animate-pulse-glow" />
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>

      {/* Dashboard grid */}
      <div className="space-y-4">
        <TankLevel percentage={72} capacity={1000} currentLevel={720} />
        <PumpControl isOn={pumpOn} onToggle={setPumpOn} />
        <WaterUsage usedToday={345} pumpRuntime="2h 15m" refillCycles={3} />
        <Analytics />
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-muted-foreground mt-6 mb-2">
        Last updated: just now
      </p>
    </div>
  );
};

export default Index;
