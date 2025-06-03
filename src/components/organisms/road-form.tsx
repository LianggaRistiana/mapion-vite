import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { RoadSchema } from "@/lib/schema";
import {  useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import FormFields from "../molecules/form-fields";
import { LoaderCircle } from "lucide-react";
import { useRegion } from "@/hooks/use-region";
import FilterDropdown from "../molecules/filter-dropdown";
import { useRoadStats } from "@/hooks/use-road-stats";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { addRoad } from "@/services/addRoad";
import { editRoad } from "@/services/editRoadService";
import { useNavigate } from "react-router-dom";

type Props = {
    road?: Roads | null;
    regionId?: RegionID | null;
    roadId?: number;
}

export default function RoadForm({ road, regionId, roadId }: Props) {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    const [selectedRoadType, setSelectedRoadType] = useState<string>(road?.jenisjalan_id?.toString() || "");
    const [selectedRoadCondition, setSelectedRoadCondition] = useState<string>(road?.kondisi_id?.toString() || "")
    const [selectedEksistingRoad, setSelectedEksistingRoad] = useState<string>(road?.eksisting_id?.toString() || "")

    const {
        provinsi,
        getKabupatenByProvinsi,
        getKecamatanByKabupaten,
        getDesaByKecamatan,
    } = useRegion();

    const [selectedProvinsi, setSelectedProvinsi] = useState<string>(regionId?.provinsiId || "");
    const [selectedKabupaten, setSelectedKabupaten] = useState<string>(regionId?.kabupatenId || "");
    const [selectedKecamatan, setSelectedKecamatan] = useState<string>(regionId?.kecamatanId || "");
    const [selectedDesa, setSelectedDesa] = useState<string>(road?.desa_id?.toString() || "");

    const prevProvinsi = useRef("");
    const prevKabupaten = useRef("");
    const prevKecamatan = useRef("");

    useEffect(() => {
        if (prevProvinsi.current !== "" && prevProvinsi.current !== selectedProvinsi) {
            console.log("provinsi reset");
            setSelectedKabupaten("");
            setSelectedKecamatan("");
            setSelectedDesa("");
        }
        prevProvinsi.current = selectedProvinsi;
    }, [selectedProvinsi]);

    useEffect(() => {
        if (prevKabupaten.current !== "" && prevKabupaten.current !== selectedKabupaten) {
            setSelectedKecamatan("");
            setSelectedDesa("");
        }
        prevKabupaten.current = selectedKabupaten;
    }, [selectedKabupaten]);

    useEffect(() => {
        if (prevKecamatan.current !== "" && prevKecamatan.current !== selectedKecamatan) {
            setSelectedDesa("");
        }
        prevKecamatan.current = selectedKecamatan;
    }, [selectedKecamatan]);


    const {
        roadTypes,
        roadConditions,
        eksistingRoads,
        roadLength,
        roadPath,
        setRoadPath,
    } = useRoadStats();

    useEffect(() => {
        // setRoadLength(road?.panjang || 0);
        setRoadPath(road?.paths || "");
    }, [])

    const kabupaten = getKabupatenByProvinsi(selectedProvinsi);
    const kecamatan = getKecamatanByKabupaten(selectedKabupaten);
    const desa = getDesaByKecamatan(selectedKecamatan);

    const form = useForm<z.infer<typeof RoadSchema>>({
        resolver: zodResolver(RoadSchema),
        defaultValues: {
            width: road?.lebar || 0,
            roadCode: road?.kode_ruas || "",
            roadName: road?.nama_ruas || "",
            desc: road?.keterangan || "",
        },
    })

    const roadField: FieldConfig[] = [
        { name: "roadCode", label: "Kode jalan" },
        { name: "roadName", label: "Ruas Jalan", placeholder: "Nama ruas jalan", },
        { name: "desc", label: "Keterangan Jalan", placeholder: "Jalan perumahan" },
    ]

    const onSubmit = async (values: z.infer<typeof RoadSchema>) => {
        if (roadLength === 0) {
            toast.error("Isi Path Jalan terlebih dahulu");
            return;
        }
        if (selectedDesa === "") {
            toast.error("Desa wajib dipilih");
            return;
        }
        if (selectedEksistingRoad === "") {
            toast.error("Eksisting jalan wajib dipilih");
            return;
        }

        if (selectedRoadCondition === "") {
            toast.error("Kondisi jalan wajib dipilih");
            return;
        }

        if (selectedRoadType === "") {
            toast.error("Jenis jalan wajib dipilih");
            return;
        }

        console.log(values);

        setIsLoading(true);
        const {
            roadCode,
            roadName,
            desc,
            width,
        } = values;

        try {
            const payload =
                road
                    ? await editRoad(
                        {
                            kode_ruas: roadCode,
                            nama_ruas: roadName,
                            keterangan: desc,
                            lebar: width,
                            desa_id: Number(selectedDesa),
                            eksisting_id: Number(selectedEksistingRoad),
                            kondisi_id: Number(selectedRoadCondition),
                            jenisjalan_id: Number(selectedRoadType),
                            paths: roadPath,
                            panjang: roadLength,
                        }
                        , roadId!!)
                    : await addRoad({
                        kode_ruas: roadCode,
                        nama_ruas: roadName,
                        keterangan: desc,
                        lebar: width,
                        desa_id: Number(selectedDesa),
                        eksisting_id: Number(selectedEksistingRoad),
                        kondisi_id: Number(selectedRoadCondition),
                        jenisjalan_id: Number(selectedRoadType),
                        paths: roadPath,
                        panjang: roadLength,
                    })

            if (payload.code === 200) {
                toast.success(road ? "Berhasil mengedit jalan" : "Berhasil menambahkan jalan");
                navigate("/road");
            }

        } catch (err: any) {
            const message =
                err.response?.data?.meta?.message || "Terjadi kesalahan tak terduga.";
            toast.error(message);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <p className="font-bold mb-4">Informasi umum</p>
                <FormFields fields={roadField} control={form.control} />
                <FormField
                    key={'width'}
                    control={form.control}
                    name={'width'}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lebar Jalan</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type={'number'}
                                    value={field.value ?? ""}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormItem>

                    <FormLabel>Panjang Jalan</FormLabel>
                    <Input
                        type={'number'}
                        value={roadLength ?? 0}
                        disabled
                    />
                </FormItem>



                <p className="font-bold my-4">Lokasi Jalan</p>
                <FilterDropdown
                    title="Provinsi"
                    selectedValue={selectedProvinsi}
                    setSelectedValue={setSelectedProvinsi}
                    data={provinsi.map((p) => ({
                        value: p.id.toString(),
                        item: p.provinsi,
                    }))}
                />
                <FilterDropdown
                    title="Kabupaten"
                    selectedValue={selectedKabupaten}
                    setSelectedValue={setSelectedKabupaten}
                    data={kabupaten.map((p) => ({
                        value: p.id.toString(),
                        item: p.kabupaten,
                    }))}
                />
                <FilterDropdown
                    selectedValue={selectedKecamatan}
                    setSelectedValue={setSelectedKecamatan}
                    title="Kecamatan"
                    data={kecamatan.map((p) => ({
                        value: p.id.toString(),
                        item: p.kecamatan,
                    }))}
                />
                <FilterDropdown
                    title="Desa"
                    selectedValue={selectedDesa}
                    setSelectedValue={setSelectedDesa}
                    data={desa.map((p) => ({
                        value: p.id.toString(),
                        item: p.desa,
                    }))}
                />


                <p className="font-bold my-4">Status Jalan</p>
                <FilterDropdown
                    title="Jenis jalan"
                    selectedValue={selectedRoadType}
                    setSelectedValue={setSelectedRoadType}
                    data={roadTypes.map((p) => ({
                        value: p.id.toString(),
                        item: p.jenisjalan,
                    }))}
                />
                <FilterDropdown
                    title="Kondisi jalan"
                    selectedValue={selectedRoadCondition}
                    setSelectedValue={setSelectedRoadCondition}
                    data={roadConditions.map((p) => ({
                        value: p.id.toString(),
                        item: p.kondisi,
                    }))}
                />
                <FilterDropdown
                    title="jalan"
                    selectedValue={selectedEksistingRoad}
                    setSelectedValue={setSelectedEksistingRoad}
                    data={eksistingRoads.map((p) => ({
                        value: p.id.toString(),
                        item: p.eksisting,
                    }))}
                />
                <Button className="w-full sticky bottom-0" type="submit" disabled={isLoading}>
                    {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Simpan
                </Button>
            </form>
        </Form>
    )
}

// <FormField
//     control={form.control}
//     name="roadType"
//     render={({ field }) => (
//         <FormItem>
//             <FormLabel>Lebar Jalan</FormLabel>
//             <FormControl>
//                 {/* <select {...field}>
//                     <option value="">Pilih lebar jalan</option>
//                     <option value="1">1 meter</option>
//                     <option value="2">2 meter</option>
//                     <option value="3">3 meter</option>
//                 </select> */}
//             </FormControl>
//             <FormMessage />
//         </FormItem>
//     )}
// />