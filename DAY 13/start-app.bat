@echo off
echo ========================================
echo   Mobile Recharge App - Quick Start
echo ========================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

:: Check if MongoDB is running
echo Checking MongoDB connection...
timeout /t 2 /nobreak >nul

echo.
echo Starting Backend Server...
echo ========================================
start "Backend Server" cmd /k "cd /d \"%~dp0mern Backend\" && npm start"

:: Wait a bit for backend to start
timeout /t 3 /nobreak >nul

echo.
echo Starting Frontend Server...
echo ========================================
start "Frontend Server" cmd /k "cd /d \"%~dp0frontendapp\DAY 10\frontendapp\application3\application3\" && npm run dev"

echo.
echo ========================================
echo   Both servers are starting!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to open the application in your browser...
pause >nul

:: Open browser
start http://localhost:5173

echo.
echo Application is running!
echo Close the terminal windows to stop the servers.
echo.
pause
