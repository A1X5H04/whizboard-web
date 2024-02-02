"use client";

import "@/app/globals.css";
import { Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        position: "bottom-right",
      }}
    />
  );
};
