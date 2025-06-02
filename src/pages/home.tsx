import Map from "@/components/atoms/map";
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


    return (
        <MainLayout>
            <div className="h-screen w-full flex flex-col bg-red-500">
                {/* <TopBar /> */}
                <div className="flex-1 relative z-0 w-full overflow-hidden">
                    <Map roads={roads} />
                </div>

            </div>
        </MainLayout>
    )
}

