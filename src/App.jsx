import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";

const App = () => {
  return (
    <div className="relative w-full h-screen bg-secondary flex flex-col justify-center items-center gap-4 text-gray-200">
      <h1 className="w-full text-center text-4xl font-medium">BrainUp</h1>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
