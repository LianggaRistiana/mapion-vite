import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "motion/react";

interface Props {
    isShowed: boolean;
    onClick: () => void;
}

export default function AddRoadButton({ onClick, isShowed }: Props) {
    return (
        <AnimatePresence>
            {
                isShowed && <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                >
                    <Button onClick={onClick}>
                        <PlusIcon />
                        Tambah Ruas Jalan
                    </Button>
                </motion.div>
            }
        </AnimatePresence>
    )
}