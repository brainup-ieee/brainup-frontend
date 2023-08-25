// hooks
import { useState, useEffect } from "react";

// components
import { Link } from "react-router-dom";

export const SigninPage = () => {
  return (
    <main className="w-full min-h-screen bg-secondary flex justify-center items-center">
      <div className="m-4 p-8 bg-white rounded-xl max-w-sm">
        <h2 className="mb-8">
          <Link
            to="/"
            className="text-primary font-nunito font-extrabold text-xl"
          >
            BrainUp
          </Link>
        </h2>
      </div>
    </main>
  );
};
