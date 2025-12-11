# Log Analytics Workspace
resource "azurerm_log_analytics_workspace" "law" {
  name                = "${var.project}-${var.environment}-law"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 30

  tags = {
    project     = var.project
    environment = var.environment
  }
}

# Application Insights
resource "azurerm_application_insights" "appinsights" {
  name                = "${var.project}-${var.environment}-appinsights"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  workspace_id        = azurerm_log_analytics_workspace.law.id
  application_type    = "web"

  tags = {
    project     = var.project
    environment = var.environment
  }
}

# Diagnostic Settings for SQL Database
resource "azurerm_monitor_diagnostic_setting" "sql_diagnostics" {
  name                       = "sql-diagnostics"
  target_resource_id         = azurerm_mssql_database.db.id
  log_analytics_workspace_id = azurerm_log_analytics_workspace.law.id

  enabled_log {
    category = "SQLInsights"
  }

  enabled_log {
    category = "AutomaticTuning"
  }

  enabled_log {
    category = "QueryStoreRuntimeStatistics"
  }

  enabled_log {
    category = "QueryStoreWaitStatistics"
  }

  enabled_log {
    category = "Errors"
  }

  metric {
    category = "AllMetrics"
    enabled  = true
  }
}

# Diagnostic Settings for Key Vault
resource "azurerm_monitor_diagnostic_setting" "kv_diagnostics" {
  name                       = "kv-diagnostics"
  target_resource_id         = azurerm_key_vault.kv.id
  log_analytics_workspace_id = azurerm_log_analytics_workspace.law.id

  enabled_log {
    category = "AuditEvent"
  }

  metric {
    category = "AllMetrics"
    enabled  = true
  }
}

# Diagnostic Settings for App Service (Backend)
resource "azurerm_monitor_diagnostic_setting" "backend_diagnostics" {
  name                       = "backend-diagnostics"
  target_resource_id         = azurerm_linux_web_app.backend.id
  log_analytics_workspace_id = azurerm_log_analytics_workspace.law.id

  enabled_log {
    category = "AppServiceHTTPLogs"
  }

  enabled_log {
    category = "AppServiceConsoleLogs"
  }

  enabled_log {
    category = "AppServiceAppLogs"
  }

  metric {
    category = "AllMetrics"
    enabled  = true
  }
}

# Action Group for Alerts
resource "azurerm_monitor_action_group" "main" {
  name                = "${var.project}-${var.environment}-action-group"
  resource_group_name = azurerm_resource_group.rg.name
  short_name          = "p0-alert"

  email_receiver {
    name          = "sendtoadmin"
    email_address = "admin@example.com"  # TODO: Replace with actual email
  }

  tags = {
    project     = var.project
    environment = var.environment
  }
}

# Metric Alert - SQL DTU Usage
resource "azurerm_monitor_metric_alert" "sql_dtu" {
  name                = "${var.project}-${var.environment}-sql-dtu-alert"
  resource_group_name = azurerm_resource_group.rg.name
  scopes              = [azurerm_mssql_database.db.id]
  description         = "Alert when SQL DTU exceeds 80%"
  severity            = 2

  criteria {
    metric_namespace = "Microsoft.Sql/servers/databases"
    metric_name      = "dtu_consumption_percent"
    aggregation      = "Average"
    operator         = "GreaterThan"
    threshold        = 80
  }

  action {
    action_group_id = azurerm_monitor_action_group.main.id
  }

  tags = {
    project     = var.project
    environment = var.environment
  }
}

# Metric Alert - App Service CPU
resource "azurerm_monitor_metric_alert" "app_cpu" {
  name                = "${var.project}-${var.environment}-app-cpu-alert"
  resource_group_name = azurerm_resource_group.rg.name
  scopes              = [azurerm_service_plan.asp.id]
  description         = "Alert when App Service CPU exceeds 80%"
  severity            = 2

  criteria {
    metric_namespace = "Microsoft.Web/serverfarms"
    metric_name      = "CpuPercentage"
    aggregation      = "Average"
    operator         = "GreaterThan"
    threshold        = 80
  }

  action {
    action_group_id = azurerm_monitor_action_group.main.id
  }

  tags = {
    project     = var.project
    environment = var.environment
  }
}

# Metric Alert - HTTP 5xx Errors
resource "azurerm_monitor_metric_alert" "http_5xx" {
  name                = "${var.project}-${var.environment}-http-5xx-alert"
  resource_group_name = azurerm_resource_group.rg.name
  scopes              = [azurerm_linux_web_app.backend.id]
  description         = "Alert when HTTP 5xx errors exceed threshold"
  severity            = 1

  criteria {
    metric_namespace = "Microsoft.Web/sites"
    metric_name      = "Http5xx"
    aggregation      = "Total"
    operator         = "GreaterThan"
    threshold        = 10
  }

  action {
    action_group_id = azurerm_monitor_action_group.main.id
  }

  tags = {
    project     = var.project
    environment = var.environment
  }
}
