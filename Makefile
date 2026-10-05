# ==============================================================================
# SALESTORM ARFA: SRE & DevOps Operational Makefile
# Multi-Service Orchestration, Database Migrations & Chaos Test Harness
# ==============================================================================

SHELL := /bin/bash
.DEFAULT_GOAL := help

# Colors for terminal output
BOLD   := \033[1m
GREEN  := \033[32m
YELLOW := \033[33m
BLUE   := \033[34m
CYAN   := \033[36m
RESET  := \033[0m

.PHONY: help up down init-db simulate logs ps test reset clean

help: ## Show this operational runbook menu
	@echo -e "${BOLD}${CYAN}==============================================================================${RESET}"
	@echo -e "${BOLD}${GREEN}SALESTORM ARFA // SRE & DevOps Operational Runbook${RESET}"
	@echo -e "${BOLD}${CYAN}==============================================================================${RESET}"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  ${YELLOW}%-15s${RESET} %s\n", $$1, $$2}'
	@echo -e "${BOLD}${CYAN}==============================================================================${RESET}"

up: ## Boot the entire distributed stack in detached mode
	@echo -e "${BOLD}${BLUE}[+] Booting SALESTORM ARFA Platform via Docker Compose...${RESET}"
	docker compose up -d --build
	@echo -e "${BOLD}${GREEN}[✔] Stack successfully running!${RESET}"
	@echo -e "    - Frontend Dashboard: ${CYAN}http://localhost:5173${RESET}"
	@echo -e "    - FastAPI Backend:    ${CYAN}http://localhost:8080${RESET}"
	@echo -e "    - Healthcheck:        ${CYAN}http://localhost:8080/healthz${RESET}"
	@echo -e "    - Prometheus:         ${CYAN}http://localhost:9090${RESET}"
	@echo -e "    - Redis Core:         ${CYAN}localhost:6379${RESET}"
	@echo -e "    - PostgreSQL RDBMS:   ${CYAN}localhost:5432${RESET}"
	@echo -e "    - Kafka Broker:       ${CYAN}localhost:9092${RESET}"

init-db: ## Run PostgreSQL migrations and initialize schema DDL
	@echo -e "${BOLD}${BLUE}[+] Running PostgreSQL 16 schema migrations...${RESET}"
	docker compose exec -T postgres psql -U salestorm_admin -d salestorm_core -f /docker-entrypoint-initdb.d/init.sql
	@echo -e "${BOLD}${GREEN}[✔] PostgreSQL migrations executed successfully.${RESET}"

simulate: ## Run the 10,000-user concurrency chaos test harness
	@echo -e "${BOLD}${BLUE}[+] Launching 10,000-to-100 High-Contention Invariant Simulation...${RESET}"
	python 11_AI_Assisted_Validation/simulation_script_chaos.py

down: ## Tear down all containers and purge ephemeral volumes
	@echo -e "${BOLD}${YELLOW}[!] Tearing down SALESTORM containers and purging ephemeral volumes...${RESET}"
	docker compose down -v --remove-orphans
	@echo -e "${BOLD}${GREEN}[✔] Platform environment cleanly purged.${RESET}"

logs: ## Tail streaming container logs across all microservices
	docker compose logs -f

ps: ## Check status and health of all platform containers
	docker compose ps

status: ps ## Alias for ps

reset: ## Reset flash sale inventory back to initial 100 units via Admin API
	@echo -e "${BOLD}${BLUE}[+] Resetting inventory state to initial 100 units...${RESET}"
	curl -s -X POST http://localhost:8080/api/v1/admin/reset | grep -o '"status":"RESET"' && echo -e "${GREEN}[✔] Backend state reset to 100 units.${RESET}" || echo -e "${YELLOW}[!] Failed to reset or backend offline.${RESET}"

test: ## Run automated pytest integration & concurrency test suite
	@echo -e "${BOLD}${BLUE}[+] Running pytest concurrency and outage test suite...${RESET}"
	pytest tests/integration/test_concurrency_and_outage.py -v --durations=10

benchmark: ## Run Locust 10,000-contender high-concurrency performance benchmark
	@echo -e "${BOLD}${BLUE}[+] Launching headless Locust benchmark (1,000 users, 200/s)...${RESET}"
	locust -f benchmarks/locustfile.py --headless -u 1000 -r 200 -t 15s --host http://localhost:8080

clean: down ## Complete deep clean of containers, networks, and images
	docker compose down -v --rmi local --remove-orphans
