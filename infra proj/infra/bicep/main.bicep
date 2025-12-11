@description('Project name')
param project string = 'ai-ecom'

@description('Environment (dev, prod)')
param environment string = 'dev'

@description('Azure Region')
param location string = resourceGroup().location

@description('SQL Admin Login')
param sqlAdminLogin string = 'sqladmin'

@secure()
@description('SQL Admin Password')
param sqlAdminPassword string

@description('OpenAI SKU')
param openaiSku string = 'S0'

@description('Search SKU')
param searchSku string = 'standard'

var resourcePrefix = '${project}-${environment}'

// Managed Identity
resource managedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: 'id-${resourcePrefix}'
  location: location
}

// Storage Account
resource storageAccount 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: replace('st${resourcePrefix}', '-', '')
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
}

// Key Vault
resource keyVault 'Microsoft.KeyVault/vaults@2023-02-01' = {
  name: 'kv-${resourcePrefix}'
  location: location
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: subscription().tenantId
    accessPolicies: [] // Use RBAC in production
    enabledForDiskEncryption: true
  }
}

// SQL Server
resource sqlServer 'Microsoft.Sql/servers@2022-05-01-preview' = {
  name: 'sql-${resourcePrefix}'
  location: location
  properties: {
    administratorLogin: sqlAdminLogin
    administratorLoginPassword: sqlAdminPassword
  }
}

// SQL Database
resource sqlDB 'Microsoft.Sql/servers/databases@2022-05-01-preview' = {
  parent: sqlServer
  name: 'sqldb-${resourcePrefix}'
  location: location
  sku: {
    name: 'S0'
    tier: 'Standard'
  }
}

// Redis Cache
resource redis 'Microsoft.Cache/redis@2023-04-01' = {
  name: 'redis-${resourcePrefix}'
  location: location
  properties: {
    sku: {
      name: 'Basic'
      family: 'C'
      capacity: 0
    }
    enableNonSslPort: false
    minimumTlsVersion: '1.2'
  }
}

// Cognitive Search
resource search 'Microsoft.Search/searchServices@2022-09-01' = {
  name: 'search-${resourcePrefix}'
  location: location
  sku: {
    name: searchSku
  }
}

// Azure OpenAI
resource openai 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: 'oai-${resourcePrefix}'
  location: location
  kind: 'OpenAI'
  sku: {
    name: openaiSku
  }
  properties: {
    customSubDomainName: 'oai-${resourcePrefix}'
  }
}

// App Service Plan
resource appServicePlan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: 'asp-${resourcePrefix}'
  location: location
  sku: {
    name: 'B1'
    tier: 'Basic'
  }
  kind: 'linux'
  properties: {
    reserved: true
  }
}

// Backend App
resource backendApp 'Microsoft.Web/sites@2022-09-01' = {
  name: 'app-${resourcePrefix}-api'
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'NODE|18-lts'
      appSettings: [
        {
          name: 'AZURE_OPENAI_ENDPOINT'
          value: openai.properties.endpoint
        }
        {
          name: 'REDIS_HOST'
          value: redis.properties.hostName
        }
      ]
    }
  }
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${managedIdentity.id}': {}
    }
  }
}

// Frontend App
resource frontendApp 'Microsoft.Web/sites@2022-09-01' = {
  name: 'app-${resourcePrefix}-web'
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'NODE|18-lts'
      appCommandLine: 'pm2 serve /home/site/wwwroot --no-daemon --spa'
    }
  }
}

output backendUrl string = 'https://${backendApp.properties.defaultHostName}'
output frontendUrl string = 'https://${frontendApp.properties.defaultHostName}'
