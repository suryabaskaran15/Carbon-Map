import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface CarbonIntensityData {
  from: string;
  to: string;
  intensity: {
    forecast: number;
    actual: number;
    index: string;
  };
}

interface RegionData  extends CarbonIntensityData {
  regionid: number;
  dnoregion: string;
  shortname: string;
}

interface HeatmapData {
  lat: number;
  lng: number;
  intensity: number;
}

const fetchCarbonIntensityData = async () => {
  const response = await axios.get("https://api.carbonintensity.org.uk/regional");
  return response.data.data[0].regions;
};

const useCarbonIntensity = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["carbonIntensity"], // Unique key for caching
    queryFn: fetchCarbonIntensityData, // Function to fetch data
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
    refetchInterval: 60000, // Auto refresh every 60 sec
  });

  // Helper function to generate random lat/lng for demo
  const getRandomLatLng = () => {
    return {
      lat: 51.505 + (Math.random() - 0.5) * 10,
      lng: -0.09 + (Math.random() - 0.5) * 10,
    };
  };

  // Transform the fetched data into heatmap data
  const heatmapData: HeatmapData[] = data
    ? data.map((region: RegionData) => ({
      lat: getRandomLatLng().lat,
      lng: getRandomLatLng().lng,
      intensity: region.intensity.forecast,
    }))
    : [];

  return {
    heatmapData,
    loading: isLoading,
    error: error ? "Failed to fetch carbon intensity data." : null,
  };
};

export default useCarbonIntensity;