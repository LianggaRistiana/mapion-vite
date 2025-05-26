import AddRoadButton from "@/components/atoms/add-road-button";
import Map from "@/components/atoms/map";
import ProfileButton from "@/components/atoms/profile-button";
import AddRoadForm from "@/components/molecules/add-road-form";
import TopBar from "@/components/organisms/top-bar";
import { useRegion } from "@/hooks/use-region";
import { getRegion } from "@/services/getRegionService";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
    const [isAddMode, setIsAddMode] = useState(false);
    const { setProvinsi, setKabupaten, setKecamatan, setDesa } = useRegion();

    useEffect(() => {
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
        fetchRegion();
    }, []);


    return (
        <div className="h-screen flex flex-col">
            <TopBar />
            <div className="flex-1 relative z-0 overflow-hidden">
                <Map />
            </div>
            <div className="absolute z-1 bottom-6 right-4">
                <AddRoadButton isShowed={!isAddMode} onClick={() => setIsAddMode(true)} />
            </div>

            <AddRoadForm isShowed={isAddMode} onClose={() => setIsAddMode(false)} />
            <div className="absolute z-1 top-4 right-4">
                <ProfileButton />
            </div>
        </div>
    )
}
