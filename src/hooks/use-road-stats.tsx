import { RoadStatsContext } from "@/Context/RoadStatsContext";
import { useContext } from "react";

export function useRoadStats() {
    const context = useContext(RoadStatsContext);
    if (!context) throw new Error('useRoadStats must be used within a RoadProvider');
    return context;
  }
