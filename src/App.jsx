import React from "react";
import { createRoot } from "react-dom/client";

// router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// assets
import "./assets/styles/index.css";

// pages
import { HomePage } from "./pages/home/Index";
import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
