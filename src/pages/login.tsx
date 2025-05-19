import LoginForm from "@/components/molecules/login-form";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen md:gap-6 px-4">
            <Card className="w-[350px]">
                <CardHeader>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <h1 className="text-6xl text-center font-bold">Login</h1>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
            <div className="text-muted-foreground text-center text-sm">
                Tidak punya akun?{' '}
                <Link to={'/'}>
                    Daftar
                </Link>
            </div>
        </div>
    )
}