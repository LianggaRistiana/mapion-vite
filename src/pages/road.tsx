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
import {
    FilterIcon,
    MapPin,
    Trash2Icon
} from "lucide-react";
import RoadInfo from "@/components/atoms/road-info";
import { deleteRoad } from "@/services/deleteRoadService";
import { useNavigate } from "react-router-dom";
import FilterDropdown from "@/components/molecules/filter-dropdown";
import { AnimatePresence, motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ConfirmDialog } from "@/components/atoms/confirm-dialog";

export default function Road() {
    const navigate = useNavigate()
    const [roads, setRoads] = useState<Roads[]>([]);
    const [selectedRoad, setSelectedRoad] = useState<Roads | null>(null);
    const [typeLayer, setTypeLayer] = useState("");
    const [conditionLayer, setConditionLayer] = useState("");
    const [eksistingLayer, setEksistingLayer] = useState("");

    const [inputValue, setInputValue] = useState(""); // buat tampungan sementara
    const [roadName, setRoadName] = useState("");     // disimpan saat Enter


    const [filteredRoads, setFilteredRoads] = useState<Roads[]>([]);

    useEffect(() => {
        let result = roads;

        if (typeLayer) {
            result = result.filter((road) => road.jenisjalan_id === Number(typeLayer));
        }

        if (conditionLayer) {
            result = result.filter((road) => road.kondisi_id === Number(conditionLayer));
        }

        if (eksistingLayer) {
            result = result.filter((road) => road.eksisting_id === Number(eksistingLayer));
        }

        if (roadName) {
            result = result.filter((road) =>
                road.nama_ruas.toLowerCase().includes(roadName.toLowerCase()) // bisa pakai includes untuk fleksibel
            );
        }

        setSelectedRoad(null);
        setFilteredRoads(result);
    }, [roadName, typeLayer, conditionLayer, eksistingLayer, roads]);



    const resetFilter = () => {
        setTypeLayer("");
        setConditionLayer("");
        setEksistingLayer("");
        setRoadName("");
        setInputValue("");
        setSelectedRoad(null);
    }

    const {
        getDesaById,
    } = useRegion();

    const {
        roadTypes,
        roadConditions,
        eksistingRoads,
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

    const deleteRoadHandle = async (id: number) => {
        try {
            const payload = await deleteRoad(id);
            if (payload.code === 200) {
                toast.success("Berhasil menghapus jalan");
                setSelectedRoad(null);
                fetchRoads();
            } else {
                toast.error(payload.message);
            }
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
                    <p className="">{row.original.nama_ruas}</p>
                    <div className="flex gap-1 items-center">
                        <MapPin className="h-3 w-3 opacity-50"></MapPin>
                        <p className="font-sm opacity-50">{getDesaById(row.original.desa_id.toString())}</p>
                    </div>
                </div>
            }
        },
        {
            accessorKey: 'jenisjalan_id',
            header: "Jenis Jalan",
            cell: ({ row }) => {
                return <Badge className={`w-full ${row.original.jenisjalan_id == 1 ? "border-green-600 border-2" : row.original.jenisjalan_id == 2 ? "border-blue-500 border-2" : row.original.jenisjalan_id == 3 ? "border-red-500 border-2" : ""}`} variant={"secondary"}>
                    {getRoadTypeById(row.original.jenisjalan_id)}
                </Badge>

            }
        },
        {
            accessorKey: "kondisi_id",
            header: "Kondisi Jalan",
            cell: ({ row }) => {
                return <Badge className={'w-full'} variant={row.original.kondisi_id == 3 ? "destructive" : "secondary"}>
                    {getRoadConditionById(row.original.kondisi_id)}
                </Badge>
            }
        },
        {
            accessorKey: "eksisting_id",
            header: "Material Jalan",
            cell: ({ row }) => {
                return getEksistingRoadById(row.original.eksisting_id)
            }
        },
        {
            accessorKey: "panjang",
            header: "Panjang",
            cell: ({ row }) => {
                return Math.ceil(row.original.panjang) + " meter"
            }
        },
        {
            accessorKey: "lebar",
            header: "Lebar",
            cell: ({ row }) => {
                return Math.ceil(row.original.lebar) + " meter"
            }
        },

        {
            accessorKey: "keterangan",
            header: "Keterangan",
            cell: ({ row }) => {
                return <Tooltip>
                    <TooltipTrigger>
                        <div className="max-w-[50px] overflow-hidden text-ellipsis">
                            {row.original.keterangan}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{row.original.keterangan}</p>
                    </TooltipContent>
                </Tooltip>

            }
        },
        {
            id: "actions", // beri id unik
            header: () => <div className="text-right">Aksi</div>,
            cell: ({ row }) => {
                return <div className="flex gap-2">
                    <Button className="bg-orange-400 hover:bg-orange-200" onClick={() => navigate(`/edit-road/${row.original.id}`)}>Edit Jalan</Button>
                    <ConfirmDialog
                    title={`Apakah anda yakin ingin menganghapus ruas jalan ${row.original.nama_ruas}?`}
                    description="aksi ini tidak dapat dikembalikan"
                    onConfirm={() => deleteRoadHandle(row.original.id)}
                    >
                        <Button variant={"destructive"} onClick={(e) => e.stopPropagation()} ><Trash2Icon /></Button>
                    </ConfirmDialog>
                </div>
            }
        }
    ]

    useInitialFetch();

    useEffect(() => {
        fetchRoads();
    }, []);

    return <MainLayout>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 h-full pb-4 overflow-hidden
                  lg:auto-rows-fr grid-rows-2 lg:grid-rows-1 ">
            <div className="flex flex-col gap-4 h-full">

                {/* Filter box */}
                <div className="w-full h-fit px-4 py-4 border rounded-lg">
                    <div className="flex items-center gap-1 mb-2">
                        <FilterIcon className="h-4 w-4" />
                        <p className="font-bold text-md ">Filter Jalan</p>
                    </div>
                    <div className="flex gap-4 mb-4">
                        <Input
                            placeholder="Cari Nama jalan"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setRoadName(inputValue);
                                }
                            }}
                        />
                    </div>
                    <div className="flex gap-4 overflow-x-auto">
                        <FilterDropdown
                            title="Jenis jalan"
                            selectedValue={typeLayer}
                            setSelectedValue={setTypeLayer}
                            data={roadTypes.map((p) => ({
                                value: p.id.toString(),
                                item: p.jenisjalan,
                            }))}
                        />
                        <FilterDropdown
                            title="Kondisi jalan"
                            selectedValue={conditionLayer}
                            setSelectedValue={setConditionLayer}
                            data={roadConditions.map((p) => ({
                                value: p.id.toString(),
                                item: p.kondisi,
                            }))}
                        />
                        <FilterDropdown
                            title="Material jalan"
                            selectedValue={eksistingLayer}
                            setSelectedValue={setEksistingLayer}
                            data={eksistingRoads.map((p) => ({
                                value: p.id.toString(),
                                item: p.eksisting,
                            }))}
                        />
                    </div>
                    <AnimatePresence>
                        {
                            (typeLayer || conditionLayer || eksistingLayer || roadName) && <motion.div
                                className="w-full mt-4"
                                initial={{ y: 0, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 0, opacity: 0 }}
                            >
                                <Button className="w-full" onClick={resetFilter}>
                                    <Trash2Icon className="h-4 w-4" />
                                    Hapus Filter
                                </Button>
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>

                {/* Table area */}
                <div className="flex-1 overflow-hidden">
                    <div className="h-full overflow-auto">
                        <RoadTable
                            columns={roadColumns}
                            data={filteredRoads}
                            onRowClick={(row) => setSelectedRoad(row)}
                            selectedRow={selectedRoad}
                        />
                    </div>
                </div>
                {/* <div className="h-full">
                    <RoadTable columns={roadColumns} data={filteredRoads} onRowClick={(row) => setSelectedRoad(row)} selectedRow={selectedRoad} />
                </div> */}
            </div>

            <div className="w-full h-full overflow-hidden relative border rounded-lg ">
                <Map roads={filteredRoads} selectedRoad={selectedRoad} onPathClick={(road) => setSelectedRoad(road)} />
                <RoadInfo road={selectedRoad} onClose={() => setSelectedRoad(null)} />
            </div>
        </div>
    </MainLayout>

}