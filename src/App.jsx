import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const App = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div className="relative w-full h-screen bg-slate-800 flex flex-col justify-center items-center gap-4 text-gray-200">
      <h1 className="w-full text-center text-4xl font-medium">
        React + Tailwind
      </h1>
      <div className="flex">
        <img
          src="https://www.svgrepo.com/show/452092/react.svg"
          alt="React Logo"
          className="w-40 h-40"
        />
        <img
          src="https://www.svgrepo.com/show/374118/tailwind.svg"
          alt="Tailwind Logo"
          className="w-40 h-40"
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="font-bold text-2xl">{counter}</span>
        <button
          className="px-4 py-2 border-2 rounded-md bg-cyan-900 text-xl font-medium"
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          counter
        </button>
      </div>
      <span className="absolute left-1/2 -translate-x-1/2 bottom-0 font-mono">
        created by{" "}
        <a
          href="https://github.com/Mu-selim"
          target="_blanck"
          className="text-cyan-200"
        >
          Muhammad Selim
        </a>
      </span>
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
