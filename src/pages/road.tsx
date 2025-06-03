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
    Trash2Icon
} from "lucide-react";
import RoadInfo from "@/components/atoms/road-info";
import { deleteRoad } from "@/services/deleteRoadService";
import { useNavigate } from "react-router-dom";
import FilterDropdown from "@/components/molecules/filter-dropdown";
import { AnimatePresence, motion } from "motion/react";
import { Input } from "@/components/ui/input";

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
            header: "Aksi",
            cell: ({ row }) => {
                return <div className="flex gap-2">
                    <Button className="bg-orange-400" onClick={() => navigate(`/edit-road/${row.original.id}`)}>Edit Jalan</Button>
                    <Button variant={"destructive"} onClick={() => deleteRoadHandle(row.original.id)}><Trash2Icon /></Button>
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
            <div className="flex flex-col gap-4 ">
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
                    <div className="flex gap-4">
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
                <div className="">
                    <RoadTable columns={roadColumns} data={filteredRoads} onRowClick={(row) => setSelectedRoad(row)} selectedRow={selectedRoad} />
                </div>
            </div>

            <div className="w-full h-full overflow-hidden relative">
                <Map roads={filteredRoads} selectedRoad={selectedRoad} onPathClick={(road) => setSelectedRoad(road)} />
                <RoadInfo road={selectedRoad} onClose={() => setSelectedRoad(null)} />
            </div>
        </div>
    </MainLayout>

}