@echo off
echo Starting React (frontend) and Laravel (backend)...

REM Frontend (React with Vite)
start cmd /k "cd frontend && npm run dev"

REM Backend (Laravel)
start cmd /k "cd backend && php artisan serve"

echo Servers are starting in separate windows...
