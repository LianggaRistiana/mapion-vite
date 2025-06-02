// import { useRegion } from "@/hooks/use-region";
// import { getRegion } from "@/services/getRegionService";
// import { toast } from "sonner";

// export function intialFetch() {
//   const { setProvinsi, setKabupaten, setKecamatan, setDesa, provinsi } = useRegion();

//   const fetchRegion = async () => {
//     try {
//       const payload = await getRegion();
//       setProvinsi(payload.provinsi);
//       setKabupaten(payload.kabupaten);
//       setKecamatan(payload.kecamatan);
//       setDesa(payload.desa);
//     } catch (err: any) {
//       console.log(err);
//       const message =
//         err.response?.data?.meta?.message || "Terjadi kesalahan tak terduga.";
//       toast.error(message);
//     }
//   };

//   if (provinsi.length === 0) {
//     fetchRegion();
//   }
// }
