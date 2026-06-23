import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { SEOProvider } from "@/lib/useSEO";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SEOProvider>
      <RouterProvider router={router} />
    </SEOProvider>
  </StrictMode>,
);
