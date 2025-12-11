# Start Local Development Environment

$ErrorActionPreference = "Stop"

Write-Host "Starting AI E-commerce Platform..." -ForegroundColor Cyan

# Check for Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js is not installed. Please install Node.js."
    exit 1
}

# Check for backend directory
if (-not (Test-Path ".\backend")) {
    Write-Error "Backend directory not found!"
    exit 1
}

# Check for frontend directory
if (-not (Test-Path ".\frontend")) {
    Write-Error "Frontend directory not found!"
    exit 1
}

Write-Host "Launching Backend Server (Port 3000)..." -ForegroundColor Green
# Use cmd /c start to open a new window that stays open if there's an error (using /k)
Start-Process cmd -ArgumentList "/c start ""Backend Server"" /k npm run dev" -WorkingDirectory ".\backend"

Write-Host "Launching Frontend Application (Port 5173)..." -ForegroundColor Magenta
Start-Process cmd -ArgumentList "/c start ""Frontend App"" /k npm run dev" -WorkingDirectory ".\frontend"

Write-Host "Services are starting in new windows..." -ForegroundColor Cyan
Write-Host "   - Backend: http://localhost:3000"
Write-Host "   - Frontend: http://localhost:5173"
Write-Host "Press Enter to exit this launcher (servers will keep running)..."
Read-Host
