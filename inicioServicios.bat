@echo off
start cmd /k "npm run dev"
timeout /t 2
start cmd /k "cd API-Plantas && npm run dev"
timeout /t 2
start cmd /k "cd API-Temperatura && npm run dev"
timeout /t 2
start cmd /k "cd API-Humedad && npm run dev"
timeout /t 2
start cmd /k "cd API-Luminosidad && npm run dev"
