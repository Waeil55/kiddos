// Native shell glue (Capacitor iOS / Android). Does nothing on the web or in Electron.
import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";
import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar, Style } from "@capacitor/status-bar";

// Screens where "back" means "leave the app" rather than "go to the previous screen".
const ROOT_ROUTES = new Set(["/", "/home"]);

function currentRoute(): string {
  return location.hash.replace(/^#/, "").split("?")[0] || "/";
}

export function initNative() {
  if (!Capacitor.isNativePlatform()) return;

  // Android hardware back: step back through the app, and only minimize from a root screen.
  App.addListener("backButton", ({ canGoBack }) => {
    if (ROOT_ROUTES.has(currentRoute()) || !canGoBack) App.minimizeApp().catch(() => {});
    else history.back();
  }).catch(() => {});

  // Phone call, app switcher, lock screen: let the page pause speech and listening the same way
  // it does when a browser tab is hidden (speech.ts listens for visibilitychange).
  App.addListener("appStateChange", ({ isActive }) => {
    if (isActive) return;
    document.dispatchEvent(new Event("visibilitychange"));
    window.dispatchEvent(new Event("kiddos:inactive"));
  }).catch(() => {});

  // The app has a light mint background on every screen, so use dark status bar icons.
  StatusBar.setStyle({ style: Style.Light }).catch(() => {});

  // launchAutoHide is off: hide the splash once React has painted its first frame.
  const hide = () => SplashScreen.hide({ fadeOutDuration: 250 }).catch(() => {});
  requestAnimationFrame(() => requestAnimationFrame(hide));
  setTimeout(hide, 4000); // safety net if a frame never comes
}
