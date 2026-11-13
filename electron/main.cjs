// Desktop shell for Windows, macOS and Linux.
// Runs the bundled Kiddos API (tutor + voices) on a private local port and loads the app from it,
// so the desktop app works on its own with no separate server.
const { app, BrowserWindow, shell, session } = require("electron");
const path = require("path");
const fs = require("fs");
const net = require("net");

const isDev = process.env.ELECTRON_DEV === "1";

function freePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.unref();
    srv.on("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });
}

function waitForServer(port, tries = 100) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      const sock = net.connect(port, "127.0.0.1", () => {
        sock.end();
        resolve();
      });
      sock.on("error", () => (n > 0 ? setTimeout(() => attempt(n - 1), 100) : reject(new Error("Kiddos server did not start"))));
    };
    attempt(tries);
  });
}

async function startServer() {
  // API keys for the AI tutor and studio voices can live in <userData>/.env (see README).
  const userEnv = path.join(app.getPath("userData"), ".env");
  if (!fs.existsSync(userEnv)) {
    fs.mkdirSync(path.dirname(userEnv), { recursive: true });
    fs.writeFileSync(userEnv, "# Kiddos settings. Add keys here and restart the app.\nANTHROPIC_API_KEY=\nELEVENLABS_API_KEY=\nAZURE_SPEECH_KEY=\nAZURE_SPEECH_REGION=eastus\n");
  }
  const port = await freePort();
  process.env.DOTENV_CONFIG_PATH = userEnv;
  process.env.API_PORT = String(port);
  process.env.KIDDOS_DIST = path.join(__dirname, "..", "dist");
  // The install folder may be read-only; keep the server's files (reports) with the user's app data.
  process.env.KIDDOS_DATA_DIR = path.join(app.getPath("userData"), "data");
  require("./server.cjs");
  await waitForServer(port);
  return port;
}

function createWindow(url) {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 380,
    minHeight: 600,
    title: "Kiddos",
    backgroundColor: "#e9fbf7",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // The tutor needs the microphone to listen to the child.
  session.defaultSession.setPermissionRequestHandler((_wc, permission, cb) => {
    cb(permission === "media" || permission === "speaker-selection");
  });

  // Open outside links in the system browser, never inside the kids' app.
  win.webContents.setWindowOpenHandler(({ url: target }) => {
    shell.openExternal(target);
    return { action: "deny" };
  });

  win.loadURL(url);
}

// One window only: a second launch focuses the existing one.
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", () => {
    const [win] = BrowserWindow.getAllWindows();
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  app.whenReady().then(async () => {
    const url = isDev ? "http://localhost:5173" : `http://127.0.0.1:${await startServer()}`;
    createWindow(url);
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow(url);
    });
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
}
