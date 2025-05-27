import Map from "@/components/atoms/map";
import RoadForm from "@/components/organisms/road-form";
import { useRoadStats } from "@/hooks/use-road-stats";
import { getEksistingRoad } from "@/services/getEksistingRoad";
import { getRoadCondition } from "@/services/getRoadConditionService";
import { getRoadType } from "@/services/getRoadTypeService";
import { useEffect } from "react";
import { toast } from "sonner";
import { set } from "zod";


export default function AddRoad() {
    const { setRoadTypes, setRoadConditions, setEksistingRoads, roadLength } = useRoadStats();

    const fetchRoadType = async () => {
        try {
            const roadTypes = await getRoadType();
            // console.log(roadType);
            setRoadTypes(roadTypes.eksisting);
        } catch (err: any) {
            console.log(err);
            const message =
                err.response?.data?.meta?.message || "Terjadi kesalahan tak terduga.";
            toast.error(message);
        }
    }
    const fetchRoadCondition = async () => {
        try {
            const roadConditions = await getRoadCondition();
            // console.log(roadType);
            setRoadConditions(roadConditions.eksisting);
        } catch (err: any) {
            console.log(err);
            const message =
                err.response?.data?.meta?.message || "Terjadi kesalahan tak terduga.";
            toast.error(message);
        }
    }
    const fetchEksistingRoad = async () => {
        try {
            const eksistingRoads = await getEksistingRoad();
            // console.log(roadType);
            setEksistingRoads(eksistingRoads.eksisting)
        } catch (err: any) {
            console.log(err);
            const message =
                err.response?.data?.meta?.message || "Terjadi kesalahan tak terduga.";
            toast.error(message);
        }
    }

    useEffect(() => {
        fetchRoadType();
        fetchRoadCondition();
        fetchEksistingRoad();
    }, []);

    return <div className="h-screen grid grid-cols-[1fr_2fr] ">
        <div className="grid grid-cols-1 h-fit gap-4 px-8 py-8">
            <p className="font-bold text-lg">Tambah Jalan</p>
            <RoadForm></RoadForm>
        </div>
        <div className="w-full h-[100vh] overflow-hidden relative">
            <div className="absolute top-6 left-6 p-2 rounded-md bg-background shadow-md z-[9999]">
                <p className="font-bold">{roadLength} meter</p>
            </div>
            <Map isEditing roads={[]}></Map>
        </div>

    </div>
}