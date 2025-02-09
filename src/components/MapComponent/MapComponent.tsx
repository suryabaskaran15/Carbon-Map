import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import "./MapComponent.css";

interface HeatmapData {
  lat: number;
  lng: number;
  intensity: number;
}

interface MapComponentProps {
  heatmapData: HeatmapData[];
}

const HeatmapLayer: React.FC<{ data: HeatmapData[] }> = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (data.length > 0) {
      const heatmapPoints = data.map((point) => [
        point.lat,
        point.lng,
        point.intensity,
      ]);

      // @ts-ignore - leaflet.heat types are not available
      L.heatLayer(heatmapPoints, {
        radius: 25,
        blur: 15,
        maxZoom: 17,
        gradient: {
          0.4: "blue",
          0.6: "cyan",
          0.7: "lime",
          0.8: "yellow",
          1.0: "red",
        },
      }).addTo(map);
    }
  }, [data, map]);

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ heatmapData }) => {
  const defaultPosition: [number, number] = [51.505, -0.09]; // Default to London

  return (
    <MapContainer center={defaultPosition} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <HeatmapLayer data={heatmapData} />
      {heatmapData.map((point, index) => (
        <Marker key={index} position={[point.lat, point.lng]}>
          <Popup>
            <strong>Intensity:</strong> {point.intensity}
            <br />
            <strong>Location:</strong> {point.lat.toFixed(2)}, {point.lng.toFixed(2)}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;