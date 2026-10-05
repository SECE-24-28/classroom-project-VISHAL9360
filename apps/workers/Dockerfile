# ==============================================================================
# SALESTORM ARFA: Resilient Order Consumer Worker Container
# Python 3.11 Slim with Kafka & PostgreSQL Drivers
# ==============================================================================
FROM python:3.11-slim

WORKDIR /app

# Install curl for container healthcheck & gcc/libpq for postgres
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
RUN pip install --no-cache-dir kafka-python psycopg2-binary

# Copy worker source code
COPY apps/workers/order_consumer.py ./order_consumer.py

EXPOSE 8085

HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=5 \
    CMD curl -f http://localhost:8085/healthz || exit 1

CMD ["python", "order_consumer.py"]
