# ==============================================================================
# SALESTORM ARFA: Production-Grade FastAPI Backend Container
# Python 3.11 Slim with Container Healthcheck & Redis/Postgres Drivers
# ==============================================================================
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies (curl for container healthcheck probe, gcc/libpq for postgres)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source code
COPY . .

EXPOSE 8080

# Healthcheck probe against FastAPI /healthz
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=5 \
    CMD curl -f http://localhost:8080/healthz || exit 1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
