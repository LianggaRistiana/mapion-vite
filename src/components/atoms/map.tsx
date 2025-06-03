import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import polyline from '@mapbox/polyline';
import GeomanControls from './geoman-editor';
import MapFocus from './map-focus';
import RoadPolyline from './road-polyline';

type Props = {
  isEditing?: boolean;
  oldRoad?: string;
  roads: Roads[];
  selectedRoad?: Roads | null;
  onPathClick?: (road: Roads) => void;
};


export default function Map({ isEditing, roads, selectedRoad, onPathClick, oldRoad }: Props) {

  // const polylineColor = (type: string): string => {
  //   if (type === '1') return "green";
  //   if (type === '2') return "blue";
  //   if (type === '3') return "red";
  //   return "blue";
  // }

  // const getDashArray = (jenisJalanId: number): string | undefined => {
  //   switch (jenisJalanId) {
  //     case 1:
  //       return "0";
  //     case 2:
  //       return "10 5";
  //     case 3:
  //       return "1 5";
  //     default:
  //       return undefined;
  //   }
  // }

  return (
    <MapContainer
      center={[-8.782802, 115.178150]}
      zoom={13}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}
      className='z-0'
    >

      {/* <MapView center={center} /> */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {roads.map((road) => (
        <RoadPolyline
          key={road.id}
          road={road}
          isSelected={road.id === selectedRoad?.id}
          onPathClick={onPathClick}
        />
      ))}

      {/* {roads?.map((road) => {
        const decoded = polyline.decode(road.paths);
        
        return (
          <Polyline
            key={road.id}
            positions={decoded}
            color={polylineColor(road.jenisjalan_id.toString())}
            weight={road.jenisjalan_id * 2.5}
            dashArray={getDashArray(road.kondisi_id)}
          >
            <Popup >
              <div>
                <p className="font-bold">{road.nama_ruas}</p>
                <p className="font-sm opacity-50">{road.keterangan}</p>
              </div>
            </Popup>
          </Polyline>
        );
      })} */}

      {
        isEditing &&
        <GeomanControls oldRoad={oldRoad}/>
      }

      {
        selectedRoad && <>
          <MapFocus positions={polyline.decode(selectedRoad.paths)} />
          {/* <Popup position={polyline.decode(selectedRoad.paths)[polyline.decode(selectedRoad.paths).length/2]}>
            <div>
              <p className="font-bold">{selectedRoad.nama_ruas} aaaaaa</p>
              <p className="text-sm opacity-50">{selectedRoad.keterangan}</p>
            </div>
          </Popup> */}

        </>

      }


      {/* {
        selectedRoad && 
        <Popup position={polyline.decode(selectedRoad.paths)[0]}>
          <div>
            <p className="font-bold">{selectedRoad.nama_ruas} aaaaaa</p>
            <p className="text-sm opacity-50">{selectedRoad.keterangan}</p>
          </div>
        </Popup>
      } */}
    </MapContainer>
  );
}
