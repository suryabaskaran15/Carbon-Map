import React from "react";
import "./assets/styles/App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./router/Router";
import { CarbonIntensityProvider } from "./context/CarbonIntensityContext";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <CarbonIntensityProvider>
          <AppRoutes />
          <Toaster position="bottom-right" />
        </CarbonIntensityProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;