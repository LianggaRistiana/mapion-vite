import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoaderCircle } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useState } from "react"
import { useNavigate } from "react-router-dom";


type ApiResponse = {
    meta: {
        code: number
        message: string
        token?: string
        "token-expired"?: number
    }
}


export const loginSchema = z.object({
    email: z
        .string({
            required_error: "Email wajib diisi",
        })
        .email({ message: "Format email tidak valid" }),
    password: z
        .string({
            required_error: "Password wajib diisi",
        })
        .min(6, { message: "Password minimal 6 karakter" }),
})

export default function LoginForm() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    // 1. Define your form.
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        const { email, password } = values
        setIsLoading(true)

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })
            const payload: ApiResponse = await res.json()

            if (res.ok && payload.meta.code === 200 && payload.meta.token) {
                // simpan token; sebaiknya httpOnly cookie, tapi contoh pakai localStorage
                localStorage.setItem("token", payload.meta.token)
                toast.success(payload.meta.message || "Login berhasil!")
                navigate("/") 
                return
            }

            // jika code bukan 200 atau token tidak ada, anggap gagal
            throw new Error(payload.meta.message || "Login gagal, coba lagi.")
        } catch (err: any) {
            toast.error(err.message ?? "Terjadi kesalahan tak terduga.")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="password anda" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Login
                </Button>
            </form>
        </Form>
    )
}