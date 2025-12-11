# Azure SQL Server
resource "azurerm_mssql_server" "sql" {
  name                          = local.naming.sql_server
  resource_group_name           = azurerm_resource_group.rg.name
  location                      = azurerm_resource_group.rg.location
  version                       = "12.0"
  administrator_login           = var.sql_admin_login
  administrator_login_password  = random_password.sql_admin_password.result
  minimum_tls_version           = "1.2"
  public_network_access_enabled = var.enable_public_access

  azuread_administrator {
    login_username = azurerm_user_assigned_identity.app_identity.name
    object_id      = azurerm_user_assigned_identity.app_identity.principal_id
  }

  tags = {
    project     = var.project
    environment = var.environment
  }
}

# Azure SQL Database
resource "azurerm_mssql_database" "db" {
  name           = "${var.project}-${var.environment}-db"
  server_id      = azurerm_mssql_server.sql.id
  collation      = "SQL_Latin1_General_CP1_CI_AS"
  max_size_gb    = 5
  sku_name       = var.sql_sku_name
  zone_redundant = false

  tags = {
    project     = var.project
    environment = var.environment
  }
}

# SQL Server Firewall Rule - Allow Azure Services
resource "azurerm_mssql_firewall_rule" "allow_azure_services" {
  name             = "AllowAzureServices"
  server_id        = azurerm_mssql_server.sql.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

# Long-term backup retention
resource "azurerm_mssql_database_extended_auditing_policy" "db_audit" {
  database_id                             = azurerm_mssql_database.db.id
  storage_endpoint                        = azurerm_storage_account.storage.primary_blob_endpoint
  storage_account_access_key              = azurerm_storage_account.storage.primary_access_key
  storage_account_access_key_is_secondary = false
  retention_in_days                       = 90
}

# Private Endpoint for SQL (if enabled)
resource "azurerm_private_endpoint" "sql_pe" {
  count               = var.enable_private_endpoints ? 1 : 0
  name                = "${var.project}-${var.environment}-sql-pe"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  subnet_id           = azurerm_subnet.pe_subnet.id

  private_service_connection {
    name                           = "sql-psc"
    is_manual_connection           = false
    private_connection_resource_id = azurerm_mssql_server.sql.id
    subresource_names              = ["sqlServer"]
  }

  private_dns_zone_group {
    name                 = "sql-dns-zone-group"
    private_dns_zone_ids = [azurerm_private_dns_zone.sql.id]
  }

  tags = {
    project     = var.project
    environment = var.environment
  }
}
