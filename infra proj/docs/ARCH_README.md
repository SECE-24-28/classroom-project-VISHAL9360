# AI-Driven E-commerce Recommendation Platform - Architecture

## Overview
This document outlines the high-level architecture for the AI-Driven E-commerce Recommendation Platform. The system is designed to be cloud-native, scalable, and secure, leveraging Azure PaaS offerings.

## Architecture Diagram
*(See `architecture.svg` in this directory for the visual representation)*

## Core Components

### 1. Frontend (User Interface)
- **Technology**: React (Vite) + Tailwind CSS.
- **Hosting**: Azure App Service (Web App) or Azure Static Web Apps.
- **Responsibility**: User interaction, product browsing, chat interface, admin dashboard.

### 2. Backend (API Layer)
- **Technology**: Node.js (Express).
- **Hosting**: Azure App Service (Web App) or Azure Functions.
- **Responsibility**: API endpoints for recommendations, search, and chat; orchestration of AI services; business logic.

### 3. Data & Storage
- **Azure SQL Database**: Relational data (products, users, orders).
- **Azure Blob Storage**: Unstructured data (product images, raw logs).
- **Azure Redis Cache**: High-performance caching for session data and frequent queries.

### 4. AI & Search
- **Azure OpenAI Service**: Generates personalized recommendations and powers the chat assistant (GPT-4/3.5).
- **Azure Cognitive Search (AI Search)**: Vector search and semantic search for product catalog.

### 5. Security & Ops
- **Azure Key Vault**: Manages secrets, keys, and certificates.
- **Managed Identities**: Secure, password-less authentication between Azure services.
- **Azure Monitor / Application Insights**: Telemetry, logging, and performance monitoring.

## Data Flow

1.  **User Interaction**: User visits the web app. Traffic is routed via Azure Front Door (optional) to the **Frontend App Service**.
2.  **API Requests**: Frontend makes REST API calls to the **Backend App Service**.
3.  **Authentication**: Users are authenticated (e.g., via Azure AD B2C or custom auth), and tokens are validated by the backend.
4.  **Product Search**:
    - Backend queries **Azure Cognitive Search** for product matches.
    - Results are cached in **Redis** for speed.
5.  **AI Recommendations**:
    - Backend sends user profile and context to **Azure OpenAI**.
    - OpenAI returns personalized recommendations.
6.  **Data Persistence**: Transactional data is stored in **Azure SQL**.

## Naming Conventions
Resources follow the pattern: `<project>-<env>-<resource>`

- **Project**: `ai-ecom`
- **Environments**: `dev`, `prod`
- **Region**: `eastus` (default)

### Examples:
- **Resource Group**: `rg-ai-ecom-dev-eastus`
- **App Service Plan**: `asp-ai-ecom-dev`
- **Frontend App**: `app-ai-ecom-web-dev`
- **Backend App**: `app-ai-ecom-api-dev`
- **SQL Server**: `sql-ai-ecom-dev`
- **Key Vault**: `kv-ai-ecom-dev`
- **Cognitive Search**: `search-ai-ecom-dev`
- **OpenAI**: `oai-ai-ecom-dev`

## Security Considerations
- **Zero Trust**: All services communicate using Managed Identities where possible.
- **Secrets Management**: No hardcoded keys; all secrets fetched from Key Vault.
- **Network**: (Recommended) VNET integration and Private Endpoints for database and AI services in production.
