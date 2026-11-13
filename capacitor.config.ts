import type { CapacitorConfig } from "@capacitor/cli";

// Matches --mint in src/styles.css (the app's background on every screen).
const BG = "#e9fbf7";

const config: CapacitorConfig = {
  appId: "care.agape.kiddos",
  appName: "Kiddos",
  webDir: "dist",
  backgroundColor: BG,
  // Safe areas are handled in CSS with env(safe-area-inset-*) (index.html uses viewport-fit=cover).
  ios: { contentInset: "never" },
  android: { allowMixedContent: false },
  plugins: {
    // src/native.ts hides the splash once the first frame has rendered.
    SplashScreen: { launchAutoHide: false, backgroundColor: BG, showSpinner: false, androidScaleType: "CENTER_CROP" },
    // Edge-to-edge on Android: the webview follows viewport-fit=cover and env() gets real values.
    SystemBars: { insetsHandling: "css", initialViewportFitValueHint: "cover", style: "LIGHT" },
  },
};

export default config;
