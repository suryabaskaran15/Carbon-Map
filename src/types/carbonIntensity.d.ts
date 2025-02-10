export interface CarbonIntensityData {
  from: string;
  to: string;
  regions: RegionData[]
}

export interface RegionData {
  regionid: number;
  dnoregion: string;
  shortname: string;
  intensity: {
    forecast: number;
    index: "very low" | "low" | "moderate" | "high" | "very high";
  };
  generationmix: {
    fuel: string;
    perc: number;
  }[];
}


export interface HeatmapData extends RegionData {
  lat: number,
  lng: number,
}