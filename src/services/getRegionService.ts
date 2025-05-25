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
  const res = await apiClient.post<RegionResponse>("/mregion");
  return res.data;
};
