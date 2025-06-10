import Legend from "@/components/atoms/legend";
import Map from "@/components/atoms/map";
import RoadInfo from "@/components/atoms/road-info";
import { useRegion } from "@/hooks/use-region";
import MainLayout from "@/layouts/main-layout";
import { getRegion } from "@/services/getRegionService";
import { getRoads } from "@/services/getRoadsService";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
    const [roads, setRoads] = useState<Roads[]>([]);
    const { setProvinsi, setKabupaten, setKecamatan, setDesa } = useRegion();

    const fetchRegion = async () => {
        try {
            const payload = await getRegion();
            setProvinsi(payload.provinsi);
            setKabupaten(payload.kabupaten);
            setKecamatan(payload.kecamatan);
            setDesa(payload.desa);
        } catch (err: any) {
            console.log(err);
            const message =
                err.response?.data?.meta?.message || "Terjadi kesalahan tak terduga.";
            toast.error(message);
        }
    };

    const fetchRoads = async () => {
        try {
            const payload = await getRoads();
            setRoads(payload.ruasjalan);
        } catch (err: any) {
            console.log(err);
            const message =
                err.response?.data?.meta?.message || "Terjadi kesalahan tak terduga.";
            toast.error(message);
        }
    }


    useEffect(() => {
        fetchRegion();
        fetchRoads();
    }, []);

    const [selectedRoad, setSelectedRoad] = useState<Roads | null>(null);


    return (
        <MainLayout>
            <div className="h-full w-full flex flex-col bg-red-500">
                {/* <TopBar /> */}
                <Legend />
                <div className="h-full relative z-0 w-full overflow-hidden">
                    <Map roads={roads} selectedRoad={selectedRoad} onPathClick={(road) => setSelectedRoad(road)} />
                    <RoadInfo road={selectedRoad} onClose={() => setSelectedRoad(null)} />
                </div>

            </div>
        </MainLayout>
    )
}

