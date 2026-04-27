terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# --- Core Resilience Resource Group ---
resource "azurerm_resource_group" "bcdr_core" {
  name     = "rg-bcdr-platform-prod-001"
  location = "UK South"
  tags = {
    Environment = "Production"
    Role        = "Resilience-Orchestrator"
    Impact      = "Critical"
  }
}

# --- Global Traffic Management ---
resource "azurerm_traffic_manager_profile" "global_bcdr" {
  name                   = "tm-bcdr-global-dtrio"
  resource_group_name    = azurerm_resource_group.bcdr_core.name
  traffic_routing_method = "Priority"

  dns_config {
    relative_name = "bcdr-accelerator-prod"
    ttl           = 60
  }

  monitor_config {
    protocol                     = "HTTPS"
    port                         = 443
    path                         = "/health"
    interval_in_seconds          = 10
    timeout_in_seconds           = 5
    tolerated_number_of_failures = 3
  }
}

# --- Recovery Metadata Database ---
resource "azurerm_postgresql_flexible_server" "resilience_db" {
  name                   = "psql-bcdr-metadata-prod"
  resource_group_name    = azurerm_resource_group.bcdr_core.name
  location               = azurerm_resource_group.bcdr_core.location
  version                = "13"
  administrator_login    = "bcdr_admin"
  administrator_password = var.db_password
  storage_mb             = 131072
  sku_name               = "GP_Standard_D4s_v3"
}

# --- Kubernetes Persistence Cluster ---
module "aks_bcdr" {
  source              = "./modules/aks"
  cluster_name        = "aks-bcdr-ops"
  resource_group_name = azurerm_resource_group.bcdr_core.name
  location            = azurerm_resource_group.bcdr_core.location
  node_count          = 3
}
