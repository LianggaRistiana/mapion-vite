import apiClient from "@/lib/apiClient";

type RegionResponse = {
  code: number;
  status: string;
  provinsi: Provinsi[];
  kabupaten: Kabupaten[];
  kecamatan: Kecamatan[];
  desa: Desa[];
};

export const getRegion = async (): Promise<RegionResponse> => {
  console.log("Fetch Region");
  const res = await apiClient.get<RegionResponse>("/mregion");
  return res.data;
};
