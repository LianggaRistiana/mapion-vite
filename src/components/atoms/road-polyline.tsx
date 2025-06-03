// components/RoadPolyline.tsx
import { Polyline } from "react-leaflet";
import polyline from "@mapbox/polyline";
import { useEffect, useRef, useState } from "react";


type Props = {
    road: Roads;
    isSelected: boolean;
    onPathClick?: (road: Roads) => void;
};

export default function RoadPolyline({ road, isSelected, onPathClick }: Props) {
    const decoded = polyline.decode(road.paths);
    if (!decoded || decoded.length === 0) return null;
    // const positionForPopup = decoded[Math.floor(decoded.length / 2)];


    const polylineColor = (type: number): string => {
        if (type === 1) return "green";
        if (type === 2) return "blue";
        if (type === 3) return "red";
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

    const [blinkColor, setBlinkColor] = useState(polylineColor(road.jenisjalan_id));
    const polylineRef = useRef<L.Polyline>(null);


    useEffect(() => {
        if (isSelected) {
            const baseColor = polylineColor(road.jenisjalan_id);
            const interval = setInterval(() => {
                setBlinkColor((prev) => (prev === baseColor ? "black" : baseColor));
            }, 800);
            return () => clearInterval(interval); // Bersihkan interval saat komponen unmount atau isSelected berubah
        } else {
            setBlinkColor(polylineColor(road.jenisjalan_id)); // Kembalikan ke warna asli
        }
    }, [isSelected, road.jenisjalan_id]);

    useEffect(() => {
        if (polylineRef.current) {
            polylineRef.current.setStyle({
                color: blinkColor

            });
            const pathElement = polylineRef.current.getElement() as SVGPathElement | null;
            if (pathElement) {
                pathElement.style.transition = "stroke 0.4s ease-in-out"; // Match Tailwind duration-400
            }
            // console.log("Updating Polyline color to:", blinkColor);
        }
    }, [blinkColor]);

    return (
        <>
            <Polyline
                ref={polylineRef}
                positions={decoded}
                color={blinkColor}
                weight={road.jenisjalan_id * 2.5}
                dashArray={getDashArray(road.kondisi_id)}
                eventHandlers={{
                    click: () => onPathClick?.(road)
                }}
            // className="transition-stroke duration-400 ease-in-out"
            >
            </Polyline>

        </>
    );
}
