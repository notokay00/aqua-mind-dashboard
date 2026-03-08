import { Power, PowerOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PumpControlProps {
  isOn: boolean;
  onToggle: (state: boolean) => void;
}

const PumpControl = ({ isOn, onToggle }: PumpControlProps) => {
  return (
    <div className={`rounded-lg bg-card p-5 transition-shadow duration-500 ${isOn ? "glow-pump-on" : ""}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`h-2.5 w-2.5 rounded-full ${isOn ? "bg-pump-on animate-pulse-glow" : "bg-pump-off"}`} />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Pump Control
        </h2>
      </div>

      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Status</p>
          <p className={`text-2xl font-bold font-mono ${isOn ? "text-pump-on" : "text-pump-off"}`}>
            {isOn ? "RUNNING" : "OFF"}
          </p>
        </div>
        <div className={`p-3 rounded-full ${isOn ? "bg-pump-on/10" : "bg-secondary"}`}>
          {isOn ? (
            <Power className="h-8 w-8 text-pump-on" />
          ) : (
            <PowerOff className="h-8 w-8 text-pump-off" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => onToggle(true)}
          disabled={isOn}
          className="bg-pump-on/90 hover:bg-pump-on text-primary-foreground font-semibold disabled:opacity-30"
        >
          Turn ON
        </Button>
        <Button
          onClick={() => onToggle(false)}
          disabled={!isOn}
          variant="secondary"
          className="font-semibold disabled:opacity-30"
        >
          Turn OFF
        </Button>
      </div>
    </div>
  );
};

export default PumpControl;
