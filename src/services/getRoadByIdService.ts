import apiClient from "@/lib/apiClient";

type RoadResponse = {
  code: number;
  ruasjalan: Roads;
};

export const getRoadById = async (id: number): Promise<RoadResponse> => {
  console.log("Fetch Road");
  const res = await apiClient.get<RoadResponse>("/ruasjalan/" + id);
  return res.data;
};
