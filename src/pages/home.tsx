import AddRoadButton from "@/components/atoms/add-road-button";
import Map from "@/components/atoms/map";
import ProfileButton from "@/components/atoms/profile-button";
import AddRoadForm from "@/components/molecules/add-road-form";
import MenuSheet from "@/components/organisms/menu-sheet";
import { useState } from "react";

export default function Home() {
    const [isAddMode, setIsAddMode] = useState(false);


    return (
        <div className="h-screen flex flex-col">
            <MenuSheet />
            <div className="flex-1 relative z-0 overflow-hidden">
                <Map />
            </div>
            <div className="absolute z-1 bottom-6 right-4">
                <AddRoadButton isShowed={!isAddMode} onClick={() => setIsAddMode(true)} />
            </div>

            <AddRoadForm isShowed={isAddMode} onClose={() => setIsAddMode(false)} />
            <div className="absolute z-1 top-4 right-4">
                <ProfileButton />
            </div>
        </div>
    )
}
