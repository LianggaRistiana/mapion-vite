import { createContext, type ReactNode, useState } from 'react';

export const RoadStatsContext = createContext<RoadStatsContext | undefined>(undefined);

export function RoadStatProvider({ children }: { children: ReactNode }) {
    const [roadTypes, setRoadTypes] = useState<RoadType[]>([])
    const [roadConditions, setRoadConditions] = useState<RoadCondition[]>([])
    const [eksistingRoads, setEksistingRoads] = useState<EksistingRoad[]>([])


    return <RoadStatsContext.Provider
        value={{
            roadTypes,
            roadConditions,
            eksistingRoads,
            setRoadTypes,
            setRoadConditions,
            setEksistingRoads
        }}
    >
        {children}
    </RoadStatsContext.Provider>
}