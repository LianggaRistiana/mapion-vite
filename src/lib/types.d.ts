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

type RegionContext = {
  provinsi: Provinsi[];
  kabupaten: Kabupaten[];
  kecamatan: Kecamatan[];
  desa: Desa[];
  setProvinsi: (data: Provinsi[]) => void;
  setKabupaten: (data: Kabupaten[]) => void;
  setKecamatan: (data: Kecamatan[]) => void;
  setDesa: (data: Desa[]) => void;
};
