import { MapContainer, TileLayer, Polyline, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import polyline from '@mapbox/polyline';
import GeomanControls from './geoman-editor';

type Props = {
  isEditing?: boolean;
  roads: Roads[];
};


export default function Map({ isEditing, roads }: Props) {
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
          <Polyline key={road.id} positions={decoded} color="blue">
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
