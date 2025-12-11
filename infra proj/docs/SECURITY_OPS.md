# Security & Operations Guide

## Security Best Practices

### 1. Azure Key Vault Integration

#### Setup Key Vault Access
```bash
# Create Key Vault (if not using Terraform)
az keyvault create \
  --name kv-ai-ecom-dev \
  --resource-group rg-ai-ecom-dev-eastus \
  --location eastus

# Add secrets
az keyvault secret set --vault-name kv-ai-ecom-dev --name "OpenAI-Key" --value "YOUR_KEY"
az keyvault secret set --vault-name kv-ai-ecom-dev --name "SQL-Password" --value "YOUR_PASSWORD"
az keyvault secret set --vault-name kv-ai-ecom-dev --name "Redis-Key" --value "YOUR_KEY"
```

#### Grant Managed Identity Access
```bash
# Get the managed identity principal ID
IDENTITY_ID=$(az identity show \
  --name id-ai-ecom-dev \
  --resource-group rg-ai-ecom-dev-eastus \
  --query principalId -o tsv)

# Grant Key Vault access
az keyvault set-policy \
  --name kv-ai-ecom-dev \
  --object-id $IDENTITY_ID \
  --secret-permissions get list
```

#### Application Code Pattern
```javascript
// services/keyVault.js
const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

const vaultName = process.env.KEYVAULT_NAME;
const url = `https://${vaultName}.vault.azure.net`;

const credential = new DefaultAzureCredential();
const client = new SecretClient(url, credential);

async function getSecret(secretName) {
  const secret = await client.getSecret(secretName);
  return secret.value;
}

module.exports = { getSecret };
```

---

### 2. Managed Identity Configuration

#### Assign Managed Identity to Resources
```bash
# App Service
az webapp identity assign \
  --name app-ai-ecom-dev-api \
  --resource-group rg-ai-ecom-dev-eastus

# Grant SQL Database access
az sql server ad-admin create \
  --resource-group rg-ai-ecom-dev-eastus \
  --server-name sql-ai-ecom-dev \
  --display-name id-ai-ecom-dev \
  --object-id $IDENTITY_ID
```

#### Required RBAC Roles
```bash
# Cognitive Services User (for OpenAI)
az role assignment create \
  --assignee $IDENTITY_ID \
  --role "Cognitive Services User" \
  --scope /subscriptions/{subscription-id}/resourceGroups/rg-ai-ecom-dev-eastus/providers/Microsoft.CognitiveServices/accounts/oai-ai-ecom-dev

# Storage Blob Data Contributor
az role assignment create \
  --assignee $IDENTITY_ID \
  --role "Storage Blob Data Contributor" \
  --scope /subscriptions/{subscription-id}/resourceGroups/rg-ai-ecom-dev-eastus/providers/Microsoft.Storage/storageAccounts/staiecomdev
```

---

### 3. Network Security

#### Virtual Network Integration (Production)
```bash
# Create VNet and subnets
az network vnet create \
  --name vnet-ai-ecom-dev \
  --resource-group rg-ai-ecom-dev-eastus \
  --address-prefix 10.0.0.0/16 \
  --subnet-name subnet-app \
  --subnet-prefix 10.0.1.0/24

# Create subnet for private endpoints
az network vnet subnet create \
  --name subnet-private-endpoints \
  --resource-group rg-ai-ecom-dev-eastus \
  --vnet-name vnet-ai-ecom-dev \
  --address-prefix 10.0.2.0/24
```

#### Private Endpoints (Recommended for Production)
```bash
# SQL Database Private Endpoint
az network private-endpoint create \
  --name pe-sql-ai-ecom-dev \
  --resource-group rg-ai-ecom-dev-eastus \
  --vnet-name vnet-ai-ecom-dev \
  --subnet subnet-private-endpoints \
  --private-connection-resource-id $(az sql server show --name sql-ai-ecom-dev --resource-group rg-ai-ecom-dev-eastus --query id -o tsv) \
  --group-id sqlServer \
  --connection-name sql-connection
```

#### Network Security Groups
```bash
# Create NSG for App Service subnet
az network nsg create \
  --name nsg-app-ai-ecom-dev \
  --resource-group rg-ai-ecom-dev-eastus

# Allow HTTPS inbound
az network nsg rule create \
  --name AllowHTTPS \
  --nsg-name nsg-app-ai-ecom-dev \
  --resource-group rg-ai-ecom-dev-eastus \
  --priority 100 \
  --direction Inbound \
  --access Allow \
  --protocol Tcp \
  --destination-port-ranges 443
```

---

## Monitoring & Observability

### 1. Application Insights Setup

#### Enable Application Insights
```bash
# Create Application Insights
az monitor app-insights component create \
  --app ai-ecom-dev \
  --location eastus \
  --resource-group rg-ai-ecom-dev-eastus \
  --application-type web

# Get instrumentation key
INSTRUMENTATION_KEY=$(az monitor app-insights component show \
  --app ai-ecom-dev \
  --resource-group rg-ai-ecom-dev-eastus \
  --query instrumentationKey -o tsv)

# Configure App Service
az webapp config appsettings set \
  --name app-ai-ecom-dev-api \
  --resource-group rg-ai-ecom-dev-eastus \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY=$INSTRUMENTATION_KEY
```

#### Key Metrics to Monitor
- **Response Time**: API endpoint latency
- **Request Rate**: Requests per second
- **Failure Rate**: 4xx and 5xx errors
- **Dependency Duration**: OpenAI and SQL query times
- **Custom Events**: AI recommendation requests, search queries

### 2. Log Analytics Queries

#### Common Errors Query
```kusto
traces
| where severityLevel >= 3
| where timestamp > ago(1h)
| summarize count() by message, severityLevel
| order by count_ desc
```

#### API Performance Query
```kusto
requests
| where timestamp > ago(24h)
| summarize avg(duration), percentile(duration, 95) by name
| order by avg_duration desc
```

#### OpenAI Usage Tracking
```kusto
dependencies
| where type == "HTTP"
| where target contains "openai.azure.com"
| summarize count(), avg(duration) by bin(timestamp, 1h)
```

---

## Backup & Disaster Recovery

### 1. Azure SQL Backup
```bash
# Configure long-term retention
az sql db ltr-policy set \
  --resource-group rg-ai-ecom-dev-eastus \
  --server sql-ai-ecom-dev \
  --database sqldb-ai-ecom-dev \
  --weekly-retention P4W \
  --monthly-retention P12M \
  --yearly-retention P5Y \
  --week-of-year 1
```

### 2. Redis Cache Backup (Premium tier only)
```bash
# Configure Redis persistence
az redis patch-schedule create \
  --name redis-ai-ecom-prod \
  --resource-group rg-ai-ecom-prod-eastus \
  --schedule-entries '[{"dayOfWeek":"Sunday","startHourUtc":2,"maintenanceWindow":"PT5H"}]'
```

### 3. Blob Storage Backup
```bash
# Enable soft delete
az storage blob service-properties delete-policy update \
  --account-name staiecomdev \
  --enable true \
  --days-retained 30
```

---

## Compliance & Governance

### 1. Azure Policy
- Enforce resource tagging
- Require encryption at rest
- Restrict allowed regions
- Enforce naming conventions

### 2. Security Recommendations
- ✅ Enable Azure Defender for all resources
- ✅ Use managed identities (no passwords in code)
- ✅ Implement least-privilege access (RBAC)
- ✅ Enable audit logging for all resources
- ✅ Use private endpoints for production
- ✅ Implement WAF with Azure Front Door
- ✅ Regular security assessments with Azure Security Center

### 3. Secrets Management Checklist
- [ ] No secrets in source code
- [ ] All secrets stored in Key Vault
- [ ] Managed identities configured
- [ ] Key rotation policy defined
- [ ] Access policies reviewed quarterly
