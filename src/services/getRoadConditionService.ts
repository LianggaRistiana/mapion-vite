import apiClient from "@/lib/apiClient";

type RoadConditionResponse = {
  eksisting: RoadCondition[];
};

export const getRoadCondition = async (): Promise<RoadConditionResponse> => {
  const res = await apiClient.get<RoadConditionResponse>("/mkondisi");
  return res.data;
};
