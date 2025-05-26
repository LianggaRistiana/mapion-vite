import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { AnimatePresence, motion } from "motion/react"
interface Props {
    isShowed: boolean,
    onClose: () => void
}

export default function AddRoadForm({ isShowed, onClose }: Props) {
    return (
        <AnimatePresence>
            {
                isShowed && <motion.div
                    className="absolute z-1 top-16 right-4"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                >
                    <Card className="w-[350px]">
                        <CardContent>
                            <CardHeader>
                                <h1 className="text-sm text-center font-bold">Tambah Jalan</h1>
                            </CardHeader>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant={'outline'} onClick={onClose}>
                                Batal
                            </Button>
                            <Button >
                                Simpan
                            </Button>
                        </CardFooter>
                    </Card>

                </motion.div>
            }
        </AnimatePresence>
    )
}

