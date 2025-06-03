import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import { useRoadStats } from '@/hooks/use-road-stats';
import polyline from '@mapbox/polyline';

type Props = {
  oldRoad?: string;
};

function GeomanControls({ oldRoad }: Props) {
  const map = useMap();
  const currentLayerRef = useRef<L.Polyline | null>(null);
  const drawnItemsRef = useRef<L.FeatureGroup>(L.featureGroup());

  const { setRoadLength, setRoadPath } = useRoadStats();

  useEffect(() => {
    const featureGroup = drawnItemsRef.current;
    featureGroup.addTo(map);

    (map as any).pm.setGlobalOptions({ layerGroup: featureGroup });

    map.pm.addControls({
      position: 'topright',
      drawCircle: false,
      drawMarker: false,
      drawPolygon: false,
      drawPolyline: true,
      drawRectangle: false,
      drawCircleMarker: false,
      editMode: true,
      dragMode: false,
      cutPolygon: false,
      removalMode: false,
      rotateMode: false,
      drawText: false,
    });

    const updateStatsFromLayer = (layer: L.Polyline) => {
      const latlngsRaw = layer.getLatLngs();
      let latlngs: L.LatLng[] = Array.isArray(latlngsRaw[0])
        ? (latlngsRaw[0] as L.LatLng[])
        : (latlngsRaw as L.LatLng[]);

      if (latlngs.length < 2) return;

      let length = 0;
      for (let i = 0; i < latlngs.length - 1; i++) {
        length += map.distance(latlngs[i], latlngs[i + 1]);
      }

      setRoadLength(length);

      const encoded = polyline.encode(
        latlngs.map((latlng) => [latlng.lat, latlng.lng])
      );
      setRoadPath(encoded);

      console.log('[UPDATE] Polyline:', latlngs);
      console.log('[UPDATE] Length:', length.toFixed(2), 'meters');
      console.log('[UPDATE] Encoded path:', encoded);
    };

    const onDrawStart = () => {
      if (currentLayerRef.current) {
        setRoadLength(0);
        featureGroup.removeLayer(currentLayerRef.current);
        currentLayerRef.current = null;
      }
    };

    const onCreate = (e: any) => {
      const layer = e.layer as L.Polyline;
      currentLayerRef.current = layer;

      featureGroup.addLayer(layer);

      layer.on('pm:update', () => updateStatsFromLayer(layer));
      layer.on('pm:edit', () => updateStatsFromLayer(layer));

      updateStatsFromLayer(layer);
    };

    map.on('pm:drawstart', onDrawStart);
    map.on('pm:create', onCreate);

    // Jika ada oldRoad, update layer yang sudah ada atau buat jika belum ada
    if (oldRoad) {
      const decoded = polyline.decode(oldRoad);
      const latlngs = decoded.map(([lat, lng]) => L.latLng(lat, lng));

      if (currentLayerRef.current) {
        currentLayerRef.current.setLatLngs(latlngs);
        updateStatsFromLayer(currentLayerRef.current);
      } else {
        const existing = L.polyline(latlngs, { color: 'blue' });
        currentLayerRef.current = existing;
        featureGroup.addLayer(existing);

        existing.on('pm:update', () => updateStatsFromLayer(existing));
        existing.on('pm:edit', () => updateStatsFromLayer(existing));

        updateStatsFromLayer(existing);
      }
    }

    return () => {
      map.off('pm:drawstart', onDrawStart);
      map.off('pm:create', onCreate);
      map.removeLayer(featureGroup);
      map.pm.removeControls();
    };
  }, [map, setRoadLength, setRoadPath, oldRoad]);

  return null;
}

export default GeomanControls;
