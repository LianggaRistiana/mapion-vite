import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({
      required_error: "Nama wajib diisi",
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
});

export const RoadSchema = z.object({
  roadName: z.string({
    required_error: "Nama jalan wajib diisi",
  }),
  desc: z.string({
    required_error: "Keterangan jalan wajib diisi",
  }),
  width: z.number({
    required_error: "Lebar jalan wajib diisi",
  }),
//   roadType: z.string({
//     required_error: "Tipe jalan wajib diisi",
//   }),
//   roadCondition: z.string({
//     required_error: "Kondisi jalan wajib diisi",
//   }),
//   eksistingRoad: z.string({
//     required_error: "Jalan yang sudah ada wajib diisi",
//   }),
  roadCode: z.string({
    required_error: "Kode jalan wajib diisi",
  }),
});
