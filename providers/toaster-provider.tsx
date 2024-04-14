"use client";

import "@/app/globals.css";
import { Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        position: "bottom-right",
        style: {
          background: "oklch(var(--n))",
          color: "oklch(var(--nc))",
          fontSize: "1rem",
          padding: "1rem",
          borderRadius: "0.6rem",
        },
      }}
    />
  );
};
