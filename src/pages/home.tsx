import AddRoadButton from "@/components/atoms/add-road-button";
import Map from "@/components/atoms/map";
import MenuSheet from "@/components/organisms/menu-sheet";

export default function Home() {
    return (
        <div className="h-screen flex flex-col">
            <MenuSheet />
            <div className="flex-1 relative z-0 overflow-hidden">
                <Map />
            </div>
            <div className="absolute z-1 bottom-6 right-4">
                <AddRoadButton />
            </div>
        </div>
    )
}
