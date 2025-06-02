import Map from "@/components/atoms/map";
import { RoadTable } from "@/components/molecules/road-table";
import MainLayout from "@/layouts/main-layout";
import { getRoads } from "@/services/getRoadsService";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { type ColumnDef } from "@tanstack/react-table";
import { useRegion } from "@/hooks/use-region";
import useInitialFetch from "@/hooks/use-initial-fetch";
import { useRoadStats } from "@/hooks/use-road-stats";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

export default function Road() {
    const [roads, setRoads] = useState<Roads[]>([]);
    const {
        getDesaById,
    } = useRegion();

    const {
        getRoadConditionById,
        getRoadTypeById,
        getEksistingRoadById,
    } = useRoadStats();

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

    const roadColumns: ColumnDef<Roads>[] = [
        {
            accessorKey: "nama_ruas",
            header: "Jalan",
            cell: ({ row }) => {
                return <div>
                    <p className="font-bold">{row.original.nama_ruas}</p>
                    <p className="font-sm opacity-50">{getDesaById(row.original.desa_id.toString())}</p>
                </div>
            }
        },
        {
            accessorKey: "keterangan",
            header: "Keterangan",
        },
        {
            accessorKey: 'jenisjalan_id',
            header: "Jenis Jalan",
            cell: ({ row }) => {
                return getRoadTypeById(row.original.jenisjalan_id)
            }
        },
        {
            accessorKey: "kondisi_id",
            header: "Kondisi Jalan",
            cell: ({ row }) => {
                return getRoadConditionById(row.original.kondisi_id)
            }
        },
        {
            accessorKey: "eksisting_id",
            header: "Eksisting",
            cell: ({ row }) => {
                return getEksistingRoadById(row.original.eksisting_id)
            }
        },
        {
            accessorKey: "panjang",
            header: "Panjang",
        },
        {
            header: "Aksi",
            cell: ({ row }) => {
                return <div className="flex gap-2">
                    <Button>Edit Jalan</Button>
                    <Button variant={"destructive"}><Trash2Icon /></Button>
                </div>
            }
        }
    ]

    useInitialFetch();

    useEffect(() => {
        fetchRoads();
    }, []);

    return <MainLayout>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 h-full pb-8 overflow-hidden
                  lg:auto-rows-fr grid-rows-2 lg:grid-rows-1">
            {/* <div className="overflow-hidden h-full"> */}
            <RoadTable columns={roadColumns} data={roads} onRowClick={(row) => alert(row.nama_ruas)} />
            {/* </div> */}
            <div className="w-full h-full overflow-hidden relative">
                <Map roads={roads} />
            </div>
        </div>
    </MainLayout>

}