import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { HeatmapData } from "../../types/carbonIntensity";

const HeatmapLayer: React.FC<{ data: HeatmapData[] }> = ({ data }) => {
  const map = useMap();

  // Normalize intensity to radius
  const normalizeRadius = (intensity: number, minIntensity: number, maxIntensity: number) => {
    const minRadius = 10; // Minimum radius
    const maxRadius = 50; // Maximum radius
    return ((intensity - minIntensity) / (maxIntensity - minIntensity)) * (maxRadius - minRadius) + minRadius;
  };

  useEffect(() => {
    if (data.length > 0) {
      const intensities = data.map((point) => point.intensity.forecast);
      const minIntensity = Math.min(...intensities);
      const maxIntensity = Math.max(...intensities);

      const heatmapPoints = data.map((point) => [
        point.lat,
        point.lng,
        point.intensity.forecast,
      ]);

      // @ts-ignore - leaflet.heat types are not available
      const heatLayer = L.heatLayer(heatmapPoints, {
        radius: (point:number[]) => {
          // Calculate radius based on intensity and zoom level
          const baseRadius = normalizeRadius(point[2], minIntensity, maxIntensity);
          return baseRadius / (map.getZoom() / 5); // Adjust radius based on zoom level
        },
        blur: 25, // Increased blur for smoother transitions
        maxZoom: 17,
        gradient: {
          0.1: "blue",
          0.3: "cyan",
          0.5: "lime",
          0.7: "yellow",
          1.0: "red",
        },
      }).addTo(map);

      // Cleanup heat layer on unmount
      return () => {
        map.removeLayer(heatLayer);
      };
    }
  }, [data, map]);

  return null;
};

export default HeatmapLayer;