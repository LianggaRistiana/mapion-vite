import { MapContainer, TileLayer, Polyline, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import polyline from '@mapbox/polyline';


const ruasjalan = [
  {
    id: 3418,
    paths: "l`is@asr~T@UHiAZyCD_D",
    nama_ruas: "Contoh Ruas Jalan 1",
  },
  {
    id: 3419,
    paths: "t`is@ytq~T@SBa@Ru@", // Contoh path lain
    nama_ruas: "Contoh Ruas Jalan 2",
  },
];



export default function Map() {
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

      {ruasjalan.map((ruas) => {
        const decoded = polyline.decode(ruas.paths);
        return (
          <Polyline key={ruas.id} positions={decoded} color="blue">
            <Popup>{ruas.nama_ruas}</Popup>
          </Polyline>
        );
      })}
    </MapContainer>
  );
}
