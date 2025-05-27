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

export const addRoad = async (data: RoadRequest): Promise<RoadResponse> => {
  const res = await apiClient.post<RoadResponse>("/ruasjalan", data, {
    headers: {
      Authorization: "",
    },
  });
  return res.data;
};
