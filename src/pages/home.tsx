import AddRoadButton from "@/components/atoms/add-road-button";
import Map from "@/components/atoms/map";
import ProfileButton from "@/components/atoms/profile-button";
import AddRoadForm from "@/components/molecules/add-road-form";
import TopBar from "@/components/organisms/top-bar";
import { Button } from "@/components/ui/button";
import { useRegion } from "@/hooks/use-region";
import { getRegion } from "@/services/getRegionService";
import { getRoads } from "@/services/getRoadsService";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Home() {
    const navigate = useNavigate()

    const [isAddMode, setIsAddMode] = useState(false);
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
        // toast.success("Done")

        fetchRegion();
        fetchRoads();
    }, []);


    return (
        <div className="h-screen flex flex-col">
            <TopBar />
            <div className="flex-1 relative z-0 overflow-hidden">
                <Map roads={roads} />
            </div>
            <div className="absolute z-1 bottom-6 right-4">
                {/* <AddRoadButton isShowed={!isAddMode} onClick={() => setIsAddMode(true)} /> */}
                <Button onClick={() => navigate('/add-road')}>
                    <PlusIcon />
                    Tambah Ruas Jalan
                </Button>
            </div>

            <AddRoadForm isShowed={isAddMode} onClose={() => setIsAddMode(false)} />
            <div className="absolute z-1 top-4 right-4">
                <ProfileButton />
            </div>
        </div>
    )
}
