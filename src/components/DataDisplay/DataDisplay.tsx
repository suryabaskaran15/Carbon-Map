import React from "react";
import { CarbonIntensityData } from "../../types/carbonIntensity.d";
import "./DataDisplay.css";

interface DataDisplayProps {
  data: CarbonIntensityData[];
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data }) => {
  return (
    <div className="data-overlay">
      <h3>Carbon Intensity Data (Last 30 Minutes)</h3>
      <ul>
        {data.map((entry, index) => (
          <li key={index}>
            <strong>From:</strong> {new Date(entry.from).toLocaleTimeString()} -{" "}
            <strong>To:</strong> {new Date(entry.to).toLocaleTimeString()}
            <br />
            <strong>Forecast:</strong> {entry.intensity.forecast} |{" "}
            <strong>Actual:</strong> {entry.intensity.actual} |{" "}
            <strong>Index:</strong> {entry.intensity.index}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;