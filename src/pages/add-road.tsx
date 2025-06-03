import Map from "@/components/atoms/map";
import RoadForm from "@/components/organisms/road-form";
import { useRoadStats } from "@/hooks/use-road-stats";
import MainLayout from "@/layouts/main-layout";
import { ScrollArea } from "@/components/ui/scroll-area"
import useInitialFetch from "@/hooks/use-initial-fetch";

export default function AddRoad() {
    const { roadLength } = useRoadStats();

    useInitialFetch();

    return <MainLayout>
        <div className="h-full grid grid-cols-[1fr_2fr] ">
            <div className="grid grid-cols-1 h-fit gap-4 px-4">
                <p className="font-bold text-lg">Tambah Jalan</p>
                <ScrollArea className="h-[80vh] w-full rounded-md border p-4 relative">
                    <RoadForm></RoadForm>
                </ScrollArea>
            </div>
            <div className="w-full h-full relative">
                <div className="absolute top-6 left-6 p-2 rounded-md bg-background shadow-md z-[9999]">
                    <p className="font-bold">{Math.ceil(roadLength)} meter</p>
                </div>
                <Map isEditing roads={[]}></Map>
            </div>
        </div>
    </MainLayout>
}