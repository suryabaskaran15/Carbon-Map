import React from "react";
import "./DataDisplay.css";
import { useCarbonIntensityContext } from "../../context/CarbonIntensityContext";

const DataDisplay: React.FC = () => {
  const { selectedRegion } = useCarbonIntensityContext();

  if (!selectedRegion) return null;

  return (
    <div className="data-overlay">
      <h3>Carbon Intensity Data (Last 30 Minutes)</h3>
      <ul>
        <li>
          <strong>Region:</strong> {selectedRegion.shortname}
        </li>
        <li>
          <strong>Forecast:</strong> {selectedRegion.intensity.forecast} gCO₂/kWh
        </li>
        <li>
          <strong>Index:</strong> {selectedRegion.intensity.index}
        </li>
        <li>
          <strong>Generation Mix:</strong>
          <ul>
            {selectedRegion.generationmix.map((mix, index) => (
              <li key={index}>
                {mix.fuel}: {mix.perc}%
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default DataDisplay;