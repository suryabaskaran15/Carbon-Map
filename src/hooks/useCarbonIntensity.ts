import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HeatmapData, RegionData } from "../types/carbonIntensity";
import toast from "react-hot-toast";

const regionCoordinates: { [key: string]: { lat: number; lng: number } } = {
  "Scottish Hydro Electric Power Distribution": { lat: 57.4778, lng: -4.2247 }, // North Scotland
  "SP Distribution": { lat: 55.8642, lng: -4.2518 }, // South Scotland
  "Electricity North West": { lat: 53.4808, lng: -2.2426 }, // North West England
  "MRG North East": { lat: 54.9783, lng: -1.6178 }, // North East England
  "MRG Yorkshire": { lat: 53.8008, lng: -1.5491 }, // Yorkshire
  "SP Manweb": { lat: 53.4084, lng: -2.9916 }, // North Wales & Merseyside
  "MPD South Wales": { lat: 51.6214, lng: -3.9436 }, // South Wales
  "MPD West Midlands": { lat: 52.4862, lng: -1.8904 }, // West Midlands
  "MPD East Midlands": { lat: 52.9548, lng: -1.1581 }, // East Midlands
  "UKFM East": { lat: 52.2053, lng: 0.1218 }, // East England
  "MPD South West": { lat: 50.715, lng: -3.5339 }, // South West England
  "SSE South": { lat: 51.1789, lng: -1.8262 }, // South England
  "UKFM London": { lat: 51.5074, lng: -0.1278 }, // London
  "UKFM South East": { lat: 51.1789, lng: -1.8262 }, // South East England
  "England": { lat: 52.3555, lng: -1.1743 }, // England
  "Scotland": { lat: 56.4907, lng: -4.2026 }, // Scotland
  "Wales": { lat: 52.1307, lng: -3.7837 }, // Wales
  "GB": { lat: 54.7024, lng: -3.2766 }, // Great Britain
};

const fetchCarbonIntensityData = async () => {
  const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/regional`);
  return response.data.data[0].regions;
};

const useCarbonIntensity = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["carbonIntensity"], // Unique key for caching
    queryFn: fetchCarbonIntensityData, // Function to fetch data
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
    refetchInterval: 1000 * 60 * 30, // Auto refresh every 60 sec
  });

  // Transform the fetched data into heatmap data
  const heatmapData: HeatmapData[] = data
    ? data.map((region: RegionData) => {
      const coordinates = regionCoordinates[region.dnoregion] || { lat: 0, lng: 0 }; // Default to (0, 0) if region not found
      return {
        lat: coordinates.lat,
        lng: coordinates.lng,
        ...region,
      };
    })
    : [];

  const handleRefetch = async () => {
    const loadingToastId = toast.loading("Refreshing data..."); // Show a loading toast and store its ID
    try {
      await refetch();
      toast.success("Data refreshed successfully!"); // Show a success toast
    } catch (err) {
      toast.error("Failed to refresh data."); // Show an error toast
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  return {
    heatmapData,
    loading: isLoading,
    error: error ? "Failed to fetch carbon intensity data." : null,
    refetch: handleRefetch
  };
};

export default useCarbonIntensity;