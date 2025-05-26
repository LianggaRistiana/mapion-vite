import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";

type Data = {
    item: string;
    value: string;
};

type Props = {
    title: string;
    selectedValue: string;
    setSelectedValue: (value: string) => void;
    data: Data[];
};


export default function FilterDropdown({ data, title, selectedValue, setSelectedValue }: Props) {

    const handleChange = (value: string) => {
        if (value === "__clear__") {
            setSelectedValue("");
            console.log("Pilihan dihapus");
        } else {
            setSelectedValue(value);
            console.log("Yang dipilih:", value);
        }
    };

    return (
        <Select value={selectedValue} onValueChange={handleChange}>
            <SelectTrigger className="w-fit bg-background">
                <SelectValue placeholder={title} />
            </SelectTrigger>
            <SelectContent>
                {
                    selectedValue &&
                    <SelectItem value="__clear__" className="font-bold"> <Trash2 />Hapus pilihan</SelectItem>
                }
                {data.length === 0 ? (
                    <SelectItem value="__clear__" disabled>
                        Tidak ada data
                    </SelectItem>
                ) : (
                    data.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.item}
                        </SelectItem>
                    ))
                )}
            </SelectContent>
        </Select>
    );
}
