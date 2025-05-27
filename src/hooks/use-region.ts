import { useContext } from "react";
import { RegionContext } from "@/Context/RegionContext";

export function useRegion() {
    const context = useContext(RegionContext);
    if (!context) throw new Error('useRegion must be used within a RegionProvider');
    return context;
  }
  