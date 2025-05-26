import apiClient from "@/lib/apiClient";

type RoadTypeResponse = {
  eksisting: RoadType[];
};

export const getRoadType = async (): Promise<RoadTypeResponse> => {
  const res = await apiClient.get<RoadTypeResponse>("/mjenisjalan");
  return res.data;
};
