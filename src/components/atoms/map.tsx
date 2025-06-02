import { MapContainer, TileLayer, Polyline, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import polyline from '@mapbox/polyline';
import GeomanControls from './geoman-editor';

type Props = {
  isEditing?: boolean;
  roads: Roads[];
};


export default function Map({ isEditing, roads }: Props) {
  const polylineColor = (type: string): string => {
    if (type === '1') return "green";
    if (type === '2') return "blue";
    if (type === '3') return "red";
    return "blue";
  }

  const getDashArray = (jenisJalanId: number): string | undefined => {
  switch (jenisJalanId) {
    case 1: 
      return "0"; 
    case 2: 
      return "10 5"; 
    case 3: 
      return "1 5"; 
    default:
      return undefined; 
  }
}




  return (
    <MapContainer
      center={[-8.782802, 115.178150]}
      zoom={13}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}
    >

      {/* <MapView center={center} /> */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {roads?.map((road) => {
        const decoded = polyline.decode(road.paths);
        return (
          <Polyline
            key={road.id}
            positions={decoded}
            color={polylineColor(road.jenisjalan_id.toString())}
            weight={road.jenisjalan_id * 2.5}
            dashArray={getDashArray(road.kondisi_id)}
            >
            <Popup>{road.nama_ruas}</Popup>
          </Polyline>
        );
      })}

      {
        isEditing &&
        <GeomanControls />
      }




    </MapContainer>
  );
}
