// import { Button } from "@/components/ui/button";

import { HeroCard } from "@/components/molecules/hero-card"


export default function Welcome(){
    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-y-4 md:gap-6 px-4">
            <HeroCard />
            <div className="flex flex-row items-center gap-4">
            </div>
        </div>
    )
}