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
                    <SheetTitle>Mapion</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>


                    
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}