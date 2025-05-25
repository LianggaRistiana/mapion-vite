import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoaderCircle } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "sonner"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { register } from '@/services/registerService'
import { registerSchema } from "@/lib/schema";
import FormFields from "../molecules/form-fields";

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

    const registerFields: FieldConfig[] = [
        { name: "name", label: "Nama", placeholder: "guest" },
        { name: "email", label: "Email", placeholder: "email@example.com", type: "email" },
        { name: "password", label: "Password", placeholder: "password anda", type: "password" },
    ]

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {
        const { name, email, password } = values
        setIsLoading(true)

        try {
            const payload = await register({ name, email, password })

            if (payload.meta.code === 200 && !('status' in payload.meta)) {
                toast.success(payload.meta.message || 'Register berhasil!')
                navigate('/login')
                return
            }

            throw new Error(payload.meta.message || 'Registrasi gagal, coba lagi.')
        } catch (err: any) {
            toast.error(err.message ?? 'Terjadi kesalahan tak terduga.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormFields fields={registerFields} control={form.control} />
                <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Register
                </Button>
            </form>
        </Form>
    )
}