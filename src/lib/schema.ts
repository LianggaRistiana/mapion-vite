import { z } from "zod";

export const registerSchema = z.object({
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
});

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

