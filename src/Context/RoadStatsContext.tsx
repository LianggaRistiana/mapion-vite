import { createContext, type ReactNode, useState } from 'react';

export const RoadStatsContext = createContext<RoadStatsContext | undefined>(undefined);

export function RoadStatProvider({ children }: { children: ReactNode }) {
    const [roadTypes, setRoadTypes] = useState<RoadType[]>([])
    const [roadConditions, setRoadConditions] = useState<RoadCondition[]>([])
    const [eksistingRoads, setEksistingRoads] = useState<EksistingRoad[]>([])
    
    const [selectedRoadType, setSelectedRoadType] = useState<string>("");
    const [selectedRoadCondition, setSelectedRoadCondition] = useState<string>("")
    const [selectedEksistingRoad, setSelectedEksistingRoad] = useState<string>("")
    
    const [roadLength, setRoadLength] = useState<number>(0)
    const [roadPath, setRoadPath] = useState<string>("")

    return <RoadStatsContext.Provider
        value={{
            roadTypes,
            roadConditions,
            eksistingRoads,
            setRoadTypes,
            setRoadConditions,
            setEksistingRoads,
            selectedRoadType,
            selectedRoadCondition,
            selectedEksistingRoad,
            setSelectedRoadType,
            setSelectedRoadCondition,
            setSelectedEksistingRoad,
            roadLength,
            roadPath,
            setRoadLength,
            setRoadPath
        }}
    >
        {children}
    </RoadStatsContext.Provider>
}