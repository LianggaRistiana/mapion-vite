import apiClient from "@/lib/apiClient";

type RoadRequest = {
  paths: string;
  desa_id: number;
  kode_ruas: string;
  nama_ruas: string;
  panjang: number;
  lebar: number;
  eksisting_id: number;
  kondisi_id: number;
  jenisjalan_id: number;
  keterangan: string;
};

type RoadResponse = {
  code: number;
  status: string;
};

export const editRoad = async (
  data: RoadRequest,
  id: number
): Promise<RoadResponse> => {
  console.log(data);
  const res = await apiClient.put<RoadResponse>("/ruasjalan/" + id, data);
  return res.data;
};
