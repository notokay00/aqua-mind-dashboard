import { useState, useEffect } from "react";
import { Droplets } from "lucide-react";
import TankLevel from "@/components/TankLevel";
import PumpControl from "@/components/PumpControl";
import WaterUsage from "@/components/WaterUsage";
import Analytics from "@/components/Analytics";
import { supabase } from "@/lib/supabase";

const Index = () => {
  const [pumpOn, setPumpOn] = useState(false);
  const [waterLevelPct, setWaterLevelPct] = useState(0);

  // Fetch the latest data when the dashboard loads
  useEffect(() => {
    const fetchDashboardData = async () => {
      // 1. Fetch Tank Level
      const { data: tankData, error: tankError } = await supabase
        .from('tank_telemetry')
        .select('water_level_pct')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!tankError && tankData) {
        setWaterLevelPct(tankData.water_level_pct);
      }

      // 2. Fetch Initial Pump Status
      const { data: pumpData, error: pumpError } = await supabase
        .from('pump_status')
        .select('is_running')
        .eq('id', 1)
        .single();

      if (!pumpError && pumpData) {
        setPumpOn(pumpData.is_running);
      }
    };

    fetchDashboardData();
  }, []);

  // Function to handle clicking the ON/OFF buttons
  const handlePumpToggle = async (newState: boolean) => {
    // Optimistically update the UI immediately so the app feels instantly responsive
    setPumpOn(newState);

    // Send the command to the cloud database
    const { error } = await supabase
      .from('pump_status')
      .update({ 
        is_running: newState,
        updated_at: new Date().toISOString() // Keep track of exactly when it was toggled
      })
      .eq('id', 1); // Target the single control row

    if (error) {
      console.error("Error updating pump status:", error);
      // If the database fails to update, flip the UI button back to its previous state
      setPumpOn(!newState); 
    }
  };

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
        <TankLevel 
          percentage={waterLevelPct} 
          capacity={1000} 
          currentLevel={(waterLevelPct / 100) * 1000} 
        />
        
        {/* Pass the new toggle function to the pump control */}
        <PumpControl isOn={pumpOn} onToggle={handlePumpToggle} />
        
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