import React from "react";
import ReactDOM from "react-dom/client";
import { Capacitor } from "@capacitor/core";
// Self-hosted fonts (no Google Fonts request): Baloo 2 for the UI, Caveat for the whiteboard.
import "@fontsource/baloo-2/400.css";
import "@fontsource/baloo-2/500.css";
import "@fontsource/baloo-2/600.css";
import "@fontsource/baloo-2/700.css";
import "@fontsource/baloo-2/800.css";
import "@fontsource/caveat/600.css";
import "@fontsource/caveat/700.css";
import App from "./App";
import { initNative } from "./native";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

initNative();

// Offline shell for the web: the iOS/Android apps already ship their files inside the app.
if ("serviceWorker" in navigator && location.protocol.startsWith("http") && import.meta.env.PROD && !Capacitor.isNativePlatform()) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
