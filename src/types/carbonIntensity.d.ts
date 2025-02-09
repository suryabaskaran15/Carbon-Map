export interface CarbonIntensityData {
    from: string;
    to: string;
    intensity: {
      forecast: number;
      actual: number;
      index: string;
    };
  }
  
  export interface RegionData {
    regionid: number;
    dnoregion: string;
    shortname: string;
    data: CarbonIntensityData[];
  }