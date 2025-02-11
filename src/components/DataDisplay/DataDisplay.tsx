import React, { JSX } from "react";
import "./DataDisplay.css";
import { useCarbonIntensityContext } from "../../context/CarbonIntensityContext";
import { 
  FaWind, FaSolarPanel, FaGasPump, FaIndustry, FaLeaf, FaWater, FaPlug, FaRadiation 
} from "react-icons/fa"; 
import { FiBox } from "react-icons/fi"; // For "other" category
import { getIntensityClass } from "../utils/functions";

const DataDisplay: React.FC = () => {
  const { selectedRegion } = useCarbonIntensityContext();

  if (!selectedRegion) return null;

  // Mapping fuel types to icons
  const fuelIcons: { [key: string]: JSX.Element } = {
    biomass: <FaLeaf className="fuel-icon" color="#4CAF50" />, // Green
    coal: <FaIndustry className="fuel-icon" color="#757575" />, // Grey
    imports: <FaPlug className="fuel-icon" color="#607D8B" />, // Blue-grey
    gas: <FaGasPump className="fuel-icon" color="#FF9800" />, // Orange
    nuclear: <FaRadiation className="fuel-icon" color="#9C27B0" />, // Purple
    other: <FiBox className="fuel-icon" color="#795548" />, // Brown
    hydro: <FaWater className="fuel-icon" color="#03A9F4" />, // Light Blue
    solar: <FaSolarPanel className="fuel-icon" color="#FFC107" />, // Yellow
    wind: <FaWind className="fuel-icon" color="#00BCD4" />, // Cyan
  };  

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
          <strong>Index:</strong>
          <span className={`intensity-label ${getIntensityClass(selectedRegion.intensity.index)}`}>
            {selectedRegion.intensity.index}
          </span>
        </li>
        <li>
          <strong>Generation Mix:</strong>
          <ul className="generation-mix">
            {selectedRegion.generationmix.map((mix, index) => (
              <li key={index} className="generation-item">
                {fuelIcons[mix.fuel] || <FiBox className="fuel-icon" />} 
                <span className="fuel-text">{mix.fuel}: {mix.perc}%</span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default DataDisplay;
