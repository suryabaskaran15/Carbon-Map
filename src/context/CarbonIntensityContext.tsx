import React, { createContext, useContext, ReactNode, useState } from "react";
import { HeatmapData } from "../types/carbonIntensity";


interface CarbonIntensityContextType {
  selectedRegion: HeatmapData | null;
  setSelectedRegion:React.Dispatch<React.SetStateAction<HeatmapData | null>>;
}

const CarbonIntensityContext = createContext<CarbonIntensityContextType | undefined>(undefined);

export const CarbonIntensityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedRegion, setSelectedRegion] = useState<HeatmapData | null>(null);

  return (
    <CarbonIntensityContext.Provider value={{ selectedRegion, setSelectedRegion }}>
      {children}
    </CarbonIntensityContext.Provider>
  );
};

export const useCarbonIntensityContext = () => {
  const context = useContext(CarbonIntensityContext);
  if (!context) {
    throw new Error("useCarbonIntensityContext must be used within a CarbonIntensityProvider");
  }
  return context;
};