#!/usr/bin/env bash
# ==============================================================================
# SALESTORM ARFA - SysCrafters Submission Workspace Setup
# Principal Platform & DevOps Automation Script
# ==============================================================================
set -euo pipefail

echo ">>> [SALESTORM] Initializing SysCrafters ARFA Hackathon Workspace Layout..."

DIRS=(
  "01_Requirements"
  "02_HLD"
  "03_LLD"
  "04_Database/redis_lua_scripts"
  "05_API"
  "06_SOLID"
  "07_Design_Patterns"
  "08_Scalability_Reliability"
  "09_Security_Observability"
  "10_ADR"
  "11_AI_Assisted_Validation"
  "12_Presentation"
  "apps/frontend"
)

for dir in "${DIRS[@]}"; do
  mkdir -p "$dir"
  echo "  [+] Verified directory: $dir"
done

echo ">>> [SALESTORM] Workspace directory tree verified."
echo ">>> Run 'npm run dev' inside apps/frontend to launch the live telemetry console."
