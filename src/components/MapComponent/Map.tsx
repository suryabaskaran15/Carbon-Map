import React from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import { useCarbonData } from "../../hooks/useCarbonData";
import "leaflet/dist/leaflet.css";
import "../../assets/styles/map.scss";

const Map = () => {
    const { data, isLoading, error } = useCarbonData();
    const getIntensityColor = (intensity: number): string => {
        if (intensity < 100) return "green";
        if (intensity < 200) return "yellow";
        if (intensity < 300) return "orange";
        return "red";
    };
    if (isLoading) return <p>Loading map...</p>;
    if (error) return <p>Error fetching data</p>;

    return (
        <MapContainer center={[55, -3]} zoom={6} className="map-container">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
{console.log(data)}
            {data[0]?.regions?.map((region) => (
                <Circle
                    key={region.regionid}
                    center={[region.regionid, region.regionid]} // Example lat/lng
                    radius={region.intensity.forecast * 1000}
                    fillColor={getIntensityColor(region.intensity.forecast)}
                    fillOpacity={0.6}
                    stroke={false}
                >
                    <Popup>
                        <h3>{region.shortname}</h3>
                        <p>Forecast: {region.intensity.forecast} gCO₂/kWh</p>
                        <p>Actual: {region.intensity.actual} gCO₂/kWh</p>
                        <p>Status: {region.intensity.index}</p>
                    </Popup>
                </Circle>
            ))}
        </MapContainer>
    );
};

export default Map;
