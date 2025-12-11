# Project Handoff & Confidentiality Guide

## Overview

This document provides guidelines for securely handing off the AI E-commerce Platform infrastructure to external teams, vendors, or new team members while maintaining security and confidentiality.

## Access Control

### Repository Access

**GitHub Repository Settings:**
- ✅ Set repository to **Private**
- ✅ Enable branch protection on `main` and `develop`
- ✅ Require pull request reviews (minimum 2 approvers)
- ✅ Require status checks to pass before merging
- ✅ Restrict who can push to protected branches

**Team Access Levels:**
```
Owners:        Core team only (2-3 people)
Maintainers:   Senior developers (3-5 people)
Contributors:  Development team (read + PR access)
Viewers:       Stakeholders (read-only)
```

### Azure Access

**Subscription-Level RBAC:**
```bash
# Production subscription - minimal access
Owner:              1-2 people (emergency only)
Contributor:        CI/CD service principal only
Reader:             Development team

# Development subscription - broader access
Contributor:        Development team
Reader:             QA team
```

**Resource Group-Level:**
```bash
# Separate RGs for different environments
rg-aiecom-prod-*    → Production (locked down)
rg-aiecom-staging-* → Staging (dev team access)
rg-aiecom-dev-*     → Development (full access)
```

## Confidentiality Requirements

### Non-Disclosure Agreement (NDA)

**Required for:**
- External vendors
- Contractors
- Consultants
- New team members with access to production

**NDA Must Cover:**
1. Infrastructure architecture details
2. Security configurations
3. API keys and credentials
4. Customer data access
5. Business logic and algorithms
6. Cost and pricing information

**Template Clauses:**
```
- Confidential information definition
- Non-disclosure obligations (duration: 3-5 years)
- Permitted disclosures (legal requirements only)
- Return of materials upon termination
- Remedies for breach
```

### Sensitive Information Classification

| Classification | Examples | Access Level |
|----------------|----------|--------------|
| **Public** | Architecture diagrams (high-level), README | Anyone |
| **Internal** | Detailed configs, cost estimates | Team members |
| **Confidential** | Terraform state, tfvars files | Core team + CI/CD |
| **Restricted** | Production credentials, customer data | Owners only |

## Handoff Procedures

### To External Vendor

**Pre-Handoff:**
1. ✅ Execute NDA
2. ✅ Create temporary Azure subscription (isolated)
3. ✅ Provide read-only access initially
4. ✅ Document scope of work clearly
5. ✅ Set up audit logging

**During Handoff:**
```bash
# Create temporary resource group
az group create --name rg-vendor-sandbox --location eastus

# Assign limited role
az role assignment create \
  --assignee vendor@example.com \
  --role "Reader" \
  --scope /subscriptions/TEMP_SUB_ID/resourceGroups/rg-vendor-sandbox

# Set expiration (if supported)
# Use Azure AD Privileged Identity Management for time-bound access
```

**Post-Handoff:**
1. ✅ Revoke access after project completion
2. ✅ Rotate all credentials they had access to
3. ✅ Review audit logs for unauthorized access
4. ✅ Confirm deletion of local copies

### To New Team Member

**Onboarding Checklist:**
- [ ] Background check completed
- [ ] NDA signed (if contractor)
- [ ] Security training completed
- [ ] GitHub account added to team
- [ ] Azure AD account provisioned
- [ ] MFA enabled
- [ ] Access granted via groups (not individual)
- [ ] Initial access is read-only
- [ ] Escalation path documented

**Access Provisioning:**
```bash
# Add to Azure AD group
az ad group member add \
  --group "AI-Ecom-Developers" \
  --member-id NEW_USER_OBJECT_ID

# RBAC is inherited from group membership
# No individual role assignments
```

## Secrets Management

### Never Share Directly

**❌ Do NOT:**
- Email credentials
- Share in Slack/Teams
- Commit to Git
- Store in plain text files
- Share via screenshot

**✅ Do:**
- Use Azure Key Vault
- Share via secure password manager (1Password, LastPass)
- Use time-limited SAS tokens
- Rotate after sharing
- Use just-in-time access

### Credential Rotation Schedule

| Credential Type | Rotation Frequency | Owner |
|-----------------|-------------------|-------|
| SQL Admin Password | 90 days | DBA team |
| Service Principal Secrets | 180 days | DevOps team |
| API Keys (OpenAI, Search) | 90 days | Platform team |
| Storage Account Keys | 90 days | DevOps team |
| Personal Access Tokens | 30 days | Individual |

### Emergency Credential Rotation

If credentials are compromised:

```bash
# 1. Immediately rotate SQL password
az keyvault secret set \
  --vault-name aiecom-prod-kv \
  --name sql-admin-password \
  --value "$(openssl rand -base64 32)"

# 2. Regenerate storage keys
az storage account keys renew \
  --account-name aiecomprodstg \
  --key primary

# 3. Revoke compromised service principal
az ad sp credential reset \
  --id APP_ID

# 4. Review audit logs
az monitor activity-log list \
  --start-time 2024-01-01T00:00:00Z \
  --resource-group aiecom-prod-rg
```

## Audit & Compliance

### Enable Logging

**Azure Activity Log:**
```bash
# Export to storage account
az monitor log-profiles create \
  --name default \
  --location eastus \
  --locations eastus westus \
  --categories Write Delete Action \
  --enabled true \
  --days 365 \
  --storage-account-id /subscriptions/.../aiecomauditlogs
```

**Key Vault Auditing:**
```bash
# Diagnostic settings already configured in Terraform
# Review logs in Log Analytics
az monitor log-analytics query \
  --workspace aiecom-prod-law \
  --analytics-query "AzureDiagnostics | where ResourceProvider == 'MICROSOFT.KEYVAULT'"
```

### Regular Access Reviews

**Quarterly Review:**
1. List all users with access
2. Verify each user still requires access
3. Remove inactive accounts
4. Review service principal permissions
5. Check for orphaned resources

```bash
# List role assignments
az role assignment list \
  --resource-group aiecom-prod-rg \
  --output table

# Find inactive users (last sign-in > 90 days)
az ad user list \
  --query "[?signInActivity.lastSignInDateTime < '2024-01-01']"
```

## Data Protection

### Customer Data Handling

**Rules:**
1. Never download production data to local machines
2. Use anonymized data for development
3. Access production data only via Azure Portal (with audit)
4. No screenshots of customer data
5. Delete test data after use

**Data Minimization:**
```sql
-- Create anonymized view for development
CREATE VIEW dbo.Users_Anonymized AS
SELECT 
    UserID,
    CONCAT('User', UserID) AS Username,
    'user@example.com' AS Email,
    CreatedDate
FROM dbo.Users;
```

### Backup Security

**Backup Access:**
- Stored in separate subscription
- Different admin credentials
- Encrypted at rest
- Retention: 90 days (configurable)

```bash
# Verify backup encryption
az sql db show \
  --resource-group aiecom-prod-rg \
  --server aiecom-prod-sql \
  --name aiecom-prod-db \
  --query "transparentDataEncryption"
```

## Incident Response

### Security Breach Protocol

**Immediate Actions (within 1 hour):**
1. Isolate affected resources
2. Revoke compromised credentials
3. Enable additional logging
4. Notify security team
5. Document timeline

**Investigation (within 24 hours):**
1. Review audit logs
2. Identify scope of breach
3. Assess data exposure
4. Determine root cause
5. Implement fixes

**Remediation:**
```bash
# Lock down resource group
az lock create \
  --name emergency-lock \
  --lock-type CanNotDelete \
  --resource-group aiecom-prod-rg

# Disable public access
az sql server update \
  --resource-group aiecom-prod-rg \
  --name aiecom-prod-sql \
  --set publicNetworkAccess=Disabled
```

## Offboarding

### Employee/Contractor Departure

**Immediate (Day 0):**
- [ ] Disable Azure AD account
- [ ] Revoke GitHub access
- [ ] Remove from all groups
- [ ] Invalidate personal access tokens
- [ ] Change shared passwords they knew

**Within 24 Hours:**
- [ ] Review their recent activity
- [ ] Transfer ownership of resources
- [ ] Update documentation
- [ ] Rotate service credentials they accessed

**Within 1 Week:**
- [ ] Complete access review
- [ ] Archive their work
- [ ] Update team contact lists

```bash
# Disable user account
az ad user update \
  --id user@example.com \
  --account-enabled false

# Remove all role assignments
az role assignment delete \
  --assignee user@example.com
```

## Vendor Management

### Approved Vendors List

| Vendor | Purpose | Access Level | Review Date |
|--------|---------|--------------|-------------|
| Microsoft | Azure Platform | N/A | Ongoing |
| GitHub | Code Repository | Admin | Quarterly |
| [Add vendors] | [Purpose] | [Level] | [Date] |

### Vendor Security Requirements

**Minimum Standards:**
1. SOC 2 Type II certification
2. ISO 27001 compliance
3. GDPR compliance (if applicable)
4. Regular security audits
5. Incident response plan
6. Data encryption at rest and in transit

## Compliance Checklist

- [ ] All team members have signed NDAs
- [ ] Repository is private
- [ ] Branch protection enabled
- [ ] MFA enforced for all users
- [ ] Audit logging enabled
- [ ] Secrets in Key Vault only
- [ ] No credentials in code
- [ ] Regular access reviews scheduled
- [ ] Incident response plan documented
- [ ] Backup and recovery tested

## Contact Information

**Security Issues:**
- Email: security@company.com
- On-call: [Phone number]
- Escalation: [Manager contact]

**Access Requests:**
- Submit via: [Ticketing system]
- Approval required from: [Role]
- SLA: 24-48 hours

---

**Document Version**: 1.0  
**Last Updated**: 2024-12-02  
**Owner**: Security Team  
**Review Frequency**: Quarterly
