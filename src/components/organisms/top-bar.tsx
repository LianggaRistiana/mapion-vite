import { useRegion } from "@/hooks/use-region";
import FilterButton from "../atoms/filter-button";


export default function TopBar() {
    const { provinsi, kabupaten, kecamatan, desa } = useRegion();

    return (
        <div className="absolute z-1 top-4 flex gap-4 px-8">
            <FilterButton onClick={() => { }} isSelected={false} >
                {`( ${provinsi.length.toString()} ) Provinsi`}
            </FilterButton>
            <FilterButton onClick={() => { }} isSelected={false} >
                {`( ${kabupaten.length.toString()} ) Kabupaten`}
            </FilterButton>
            <FilterButton onClick={() => { }} isSelected={false} >
                {`( ${kecamatan.length.toString()} ) Kecamatan`}
            </FilterButton>
            <FilterButton onClick={() => { }} isSelected={false} >
                {`( ${desa.length.toString()} ) Desa`}
            </FilterButton>
        </div>
    );
}