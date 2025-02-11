import React from "react";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import "./MapComponent.css";
import { useCarbonIntensityContext } from "../../context/CarbonIntensityContext";
import { HeatmapData } from "../../types/carbonIntensity";
import HeatmapLayer from "./HeatmapLayer";
import { FaLocationDot } from "react-icons/fa6";
import { getIntensityClass } from "../utils/functions";

interface MapComponentProps {
  heatmapData: HeatmapData[];
}

// Convert FaLocationDot into an HTML string
const locationIconHTML = (colorClass: string) => ReactDOMServer.renderToString(
  <FaLocationDot className={`custom-map-icon ${getIntensityClass(colorClass)}`} />
);

// Create a Leaflet divIcon using the converted HTML
const locationIcon = (colorClass: string) => L.divIcon({
  className: "custom-marker-icon",
  html: locationIconHTML(colorClass), // Inject FaLocationDot HTML
  iconSize: [24, 24], // Adjust size
  iconAnchor: [12, 24], // Center the icon properly
});

const MapComponent: React.FC<MapComponentProps> = ({ heatmapData }) => {
  const defaultPosition: [number, number] = [51.505, -0.09]; // Default to London
  const { selectedRegion, setSelectedRegion } = useCarbonIntensityContext();

  return (
    <MapContainer className="map-container" center={defaultPosition} zoom={5} minZoom={3} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <HeatmapLayer data={heatmapData} />
      {heatmapData.map((region) => (
        <Marker
          key={region.regionid}
          position={[region.lat, region.lng]}
          icon={locationIcon(region.intensity.index)} // Use the custom FaLocationDot icon
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
