import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { AlignJustify } from "lucide-react"
import ListTypeRoad from "../molecules/list-type-road"
import ListRegion from "../molecules/list-region"
import { ScrollArea } from "../ui/scroll-area"


export default function MenuSheet() {
    return (
        <Sheet >
            <SheetTrigger>
                <Button className="absolute top-4 left-4 rounded-full z-1" size={'icon'}>
                    <AlignJustify></AlignJustify>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle className="font-bold">Mapion</SheetTitle>

                    <ScrollArea className="w-full h-[750px] relative">
                        <p className="font-bold text-lg sticky top-0 bg-background">Daerah</p>
                        <ListRegion />

                        <p className="font-bold text-lg mt-4">Jenis jalan</p>
                        <ListTypeRoad />
                    </ScrollArea>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}