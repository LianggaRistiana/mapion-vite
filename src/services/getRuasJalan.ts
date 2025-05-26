import apiClient from "@/lib/apiClient";

type RoadsResponse = {
  code: number;
  user: UserData;
  status: string;
  ruasjalan: Roads[];
};

export const getRoads = async (): Promise<RoadsResponse> => {
  const res = await apiClient.get<RoadsResponse>("/ruasjalan");
  return res.data;
};