# Deployment Checklist

## Pre-Deployment

### Azure Prerequisites
- [ ] Azure subscription active
- [ ] Azure CLI installed and configured
- [ ] Terraform or Bicep CLI installed
- [ ] Appropriate permissions (Contributor role minimum)

### Repository Setup
- [ ] Code cloned locally
- [ ] Environment variables configured
- [ ] Secrets prepared (but not committed!)

---

## Infrastructure Deployment

### Step 1: Azure Login
```bash
az login
az account set --subscription "YOUR_SUBSCRIPTION_ID"
```

### Step 2: Deploy Infrastructure (Choose Terraform OR Bicep)

#### Option A: Terraform
```bash
cd infra/terraform
terraform init
cp .tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
terraform plan -var-file="terraform.tfvars"
terraform apply -var-file="terraform.tfvars"
```

#### Option B: Bicep
```bash
cd infra/bicep
az group create --name rg-ai-ecom-dev-eastus --location eastus
cp parameters.example.json parameters.json
# Edit parameters.json with your values
az deployment group create \
  --resource-group rg-ai-ecom-dev-eastus \
  --template-file main.bicep \
  --parameters parameters.json
```

- [ ] Infrastructure deployed successfully
- [ ] Note resource names and URLs

---

## Security Configuration

### Step 3: Configure Key Vault Secrets
```bash
# Get Key Vault name from Terraform output or Azure Portal
VAULT_NAME="kv-ai-ecom-dev"

# Add OpenAI credentials
az keyvault secret set \
  --vault-name $VAULT_NAME \
  --name "OpenAI-Key" \
  --value "YOUR_AZURE_OPENAI_KEY"

az keyvault secret set \
  --vault-name $VAULT_NAME \
  --name "OpenAI-Endpoint" \
  --value "https://YOUR_RESOURCE.openai.azure.com"

# Add Search credentials
az keyvault secret set \
  --vault-name $VAULT_NAME \
  --name "Search-Key" \
  --value "YOUR_SEARCH_KEY"

# Add SQL password (if not set during deployment)
az keyvault secret set \
  --vault-name $VAULT_NAME \
  --name "SQL-Password" \
  --value "YOUR_SECURE_PASSWORD"

# Add Redis connection string
az keyvault secret set \
  --vault-name $VAULT_NAME \
  --name "Redis-ConnectionString" \
  --value "YOUR_REDIS_CONNECTION_STRING"
```

- [ ] All secrets added to Key Vault
- [ ] Verified secrets are accessible

### Step 4: Configure Managed Identity Access
```bash
# Get managed identity principal ID
IDENTITY_ID=$(az identity show \
  --name id-ai-ecom-dev \
  --resource-group rg-ai-ecom-dev-eastus \
  --query principalId -o tsv)

# Grant Key Vault access
az keyvault set-policy \
  --name $VAULT_NAME \
  --object-id $IDENTITY_ID \
  --secret-permissions get list

# Grant Cognitive Services access
az role assignment create \
  --assignee $IDENTITY_ID \
  --role "Cognitive Services User" \
  --scope /subscriptions/YOUR_SUBSCRIPTION_ID/resourceGroups/rg-ai-ecom-dev-eastus/providers/Microsoft.CognitiveServices/accounts/oai-ai-ecom-dev
```

- [ ] Managed identity has Key Vault access
- [ ] Managed identity has Cognitive Services access

---

## Application Deployment

### Step 5: Deploy Backend
```bash
cd backend

# Option A: Deploy to App Service
az webapp up \
  --name app-ai-ecom-dev-api \
  --resource-group rg-ai-ecom-dev-eastus \
  --runtime "NODE:18-lts"

# Option B: Deploy via Docker
docker build -t ai-ecom-backend .
# Push to Azure Container Registry and deploy
```

- [ ] Backend deployed successfully
- [ ] Backend URL accessible

### Step 6: Configure Backend Environment Variables
```bash
az webapp config appsettings set \
  --name app-ai-ecom-dev-api \
  --resource-group rg-ai-ecom-dev-eastus \
  --settings \
    KEYVAULT_NAME=$VAULT_NAME \
    AZURE_OPENAI_ENDPOINT="@Microsoft.KeyVault(SecretUri=https://$VAULT_NAME.vault.azure.net/secrets/OpenAI-Endpoint/)" \
    AZURE_OPENAI_KEY="@Microsoft.KeyVault(SecretUri=https://$VAULT_NAME.vault.azure.net/secrets/OpenAI-Key/)"
```

- [ ] Environment variables configured
- [ ] Key Vault references working

### Step 7: Deploy Frontend
```bash
cd frontend

# Build production bundle
npm run build

# Deploy to App Service
az webapp up \
  --name app-ai-ecom-dev-web \
  --resource-group rg-ai-ecom-dev-eastus \
  --runtime "NODE:18-lts"

# Configure SPA routing
az webapp config set \
  --name app-ai-ecom-dev-web \
  --resource-group rg-ai-ecom-dev-eastus \
  --startup-file "pm2 serve /home/site/wwwroot/dist --no-daemon --spa"
```

- [ ] Frontend deployed successfully
- [ ] Frontend URL accessible

---

## Post-Deployment Verification

### Step 8: Test Endpoints
```bash
# Get URLs
BACKEND_URL=$(az webapp show --name app-ai-ecom-dev-api --resource-group rg-ai-ecom-dev-eastus --query defaultHostName -o tsv)
FRONTEND_URL=$(az webapp show --name app-ai-ecom-dev-web --resource-group rg-ai-ecom-dev-eastus --query defaultHostName -o tsv)

# Test backend health
curl https://$BACKEND_URL

# Test search endpoint
curl "https://$BACKEND_URL/api/search?q=test"
```

- [ ] Backend health check passes
- [ ] API endpoints responding
- [ ] Frontend loads successfully
- [ ] Chat functionality works
- [ ] Search functionality works

### Step 9: Configure Monitoring
```bash
# Enable Application Insights
az monitor app-insights component create \
  --app ai-ecom-dev \
  --location eastus \
  --resource-group rg-ai-ecom-dev-eastus

# Link to App Services
INSTRUMENTATION_KEY=$(az monitor app-insights component show \
  --app ai-ecom-dev \
  --resource-group rg-ai-ecom-dev-eastus \
  --query instrumentationKey -o tsv)

az webapp config appsettings set \
  --name app-ai-ecom-dev-api \
  --resource-group rg-ai-ecom-dev-eastus \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY=$INSTRUMENTATION_KEY
```

- [ ] Application Insights configured
- [ ] Telemetry flowing
- [ ] Dashboards accessible

---

## CI/CD Setup (Optional)

### Step 10: Configure GitHub Secrets
Add these secrets to your GitHub repository:

```
AZURE_CREDENTIALS          # Service principal JSON
ARM_CLIENT_ID              # From service principal
ARM_CLIENT_SECRET          # From service principal
ARM_SUBSCRIPTION_ID        # Your subscription ID
ARM_TENANT_ID              # Your tenant ID
ACR_NAME                   # Container registry name (if using)
```

- [ ] GitHub secrets configured
- [ ] Workflows enabled
- [ ] Test deployment pipeline

---

## Security Hardening (Production)

### Step 11: Network Security
```bash
# Create VNet (if not using Terraform)
az network vnet create \
  --name vnet-ai-ecom-dev \
  --resource-group rg-ai-ecom-dev-eastus \
  --address-prefix 10.0.0.0/16

# Configure private endpoints (recommended for production)
# See docs/SECURITY_OPS.md for detailed commands
```

- [ ] VNet configured (if applicable)
- [ ] Private endpoints enabled (production only)
- [ ] NSG rules configured

### Step 12: Enable Azure Defender
```bash
az security pricing create \
  --name VirtualMachines \
  --tier standard

az security pricing create \
  --name SqlServers \
  --tier standard
```

- [ ] Azure Defender enabled
- [ ] Security alerts configured

---

## Final Verification

### Step 13: End-to-End Testing
- [ ] User can access frontend
- [ ] Search returns results
- [ ] Chat assistant responds
- [ ] Recommendations work
- [ ] No console errors
- [ ] Performance acceptable (<2s page load)

### Step 14: Cost Monitoring
```bash
# Set up budget alert
az consumption budget create \
  --budget-name ai-ecom-monthly \
  --amount 100 \
  --time-grain Monthly \
  --category Cost
```

- [ ] Budget alerts configured
- [ ] Cost tracking enabled
- [ ] Resource tags applied

---

## Rollback Plan

If deployment fails:

```bash
# Terraform rollback
cd infra/terraform
terraform destroy -var-file="terraform.tfvars"

# Or delete resource group
az group delete --name rg-ai-ecom-dev-eastus --yes
```

---

## Success Criteria

✅ All infrastructure deployed  
✅ All secrets in Key Vault  
✅ Backend API responding  
✅ Frontend accessible  
✅ AI features working  
✅ Monitoring enabled  
✅ Costs within budget  

---

## Next Steps After Deployment

1. **Load Real Data**: Import product catalog to Azure SQL
2. **Index Products**: Configure Cognitive Search index
3. **Train AI**: Fine-tune OpenAI model with your data
4. **Configure Domain**: Point custom domain to frontend
5. **SSL Certificate**: Enable custom SSL (free with App Service)
6. **Scale Testing**: Run load tests to verify performance
7. **Backup Verification**: Test restore procedures

---

## Support Resources

- **Azure Documentation**: https://docs.microsoft.com/azure
- **Terraform Azure Provider**: https://registry.terraform.io/providers/hashicorp/azurerm
- **Azure OpenAI**: https://learn.microsoft.com/azure/ai-services/openai/
- **Project Documentation**: See `/docs` folder

---

**🎉 Deployment Complete!** Your AI e-commerce platform is now live on Azure.
