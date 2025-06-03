import { useRegion } from "@/hooks/use-region";
import { Button } from "../ui/button";
import { MapPin, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";


type Props = {
    road: Roads | null
    onClose: () => void,
}


export default function ({ road, onClose }: Props) {
    const {
        getDesaById
    } = useRegion();
    return <AnimatePresence>
        {
            road && <motion.div
                className="absolute bottom-4 left-4 right-4 border p-2 rounded-md bg-background shadow-md z-[1] flex justify-between items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
            >
                <div className="flex flex-col gap-1">
                    <div className="flex gap-1 items-center">
                        <p className="font-bold"> {road.nama_ruas} ({Math.ceil(road.panjang)} meter)</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <MapPin className="h-4 w-4" />
                        <p className="text-sm"> {getDesaById(road.desa_id.toString())}</p>
                    </div>
                </div>
                <Button className="" variant={"destructive"} onClick={onClose} size={'icon'}>
                    <X className="h-4 w-4" />
                </Button>

            </motion.div>
        }
    </AnimatePresence>

    // <div className="absolute bottom-4 left-4 right-4 border p-2 rounded-md bg-background shadow-md z-[1] flex justify-between items-center">
    //     <div>
    //         <p className="font-bold"> {road.nama_ruas}</p>
    //         <p className="text-sm"> {getDesaById(road.desa_id.toString())}</p>
    //     </div>
    //     <Button className="" variant={"destructive"} onClick={onClose} size={'icon'}>
    //         <X className="h-4 w-4" />
    //     </Button>
    // </div>
}