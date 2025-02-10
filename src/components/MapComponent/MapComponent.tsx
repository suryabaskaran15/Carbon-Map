import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import "./MapComponent.css";
import { useCarbonIntensityContext } from "../../context/CarbonIntensityContext";
import { HeatmapData } from "../../types/carbonIntensity";
import HeatmapLayer from "./HeatmapLayer";

interface MapComponentProps {
  heatmapData: HeatmapData[];
}



const MapComponent: React.FC<MapComponentProps> = ({ heatmapData }) => {
  const defaultPosition: [number, number] = [51.505, -0.09]; // Default to London
  const { selectedRegion, setSelectedRegion } = useCarbonIntensityContext();

  return (
    <MapContainer center={defaultPosition} zoom={5} minZoom={3} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <HeatmapLayer data={heatmapData} />
      {heatmapData.map((region) => (
        <Marker
          key={region.regionid}
          position={[region.lat, region.lng]}
          eventHandlers={{
            click: () => {
              setSelectedRegion((prev) => (prev?.regionid !== region.regionid ? region : null));
            },
          }}
        >
          <Popup>
            <p>Forecast: {region.intensity.forecast} gCO₂/kWh</p>
          </Popup>
          {selectedRegion?.regionid === region.regionid && (
            <>
              {/* Create multiple circles to simulate a gradient */}
              {[
                { color: "blue", opacity: 0.2, radius: 1.0 },
                { color: "cyan", opacity: 0.4, radius: 0.8 },
                { color: "lime", opacity: 0.4, radius: 0.6 },
                { color: "yellow", opacity: 0.6, radius: 0.4 },
                { color: "red", opacity: 0.8, radius: 0.2 },
              ].map((circle, index) => (
                <Circle
                  key={index}
                  center={[region.lat, region.lng]}
                  radius={region.intensity.forecast * 75 * circle.radius} // Adjust radius
                  fillColor={circle.color} // Set color
                  fillOpacity={circle.opacity} // Set opacity
                  stroke={false}
                />
              ))}
            </>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;