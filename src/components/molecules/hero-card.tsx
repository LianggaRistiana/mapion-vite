// import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";


export function HeroCard() {
    const navigate = useNavigate();

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <h1 className="text-6xl text-center font-bold">Mapion</h1>
                        <p className="text-center mt-2 text-muted-foreground ">
                            Cari jalan di bali dengan mudah
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex justify-between gap-2">
                <Button variant="outline" onClick={() => navigate('/register')}>
                    Daftar
                </Button>
                <Button className="flex-1" onClick={() => navigate('/login')}>
                    Masuk
                </Button>
            </CardFooter>
        </Card>
    );
}
