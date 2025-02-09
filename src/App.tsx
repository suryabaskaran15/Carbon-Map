import React from "react";
import useCarbonIntensity from "./hooks/useCarbonIntensity";
import MapComponent from "./components/MapComponent/MapComponent";
import DataDisplay from "./components/DataDisplay/DataDisplay";
import "./assets/styles/App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Map from "./components/MapComponent/Map";
import Loader from "./components/Loader/Loader";
import AppRoutes from "./router/Router";

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </div>
  );
};

export default App;