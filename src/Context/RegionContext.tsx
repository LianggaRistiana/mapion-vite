import { createContext, type ReactNode, useState } from 'react';

export const RegionContext = createContext<RegionContext | undefined>(undefined);

export function RegionProvider({ children }: { children: ReactNode }) {
  const [provinsi, setProvinsi] = useState<Provinsi[]>([]);
  const [kabupaten, setKabupaten] = useState<Kabupaten[]>([]);
  const [kecamatan, setKecamatan] = useState<Kecamatan[]>([]);
  const [desa, setDesa] = useState<Desa[]>([]);

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
      }}
    >
      {children}
    </RegionContext.Provider>
  );
}
