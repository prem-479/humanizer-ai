import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerPWA } from "./pwa.ts";

createRoot(document.getElementById("root")!).render(<App />);

// Register Service Worker for PWA
registerPWA();
