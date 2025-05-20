import { useEffect, useState } from "react";
import ListLoading from "../atoms/list-loading";
import ItemButton from "../atoms/item-button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

type RegionResponse = {
    code: number;
    status: string;
    provinsi: { id: number; provinsi: string }[];
    kabupaten: { id: number; prov_id: number; kabupaten: string }[];
    kecamatan: { id: number; kab_id: number; kecamatan: string }[];
    desa: { id: number; kec_id: number; desa: string }[];
};

export default function ListRegion() {
    const [data, setData] = useState<RegionResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchRegion = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/mregion`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const json: RegionResponse = await res.json();
                if (res.ok && json.code === 200) {
                    setData(json);
                } else {
                    console.error("Gagal mengambil data region");
                }
            } catch (err) {
                console.error("Terjadi kesalahan:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRegion();
    }, []);

    if (isLoading) return <ListLoading />;

    return (
        <div className="space-y-2">
            {data?.provinsi.map((prov) => (
                <Collapsible key={prov.id}>
                    <CollapsibleTrigger asChild>
                        <ItemButton onClick={() => { }}>
                            {prov.provinsi}
                        </ItemButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="ml-4 space-y-1">
                        {data.kabupaten
                            .filter((kab) => kab.prov_id === prov.id)
                            .map((kab) => (
                                <Collapsible key={kab.id}>
                                    <CollapsibleTrigger asChild>
                                        <ItemButton onClick={() => { }}>
                                            {kab.kabupaten}
                                        </ItemButton>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent className="ml-4 space-y-1">
                                        {data.kecamatan
                                            .filter((kec) => kec.kab_id === kab.id)
                                            .map((kec) => (
                                                <Collapsible key={kec.id}>
                                                    <CollapsibleTrigger asChild>
                                                        <ItemButton onClick={() => { }}>
                                                            {kec.kecamatan}
                                                        </ItemButton>
                                                    </CollapsibleTrigger>

                                                    <CollapsibleContent className="ml-4 space-y-1">
                                                        {data.desa
                                                            .filter((d) => d.kec_id === kec.id)
                                                            .map((d) => (
                                                                <div key={d.id} className="ml-4">
                                                                    <ItemButton
                                                                        onClick={() =>
                                                                            alert(`Desa: ${d.desa}`)
                                                                        }
                                                                    >
                                                                        {d.desa}
                                                                    </ItemButton>
                                                                </div>
                                                            ))}
                                                    </CollapsibleContent>
                                                </Collapsible>
                                            ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            ))}
                    </CollapsibleContent>
                </Collapsible>
            ))}
        </div>
    );
}
