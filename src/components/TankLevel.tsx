import { Droplets } from "lucide-react";

interface TankLevelProps {
  percentage: number;
  capacity: number;
  currentLevel: number;
}

const TankLevel = ({ percentage, capacity, currentLevel }: TankLevelProps) => {
  return (
    <div className="rounded-lg bg-card p-5 glow-water">
      <div className="flex items-center gap-2 mb-4">
        <Droplets className="h-5 w-5 text-water" />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Tank Level
        </h2>
      </div>

      {/* Tank visualization */}
      <div className="flex items-end gap-5">
        <div className="relative w-24 h-40 rounded-xl border-2 border-border bg-secondary overflow-hidden">
          {/* Water fill */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-water/80 to-water/40 transition-all duration-1000 ease-out"
            style={{ height: `${percentage}%` }}
          >
            {/* Wave effect */}
            <div className="absolute top-0 left-0 right-0 h-3 overflow-hidden">
              <svg
                viewBox="0 0 120 10"
                className="w-[200%] animate-wave"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q15 0 30 5 Q45 10 60 5 Q75 0 90 5 Q105 10 120 5 V10 H0Z"
                  fill="hsl(var(--water) / 0.5)"
                />
              </svg>
            </div>
          </div>
          {/* Percentage overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold font-mono text-foreground drop-shadow-lg">
              {percentage}%
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Capacity</p>
            <p className="text-xl font-bold font-mono text-foreground">{capacity}L</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Current</p>
            <p className="text-xl font-bold font-mono text-gradient-water">{currentLevel}L</p>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-water rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TankLevel;
