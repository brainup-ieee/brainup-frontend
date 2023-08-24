import React from "react";
import { createRoot } from "react-dom/client";

// router
import { RouterComponent } from "./router/Router";

// assets
import "./assets/styles/index.css";

const App = () => {
  return <RouterComponent />;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
