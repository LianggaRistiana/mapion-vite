// components/MapFocus.tsx
import { useMap } from "react-leaflet";
import type { LatLngExpression, LatLngBoundsExpression } from "leaflet";
import { useEffect } from "react";

type Props = {
    positions: LatLngExpression[];
};

export default function MapFocus({ positions }: Props) {
    const map = useMap();

    // flyToBounds
    useEffect(() => {
        if (positions.length > 0) {
            map.flyToBounds(positions as LatLngBoundsExpression, {
                padding: [20, 20],
                animate: true,
                duration: 1, // Durasi animasi dalam detik
            });
        }
    }, [positions, map]);

    return null;
}
