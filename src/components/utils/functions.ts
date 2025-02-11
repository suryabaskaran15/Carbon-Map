export const getIntensityClass = (index: string) => {
    switch (index) {
      case "very low":
        return "intensity-very-low";
      case "low":
        return "intensity-low";
      case "moderate":
        return "intensity-moderate";
      case "high":
        return "intensity-high";
      case "very high":
        return "intensity-very-high";
      default:
        return "";
    }
  };