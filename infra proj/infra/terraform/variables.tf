variable "subscription_id" {
  description = "Azure subscription ID"
  type        = string
}

variable "tenant_id" {
  description = "Azure tenant ID"
  type        = string
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "eastus"
}

variable "project" {
  description = "Project name"
  type        = string
  default     = "aiecom"
}

variable "environment" {
  description = "Environment (dev, demo, prod)"
  type        = string
  default     = "demo"
}

# Networking
variable "vnet_address_space" {
  description = "VNet address space"
  type        = list(string)
  default     = ["10.0.0.0/16"]
}

variable "app_subnet_prefix" {
  description = "App Service subnet prefix"
  type        = list(string)
  default     = ["10.0.1.0/24"]
}

variable "db_subnet_prefix" {
  description = "Database subnet prefix"
  type        = list(string)
  default     = ["10.0.2.0/24"]
}

variable "pe_subnet_prefix" {
  description = "Private endpoint subnet prefix"
  type        = list(string)
  default     = ["10.0.3.0/24"]
}

# App Service
variable "app_service_plan_sku" {
  description = "App Service Plan SKU"
  type        = string
  default     = "S1"
}

# SQL Database
variable "sql_admin_login" {
  description = "SQL Server admin username"
  type        = string
  default     = "sqladmin"
}

variable "sql_sku_name" {
  description = "SQL Database SKU"
  type        = string
  default     = "S0"
}

# Redis
variable "redis_sku_name" {
  description = "Redis Cache SKU"
  type        = string
  default     = "Standard"
}

variable "redis_capacity" {
  description = "Redis Cache capacity"
  type        = number
  default     = 1
}

# Cognitive Search
variable "search_sku" {
  description = "Cognitive Search SKU"
  type        = string
  default     = "basic"
}

# OpenAI
variable "openai_sku" {
  description = "Azure OpenAI SKU"
  type        = string
  default     = "S0"
}

# Feature flags
variable "enable_private_endpoints" {
  description = "Enable private endpoints for PaaS services"
  type        = bool
  default     = true
}

variable "enable_public_access" {
  description = "Enable public network access (disable for production)"
  type        = bool
  default     = false
}
