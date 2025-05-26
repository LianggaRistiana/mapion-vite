import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet';
import '@geoman-io/leaflet-geoman-free';

function GeomanControls() {
  const map = useMap();

  useEffect(() => {
    // Tambahkan kontrol Geoman
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

    // Event saat objek dibuat
    map.on('pm:create', (e: any) => {
      const layer = e.layer;
      console.log('Objek baru dibuat:', layer.toGeoJSON());
    });

    return () => {
      map.off('pm:create');
    };
  }, [map]);

  return null;
}

export default GeomanControls;
