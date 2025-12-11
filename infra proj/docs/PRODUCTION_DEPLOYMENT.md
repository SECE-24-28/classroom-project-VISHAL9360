# Production Deployment Guide

## Overview

This guide covers deploying the AI E-commerce Platform to Azure in a production-ready configuration with VNet isolation, private endpoints, and enterprise security.

## Prerequisites

### Azure Requirements
- Azure subscription with appropriate permissions
- Azure CLI installed (`az --version`)
- Terraform 1.4+ installed
- GitHub repository with OIDC configured

### Required Permissions
- **Subscription**: Contributor or Owner
- **Azure AD**: Ability to create service principals
- **Resource Provider**: Microsoft.Network, Microsoft.Sql, Microsoft.Web, Microsoft.KeyVault

## Architecture Overview

The production deployment includes:
- **VNet Isolation**: 3 subnets (app, database, private endpoints)
- **Private Endpoints**: SQL, Redis, Storage, Key Vault
- **Managed Identities**: Password-less authentication
- **Monitoring**: Application Insights + Log Analytics
- **Security**: NSGs, private DNS, Key Vault secrets

## Step 1: Configure GitHub OIDC

### Create Azure AD Application

```bash
# Login to Azure
az login

# Create service principal for OIDC
az ad app create --display-name "GitHub-OIDC-aiecom"

# Get Application ID
APP_ID=$(az ad app list --display-name "GitHub-OIDC-aiecom" --query [0].appId -o tsv)

# Create service principal
az ad sp create --id $APP_ID

# Get Object ID
OBJECT_ID=$(az ad sp list --filter "appId eq '$APP_ID'" --query [0].id -o tsv)

# Create federated credential
az ad app federated-credential create \
  --id $APP_ID \
  --parameters '{
    "name": "GitHub-Actions",
    "issuer": "https://token.actions.githubusercontent.com",
    "subject": "repo:YOUR_ORG/YOUR_REPO:ref:refs/heads/main",
    "audiences": ["api://AzureADTokenExchange"]
  }'

# Assign Contributor role
az role assignment create \
  --assignee $OBJECT_ID \
  --role Contributor \
  --scope /subscriptions/YOUR_SUBSCRIPTION_ID
```

### Configure GitHub Secrets

Add these secrets to your GitHub repository:

```
AZURE_CLIENT_ID          = <Application ID from above>
AZURE_TENANT_ID          = <Your Azure Tenant ID>
AZURE_SUBSCRIPTION_ID    = <Your Subscription ID>
```

## Step 2: Configure Terraform Backend

### Create Storage Account for State

```bash
# Variables
RESOURCE_GROUP_NAME="tfstate-rg"
STORAGE_ACCOUNT_NAME="tfstate$(openssl rand -hex 4)"
CONTAINER_NAME="tfstate"

# Create resource group
az group create --name $RESOURCE_GROUP_NAME --location eastus

# Create storage account
az storage account create \
  --resource-group $RESOURCE_GROUP_NAME \
  --name $STORAGE_ACCOUNT_NAME \
  --sku Standard_LRS \
  --encryption-services blob

# Create blob container
az storage container create \
  --name $CONTAINER_NAME \
  --account-name $STORAGE_ACCOUNT_NAME
```

### Update provider.tf

Uncomment and configure the backend block in `provider.tf`:

```hcl
backend "azurerm" {
  resource_group_name  = "tfstate-rg"
  storage_account_name = "tfstate<your-unique-id>"
  container_name       = "tfstate"
  key                  = "aiecom.terraform.tfstate"
}
```

## Step 3: Configure Variables

### Create terraform.tfvars

```bash
cd infra/terraform
cp .tfvars.example demo.tfvars
```

Edit `demo.tfvars`:

```hcl
subscription_id = "YOUR_SUBSCRIPTION_ID"
tenant_id       = "YOUR_TENANT_ID"
location        = "eastus"
project         = "aiecom"
environment     = "demo"

# Production SKUs
app_service_plan_sku = "S1"
sql_sku_name         = "S2"
redis_sku_name       = "Standard"
redis_capacity       = 1
search_sku           = "basic"
openai_sku           = "S0"

# Security
enable_private_endpoints = true
enable_public_access     = false
```

## Step 4: Deploy Infrastructure

### Initialize Terraform

```bash
cd infra/terraform

terraform init
```

### Plan Deployment

```bash
terraform plan -var-file="demo.tfvars" -out=tfplan
```

Review the plan carefully. Expected resources:
- 1 Resource Group
- 1 VNet with 3 subnets
- 2 NSGs
- 4 Private DNS zones
- 1 Key Vault
- 1 Storage Account
- 1 SQL Server + Database
- 1 Redis Cache
- 1 Cognitive Search
- 1 Azure OpenAI
- 2 App Services
- 1 Log Analytics Workspace
- 1 Application Insights
- 5+ Private Endpoints
- Managed Identity + RBAC roles

### Apply Configuration

```bash
terraform apply tfplan
```

⏱️ **Deployment Time**: 15-20 minutes

## Step 5: Post-Deployment Configuration

### Retrieve Outputs

```bash
terraform output
```

Save these values:
- `key_vault_name`
- `backend_url`
- `frontend_url`
- `managed_identity_client_id`

### Configure Additional Secrets

```bash
KEY_VAULT_NAME=$(terraform output -raw key_vault_name)

# Add any application-specific secrets
az keyvault secret set \
  --vault-name $KEY_VAULT_NAME \
  --name "custom-api-key" \
  --value "YOUR_VALUE"
```

## Step 6: Deploy Applications

### Backend Deployment

```bash
cd ../../backend

# Build and deploy
zip -r backend.zip .
az webapp deployment source config-zip \
  --resource-group aiecom-demo-rg \
  --name aiecom-demo-appsvc-api \
  --src backend.zip
```

### Frontend Deployment

```bash
cd ../frontend

# Build production bundle
npm run build

# Deploy
cd dist
zip -r frontend.zip .
az webapp deployment source config-zip \
  --resource-group aiecom-demo-rg \
  --name aiecom-demo-appsvc-web \
  --src frontend.zip
```

## Step 7: Verification

### Test Endpoints

```bash
BACKEND_URL=$(terraform output -raw backend_url)
FRONTEND_URL=$(terraform output -raw frontend_url)

# Test backend health
curl $BACKEND_URL

# Test search endpoint
curl "$BACKEND_URL/api/search?q=test"
```

### Check Monitoring

```bash
# View Application Insights
az monitor app-insights component show \
  --app aiecom-demo-appinsights \
  --resource-group aiecom-demo-rg
```

### Verify Private Endpoints

```bash
# List private endpoints
az network private-endpoint list \
  --resource-group aiecom-demo-rg \
  --output table
```

## Security Hardening

### Enable Azure Defender

```bash
az security pricing create \
  --name SqlServers \
  --tier standard

az security pricing create \
  --name AppServices \
  --tier standard

az security pricing create \
  --name KeyVaults \
  --tier standard
```

### Configure Alerts

Alerts are automatically created for:
- SQL DTU > 80%
- App Service CPU > 80%
- HTTP 5xx errors > 10/min

Update email in `monitoring.tf` action group.

### Enable Diagnostic Logs

All resources have diagnostic settings configured to send logs to Log Analytics.

## Backup & Disaster Recovery

### SQL Database Backups

Automated backups are enabled with 90-day retention.

```bash
# Verify backup policy
az sql db show \
  --resource-group aiecom-demo-rg \
  --server aiecom-demo-sql \
  --name aiecom-demo-db \
  --query "retentionPolicy"
```

### Storage Account Soft Delete

Enabled with 30-day retention for blob recovery.

## Monitoring & Operations

### View Logs

```bash
# Query Application Insights
az monitor app-insights query \
  --app aiecom-demo-appinsights \
  --analytics-query "requests | summarize count() by resultCode"
```

### Access Metrics

Navigate to Azure Portal:
1. Resource Group: `aiecom-demo-rg`
2. Application Insights: `aiecom-demo-appinsights`
3. View dashboards and metrics

## Troubleshooting

### Private Endpoint DNS Issues

If services can't resolve private endpoints:

```bash
# Verify DNS zone links
az network private-dns link vnet list \
  --resource-group aiecom-demo-rg \
  --zone-name privatelink.database.windows.net
```

### Managed Identity Access Issues

```bash
# Verify role assignments
az role assignment list \
  --assignee $(terraform output -raw managed_identity_principal_id)
```

### Key Vault Access Denied

```bash
# Check access policies
az keyvault show \
  --name $(terraform output -raw key_vault_name) \
  --query "properties.accessPolicies"
```

## Cost Management

### Set Budget Alerts

```bash
az consumption budget create \
  --budget-name aiecom-monthly \
  --amount 1000 \
  --time-grain Monthly \
  --category Cost \
  --resource-group aiecom-demo-rg
```

### Monitor Costs

```bash
# View current costs
az consumption usage list \
  --start-date 2024-01-01 \
  --end-date 2024-01-31
```

## Rollback Procedure

If deployment fails or issues occur:

```bash
# Destroy infrastructure
terraform destroy -var-file="demo.tfvars"

# Or delete resource group
az group delete --name aiecom-demo-rg --yes
```

## Next Steps

1. **Configure Custom Domain**: Point your domain to App Services
2. **SSL Certificates**: Enable custom SSL (free with App Service)
3. **Scale Testing**: Run load tests to verify performance
4. **CI/CD**: Enable automated deployments via GitHub Actions
5. **Monitoring**: Set up custom dashboards and alerts

## Support

For issues:
- Check Application Insights logs
- Review Terraform state: `terraform show`
- Consult Azure documentation
- Contact Azure support for platform issues
