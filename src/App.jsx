import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
// router
import { RouterComponent } from "./router/Router";
// assets
import "./assets/styles/index.css";

const queryClient = new QueryClient();

const App = () => {
  return <RouterComponent />;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
