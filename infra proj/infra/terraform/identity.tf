# User-Assigned Managed Identity
resource "azurerm_user_assigned_identity" "app_identity" {
  name                = "${var.project}-${var.environment}-identity"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  tags = {
    project     = var.project
    environment = var.environment
  }
}

# Key Vault Access Policy for Managed Identity
resource "azurerm_key_vault_access_policy" "app_identity_policy" {
  key_vault_id = azurerm_key_vault.kv.id
  tenant_id    = var.tenant_id
  object_id    = azurerm_user_assigned_identity.app_identity.principal_id

  secret_permissions = [
    "Get",
    "List"
  ]
}

# Key Vault Access Policy for Current User/Service Principal (for deployment)
data "azurerm_client_config" "current" {}

resource "azurerm_key_vault_access_policy" "deployer_policy" {
  key_vault_id = azurerm_key_vault.kv.id
  tenant_id    = var.tenant_id
  object_id    = data.azurerm_client_config.current.object_id

  secret_permissions = [
    "Get",
    "List",
    "Set",
    "Delete",
    "Purge",
    "Recover"
  ]

  certificate_permissions = [
    "Get",
    "List",
    "Create",
    "Delete"
  ]

  key_permissions = [
    "Get",
    "List",
    "Create",
    "Delete"
  ]
}

# RBAC Role Assignments for Managed Identity

# Cognitive Services User role for Azure OpenAI
resource "azurerm_role_assignment" "openai_user" {
  scope                = azurerm_cognitive_account.openai.id
  role_definition_name = "Cognitive Services User"
  principal_id         = azurerm_user_assigned_identity.app_identity.principal_id
}

# Storage Blob Data Contributor for Blob Storage
resource "azurerm_role_assignment" "storage_contributor" {
  scope                = azurerm_storage_account.storage.id
  role_definition_name = "Storage Blob Data Contributor"
  principal_id         = azurerm_user_assigned_identity.app_identity.principal_id
}

# Search Index Data Contributor for Cognitive Search
resource "azurerm_role_assignment" "search_contributor" {
  scope                = azurerm_search_service.search.id
  role_definition_name = "Search Index Data Contributor"
  principal_id         = azurerm_user_assigned_identity.app_identity.principal_id
}

# Generate random password for SQL Server (stored in Key Vault)
resource "random_password" "sql_admin_password" {
  length  = 24
  special = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

# Store SQL password in Key Vault
resource "azurerm_key_vault_secret" "sql_password" {
  name         = "sql-admin-password"
  value        = random_password.sql_admin_password.result
  key_vault_id = azurerm_key_vault.kv.id

  depends_on = [
    azurerm_key_vault_access_policy.deployer_policy
  ]
}
