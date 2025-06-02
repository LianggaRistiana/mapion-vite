import { createContext, type ReactNode, useEffect, useState } from 'react';

export const RegionContext = createContext<RegionContext | undefined>(undefined);

export function RegionProvider({ children }: { children: ReactNode }) {
  const [provinsi, setProvinsi] = useState<Provinsi[]>([]);
  const [kabupaten, setKabupaten] = useState<Kabupaten[]>([]);
  const [kecamatan, setKecamatan] = useState<Kecamatan[]>([]);
  const [desa, setDesa] = useState<Desa[]>([]);

  // Region terpilih
  const [selectedProvinsi, setSelectedProvinsi] = useState<string>("");
  const [selectedKabupaten, setSelectedKabupaten] = useState<string>("");
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>("");
  const [selectedDesa, setSelectedDesa] = useState<string>("");

  useEffect(() => {
    // Reset pilihan ketika provinsi berubah
    setSelectedKabupaten("");
    setSelectedKecamatan("");
    setSelectedDesa("");
  }, [selectedProvinsi]);

  useEffect(() => {
    // Reset pilihan ketika kabupaten berubah
    setSelectedKecamatan("");
    setSelectedDesa("");
  }, [selectedKabupaten]);

  useEffect(() => {
    // Reset pilihan ketika kecamatan berubah
    setSelectedDesa("");
  }, [selectedKecamatan]);


  // Fungsi filter kabupaten berdasarkan provinsi id
  function getKabupatenByProvinsi(provinsiId: string): Kabupaten[] {
    if (!provinsiId) return [];
    return kabupaten.filter(kab => kab.prov_id === Number(provinsiId));
  }


  // Fungsi filter kecamatan berdasarkan kabupaten id
  const getKecamatanByKabupaten = (kabupatenId: string): Kecamatan[] => {
    if (!kabupatenId) return [];
    return kecamatan.filter(kec => kec.kab_id === Number(kabupatenId));
  };

  // Fungsi filter desa berdasarkan kecamatan id
  const getDesaByKecamatan = (kecamatanId: string): Desa[] => {
    if (!kecamatanId) return [];
    return desa.filter(d => d.kec_id === Number(kecamatanId));
  };

  const getDesaById = (desaId: string): string => {
    const id = Number(desaId);
    if (isNaN(id)) return "Tidak ada desa";
    return desa.find(d => d.id === id)?.desa || "Tidak ada desa";
  }



  return (
    <RegionContext.Provider
      value={{
        provinsi,
        kabupaten,
        kecamatan,
        desa,
        setProvinsi,
        setKabupaten,
        setKecamatan,
        setDesa,
        selectedProvinsi,
        setSelectedProvinsi,
        selectedKabupaten,
        setSelectedKabupaten,
        selectedKecamatan,
        setSelectedKecamatan,
        selectedDesa,
        setSelectedDesa,
        getKabupatenByProvinsi,
        getKecamatanByKabupaten,
        getDesaByKecamatan,
        getDesaById
      }}
    >
      {children}
    </RegionContext.Provider>
  );
}
