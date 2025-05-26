import { useRegion } from "@/hooks/use-region";
import FilterDropdown from "../molecules/filter-dropdown";

export default function TopBar() {
    const {
        provinsi,
        selectedProvinsi,
        selectedKabupaten,
        selectedKecamatan,
        selectedDesa,
        setSelectedProvinsi,
        setSelectedKabupaten,
        setSelectedKecamatan,
        setSelectedDesa,
        getKabupatenByProvinsi,
        getKecamatanByKabupaten,
        getDesaByKecamatan
    } = useRegion();

    const kabupaten = getKabupatenByProvinsi(selectedProvinsi);
    const kecamatan = getKecamatanByKabupaten(selectedKabupaten);
    const desa = getDesaByKecamatan(selectedKecamatan);
    return (
        <div className="absolute z-1 top-4 flex gap-4 px-8">
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
        </div>
    );
}