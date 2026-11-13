@echo off
rem Starts Kiddos on dr-mariam.com: the app server on 127.0.0.1:8790 and the "kiddos" Cloudflare tunnel.
rem Run "npm run build" first after changing the app.
cd /d "%~dp0.."
set API_PORT=8790
start "Kiddos server" /min cmd /c "npx tsx server/index.ts"
start "Kiddos tunnel" /min cloudflared tunnel --config deploy\cloudflared-kiddos.yml run kiddos
