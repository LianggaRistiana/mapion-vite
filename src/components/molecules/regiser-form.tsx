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


// Tipe umum untuk struktur meta
type MetaSuccess = {
    code: 200;
    message: string;
    data: {
        id: number;
        name: string;
        email: string;
        created_at: string;
        updated_at: string;
    };
};

type MetaError = {
    code: 200;
    status: 'failed';
    message: string;
};

// Gabungan response API
export type ApiResponse =
    | {
        meta: MetaSuccess;
    }
    | {
        meta: MetaError;
    };


const registerSchema = z.object({
    name: z
        .string({
            required_error: "Nama wajib diisi"
        })
        .min(6, { message: "Nama minimal 6 karakter" }),
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

export default function RegisterForm() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)



    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }

    })


    const onSubmit = async (values: z.infer<typeof registerSchema>) => {
        const { name, email, password } = values;
        setIsLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const payload: ApiResponse = await res.json();

            if (res.ok && payload.meta.code === 200 && !("status" in payload.meta)) {
                toast.success(payload.meta.message || "Register berhasil!");
                navigate("/login");
                return;
            }

            // Jika ada status "failed" atau kondisi lain yang dianggap gagal
            throw new Error(payload.meta.message || "Registrasi gagal, coba lagi.");
        } catch (err: any) {
            toast.error(err.message ?? "Terjadi kesalahan tak terduga.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama</FormLabel>
                            <FormControl>
                                <Input placeholder="guest" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                    Register
                </Button>
            </form>
        </Form>
    )
}