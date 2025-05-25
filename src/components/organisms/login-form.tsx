import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoaderCircle } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "sonner"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { login } from '@/services/loginService'
import { loginSchema } from "@/lib/schema";
import FormFields from "../molecules/form-fields";


export default function LoginForm() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const loginFields: FieldConfig[] = [
        { name: "email", label: "Email", placeholder: "email@example.com", type: "email" },
        { name: "password", label: "Password", placeholder: "password anda", type: "password" },
    ]

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        const { email, password } = values
        setIsLoading(true)

        try {
            const payload = await login({ email, password })
            if (payload.meta.code === 200 && payload.meta.token) {
                localStorage.setItem('token', payload.meta.token)
                toast.success(payload.meta.message || 'Login berhasil!')
                navigate('/home')
            } else {
                throw new Error(payload.meta.message || 'Login gagal, coba lagi.')
            }
        } catch (err: any) {
            const message =
                err.response?.data?.meta?.message || "Terjadi kesalahan tak terduga.";
            toast.error(message);
        }
        finally {
            setIsLoading(false)
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormFields fields={loginFields} control={form.control} />
                <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Login
                </Button>
            </form>
        </Form>
    )
}