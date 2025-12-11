# Cognitive Search
resource "azurerm_search_service" "search" {
  name                = local.naming.search
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = var.search_sku
  partition_count     = 1
  replica_count       = 1
  
  public_network_access_enabled = var.enable_public_access

  tags = {
    project     = var.project
    environment = var.environment
  }
}

# Azure OpenAI (Cognitive Services)
resource "azurerm_cognitive_account" "openai" {
  name                = local.naming.openai
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  kind                = "OpenAI"
  sku_name            = var.openai_sku
  
  public_network_access_enabled = var.enable_public_access

  tags = {
    project     = var.project
    environment = var.environment
  }
}
