terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

locals {
  resource_prefix = "${var.project}-${var.environment}"
  naming = {
    app_service = "${var.project}-${var.environment}-appsvc"
    sql_server  = "${var.project}-${var.environment}-sql"
    storage     = lower(replace("${var.project}${var.environment}stg", "-", ""))
    key_vault   = "${var.project}-${var.environment}-kv"
    redis       = "${var.project}-${var.environment}-redis"
    search      = "${var.project}-${var.environment}-search"
    openai      = "${var.project}-${var.environment}-oai"
  }
}

# Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "${local.resource_prefix}-rg"
  location = var.location

  tags = {
    project     = var.project
    environment = var.environment
  }
}

# Key Vault
resource "azurerm_key_vault" "kv" {
  name                       = local.naming.key_vault
  location                   = azurerm_resource_group.rg.location
  resource_group_name        = azurerm_resource_group.rg.name
  tenant_id                  = var.tenant_id
  sku_name                   = "standard"
  soft_delete_retention_days = 7
  purge_protection_enabled   = false

  network_acls {
    default_action = "Deny"
    bypass         = "AzureServices"
  }

  tags = {
    project     = var.project
    environment = var.environment
  }
}

# Storage Account
resource "azurerm_storage_account" "storage" {
  name                     = local.naming.storage
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  min_tls_version          = "TLS1_2"
  
  public_network_access_enabled = var.enable_public_access

  tags = {
    project     = var.project
    environment = var.environment
  }
}

# App Service Plan
resource "azurerm_service_plan" "asp" {
  name                = "${local.resource_prefix}-asp"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = var.app_service_plan_sku

  tags = {
    project     = var.project
    environment = var.environment
  }
}

# Backend App Service
resource "azurerm_linux_web_app" "backend" {
  name                = "${local.naming.app_service}-api"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.asp.id
  https_only          = true

  site_config {
    application_stack {
      node_version = "18-lts"
    }
    
    always_on = true
    
    # VNet integration
    vnet_route_all_enabled = true
  }

  app_settings = {
    "WEBSITE_RUN_FROM_PACKAGE"       = "1"
    "KEYVAULT_NAME"                  = azurerm_key_vault.kv.name
    "AZURE_OPENAI_ENDPOINT"          = azurerm_cognitive_account.openai.endpoint
    "AZURE_SEARCH_ENDPOINT"          = "https://${azurerm_search_service.search.name}.search.windows.net"
    "REDIS_HOST"                     = azurerm_redis_cache.redis.hostname
    "SQL_SERVER"                     = azurerm_mssql_server.sql.fully_qualified_domain_name
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.appinsights.connection_string
  }

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.app_identity.id]
  }

  tags = {
    project     = var.project
    environment = var.environment
  }
}

# Frontend App Service
resource "azurerm_linux_web_app" "frontend" {
  name                = "${local.naming.app_service}-web"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.asp.id
  https_only          = true

  site_config {
    application_stack {
      node_version = "18-lts"
    }
    
    always_on        = true
    app_command_line = "pm2 serve /home/site/wwwroot/dist --no-daemon --spa"
  }

  app_settings = {
    "WEBSITE_RUN_FROM_PACKAGE" = "1"
  }

  tags = {
    project     = var.project
    environment = var.environment
  }
}

# VNet Integration for Backend
resource "azurerm_app_service_virtual_network_swift_connection" "backend_vnet" {
  app_service_id = azurerm_linux_web_app.backend.id
  subnet_id      = azurerm_subnet.app_subnet.id
}

# VNet Integration for Frontend
resource "azurerm_app_service_virtual_network_swift_connection" "frontend_vnet" {
  app_service_id = azurerm_linux_web_app.frontend.id
  subnet_id      = azurerm_subnet.app_subnet.id
}

