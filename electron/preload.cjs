const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("kiddosDesktop", {
  platform: process.platform,
  apiBase: process.env.KIDDOS_API_BASE || "http://localhost:8787",
});
