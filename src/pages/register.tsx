import RegisterForm from "@/components/organisms/regiser-form";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen md:gap-6 px-4">
            <Card className="w-[350px]">
                <CardHeader>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <h1 className="text-6xl text-center font-bold">Daftar</h1>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
            </Card>
            <div className="text-muted-foreground text-center text-sm">
                Sudah punya akun?{' '}
                <Link to={'/login'}>
                    Masuk
                </Link>
            </div>
        </div>
    )
}