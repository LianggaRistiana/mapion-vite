import apiClient from "@/lib/apiClient";

type deleteRoadResponse = {
  code: number;
  status: string;
  message: string;
};

export const deleteRoad = async (id: number): Promise<deleteRoadResponse> => {
  const res = await apiClient.delete<deleteRoadResponse>("/ruasjalan/" + id);
  return res.data;
};
