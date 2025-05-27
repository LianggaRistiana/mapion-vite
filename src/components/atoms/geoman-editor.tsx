import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import { useRoadStats } from '@/hooks/use-road-stats';
import polyline from '@mapbox/polyline';

function GeomanControls() {
  const map = useMap();
  const {
    setRoadLength,
    setRoadPath
  } = useRoadStats();

  useEffect(() => {
    map.pm.addControls({
      position: 'topright',
      drawCircle: false,
      drawMarker: false,
      drawPolygon: false,
      drawPolyline: true,
      drawRectangle: false,
      drawCircleMarker: false,
      editMode: false,
      dragMode: false,
      cutPolygon: false,
      removalMode: false,
      rotateMode: false,
      drawText: false
    });

    const onCreate = (e: any) => {
      const layer = e.layer;

      if (!layer.getLatLngs) return;

      const latlngs = layer.getLatLngs(); // Array of LatLng

      // Hitung panjang polyline (dalam meter)
      let length = 0;
      for (let i = 0; i < latlngs.length - 1; i++) {
        length += map.distance(latlngs[i], latlngs[i + 1]);
      }

      setRoadLength(length); // simpan panjang

      // Encode polyline
      const encoded = polyline.encode(latlngs.map((latlng: L.LatLng) => [latlng.lat, latlng.lng]));
      setRoadPath(encoded); // simpan path

      console.log('Polyline:', latlngs);
      console.log('Length:', length.toFixed(2), 'meters');
      console.log('Encoded path:', encoded);
    };

    map.on('pm:create', onCreate);

    return () => {
      map.off('pm:create', onCreate);
      map.pm.removeControls();
    };
  }, [map, setRoadLength, setRoadPath]);

  return null;
}

export default GeomanControls;
