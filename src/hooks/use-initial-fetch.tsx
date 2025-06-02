// hooks/useInitialFetch.ts
import { useEffect } from "react";
import { useRegion } from "@/hooks/use-region";
import { getRegion } from "@/services/getRegionService";
import { toast } from "sonner";
import { useRoadStats } from "./use-road-stats";
import { getRoadType } from "@/services/getRoadTypeService";
import { getRoadCondition } from "@/services/getRoadConditionService";
import { getEksistingRoad } from "@/services/getEksistingRoad";

export default function useInitialFetch() {
  const {
    setProvinsi,
    setKabupaten,
    setKecamatan,
    setDesa,
    provinsi
  } = useRegion();

  const {
    roadTypes,
    roadConditions,
    eksistingRoads,
    setRoadTypes,
    setRoadConditions,
    setEksistingRoads,
  } = useRoadStats();

  const fetchRegion = async () => {
    try {
      const payload = await getRegion();
      setProvinsi(payload.provinsi);
      setKabupaten(payload.kabupaten);
      setKecamatan(payload.kecamatan);
      setDesa(payload.desa);
    } catch (err: any) {
      const message =
        err.response?.data?.meta?.message || "Terjadi kesalahan tak terduga.";
      toast.error(message);
    }
  };

  const fetchRoadType = async () => {
    try {
      const roadTypes = await getRoadType();
      // console.log(roadType);
      setRoadTypes(roadTypes.eksisting);
    } catch (err: any) {
      console.log(err);
      const message =
        err.response?.data?.meta?.message || "Terjadi kesalahan tak terduga.";
      toast.error(message);
    }
  }

  const fetchRoadCondition = async () => {
    try {
      const roadConditions = await getRoadCondition();
      // console.log(roadConditions);
      setRoadConditions(roadConditions.eksisting);
    } catch (err: any) {
      console.log(err);
      const message =
        err.response?.data?.meta?.message || "Terjadi kesalahan tak terduga.";
      toast.error(message);
    }
  }
  const fetchEksistingRoad = async () => {
    try {
      const eksistingRoads = await getEksistingRoad();
      // console.log(roadType);
      setEksistingRoads(eksistingRoads.eksisting)
    } catch (err: any) {
      console.log(err);
      const message =
        err.response?.data?.meta?.message || "Terjadi kesalahan tak terduga.";
      toast.error(message);
    }
  }

  useEffect(() => {
    if (provinsi.length === 0) fetchRegion();
    if (roadTypes.length === 0) fetchRoadType();
    if (roadConditions.length === 0) fetchRoadCondition();
    if (eksistingRoads.length === 0) fetchEksistingRoad();
  }, []);
}
