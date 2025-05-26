import apiClient from "@/lib/apiClient";

type EksistingRoadResponse = {
  eksisting: EksistingRoad[];
};

export const getEksistingRoad = async (): Promise<EksistingRoadResponse> => {
  const res = await apiClient.get<EksistingRoadResponse>("/meksisting");
  return res.data;
};
