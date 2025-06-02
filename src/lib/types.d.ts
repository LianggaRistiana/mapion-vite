type UserData = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select";

type Option = {
  label: string;
  value: string | number;
};

type FieldConfig = {
  name: string;
  label: string;
  placeholder?: string;
  type?: FieldType;
  options?: Option[];
  disabled?: boolean;
};

type Provinsi = {
  id: number;
  provinsi: string;
};

type Kabupaten = {
  id: number;
  prov_id: number;
  kabupaten: string;
};

type Kecamatan = {
  id: number;
  kab_id: number;
  kecamatan: string;
};

type Desa = {
  id: number;
  kec_id: number;
  desa: string;
};

type Roads = {
  id: number;
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

type EksistingRoad = {
  id: number;
  eksisting: string;
};

type RoadCondition = {
  id: number;
  kondisi: string;
};

type RoadType = {
  id: number;
  jenisjalan: string;
};

type RoadStatsContext = {
  // roads: Roads[];
  eksistingRoads: EksistingRoad[];
  roadConditions: RoadCondition[];
  roadTypes: RoadType[];
  setEksistingRoads: (data: EksistingRoad[]) => void;
  setRoadConditions: (data: RoadCondition[]) => void;
  setRoadTypes: (data: RoadType[]) => void;
  selectedEksistingRoad: string;
  setSelectedEksistingRoad: (eksistingRoad: string) => void;
  selectedRoadCondition: string;
  setSelectedRoadCondition: (roadCondition: string) => void;
  selectedRoadType: string;
  setSelectedRoadType: (roadType: string) => void;
  roadLength: number;
  setRoadLength: (length: number) => void;
  roadPath: string;
  setRoadPath: (path: string) => void;

  getRoadConditionById: (id: number) => string;
  getRoadTypeById: (id: number) => string;
  getEksistingRoadById: (id: number) => string;
}


type RegionContext = {
  provinsi: Provinsi[];
  kabupaten: Kabupaten[];
  kecamatan: Kecamatan[];
  desa: Desa[];
  setProvinsi: (data: Provinsi[]) => void;
  setKabupaten: (data: Kabupaten[]) => void;
  setKecamatan: (data: Kecamatan[]) => void;
  setDesa: (data: Desa[]) => void;

  selectedProvinsi: string;
  setSelectedProvinsi: (provinsi: string) => void;

  selectedKabupaten: string;
  setSelectedKabupaten: (kabupaten: string) => void;

  selectedKecamatan: string;
  setSelectedKecamatan: (kecamatan: string) => void;

  selectedDesa: string;
  setSelectedDesa: (desa: string) => void;

  getKabupatenByProvinsi: (provinsiId: string) => Kabupaten[];
  getKecamatanByKabupaten: (kabupatenId: string) => Kecamatan[];
  getDesaByKecamatan: (kecamatanId: string) => Desa[];
  
  getDesaById: (desaId: string) => string;
};
