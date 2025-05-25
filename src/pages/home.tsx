import AddRoadButton from "@/components/atoms/add-road-button";
import Map from "@/components/atoms/map";
import ProfileButton from "@/components/atoms/profile-button";
import AddRoadForm from "@/components/molecules/add-road-form";
import TopBar from "@/components/organisms/top-bar";
import { useRegion } from "@/hooks/use-region";
import { useEffect, useState } from "react";

const listProvinsi: Provinsi[] = [
    { id: 17, provinsi: 'Bali' },
]

const listKabupaten: Kabupaten[] = [
    { id: 1, prov_id: 17, kabupaten: 'Badung' },
    { id: 2, prov_id: 17, kabupaten: 'Gianyar' },
    { id: 3, prov_id: 17, kabupaten: 'Tabanan' },
];

const listKecamatan: Kecamatan[] = [
    { id: 1, kab_id: 1, kecamatan: 'Kuta' },
    { id: 2, kab_id: 2, kecamatan: 'Ubud' },
    { id: 3, kab_id: 3, kecamatan: 'Kerambitan' },
];

const listDesa: Desa[] = [
    { id: 1, kec_id: 1, desa: 'Legian' },
    { id: 2, kec_id: 2, desa: 'Petulu' },
    { id: 3, kec_id: 3, desa: 'Tibu Biu' },
];

export default function Home() {
    const [isAddMode, setIsAddMode] = useState(false);
    const { setProvinsi, setKabupaten, setKecamatan, setDesa } = useRegion();

    useEffect(() => {
        setProvinsi(listProvinsi);
        setKabupaten(listKabupaten);
        setKecamatan(listKecamatan);
        setDesa(listDesa);
    }, []);

    return (
        <div className="h-screen flex flex-col">
            <TopBar />
            {/* <MenuSheet /> */}
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
