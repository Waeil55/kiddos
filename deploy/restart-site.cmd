@echo off
rem Restarts the Kiddos server behind dr-mariam.com so it picks up a new build or new keys in .env.
rem The Cloudflare tunnel keeps running.
cd /d "%~dp0.."
for /f "tokens=5" %%p in ('netstat -ano ^| findstr "127.0.0.1:8790" ^| findstr LISTENING') do taskkill /PID %%p /F >nul 2>&1
set API_PORT=8790
start "Kiddos server" /min cmd /c "npx tsx server/index.ts"
echo Kiddos server restarted. Give it about 10 seconds.
timeout /t 10 >nul
curl -s http://127.0.0.1:8790/api/health
echo.
pause
