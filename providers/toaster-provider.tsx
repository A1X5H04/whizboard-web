"use client";

import "@/app/globals.css";
import { Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        position: "bottom-right",
        style: {
          background: "oklch(var(--b2))",
          color: "oklch(var(--bc))",
          fontSize: "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "var(--rounded-box)",
        },
      }}
    />
  );
};
