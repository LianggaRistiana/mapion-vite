import Map from "@/components/atoms/map";
import RoadForm from "@/components/organisms/road-form";
import { useRoadStats } from "@/hooks/use-road-stats";
import MainLayout from "@/layouts/main-layout";
import { ScrollArea } from "@/components/ui/scroll-area"
import useInitialFetch from "@/hooks/use-initial-fetch";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoadById } from "@/services/getRoadByIdService";
import { toast } from "sonner";
import { useRegion } from "@/hooks/use-region";

export default function EditRoad() {
    const { roadLength } = useRoadStats();
    const { id } = useParams();

    const {
        getRegionByDesaID
    } = useRegion();

    const [road, setRoad] = useState<Roads | null>(null);
    const [regionID, setRegionID] = useState<RegionID | null>(null);

    useInitialFetch();

    useEffect(() => {
        const fetchRoad = async () => {
            try {
                const payload = await getRoadById(Number(id));
                if (payload.code === 200) {
                    setRoad(payload.ruasjalan);
                    // console.log(road);
                }
            } catch (err: any) {
                console.log(err);
                const message =
                    err.response?.data?.meta?.message || "Terjadi kesalahan tak terduga.";
                toast.error(message);
            }
        }

        if (road === null) {
            fetchRoad();
        }
    }, []);

    useEffect(() => {
        if (road && regionID === null) {
            const regionID = getRegionByDesaID(road.desa_id);
            // console.log(regionID);
            setRegionID(regionID);
        }
    }, [road]);


    return <MainLayout>
        <div className="h-full grid grid-cols-[1fr_2fr] ">
            <div className="grid grid-cols-1 h-fit gap-4 px-4">
                <p className="font-bold text-lg">Edit Jalan</p>
                {
                    road && regionID ? <ScrollArea className="h-[80vh] w-full rounded-md border p-4 relative">
                        <RoadForm road={road} regionId={regionID} roadId={Number(id)} />
                    </ScrollArea> : "loading"
                }

            </div>
            <div className="w-full h-full relative">
                <div className="absolute top-6 left-6 p-2 rounded-md bg-background shadow-md z-[9999]">
                    <p className="font-bold">{Math.ceil(roadLength)} meter</p>

                </div>
                {
                    road && regionID ? <Map isEditing oldRoad={road?.paths} roads={[]}></Map> : "loading"
                }
                {/* <Map isEditing oldRoad={road?.paths} roads={[]}></Map> */}
            </div>
        </div>
    </MainLayout>
}