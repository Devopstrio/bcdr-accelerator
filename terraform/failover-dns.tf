terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

# --- Traffic Manager for Global DNS Failover ---
resource "azurerm_traffic_manager_profile" "global_dns" {
  name                   = "tm-bcdr-app-prod"
  resource_group_name    = "rg-bcdr-mgmt-prod"
  traffic_routing_method = "Priority"

  dns_config {
    relative_name = "bcdr-enterprise"
    ttl           = 60
  }

  monitor_config {
    protocol                     = "HTTPS"
    port                         = 443
    path                         = "/health"
    interval_in_seconds          = 10
    timeout_in_seconds           = 5
    tolerated_number_of_failures = 2
  }
}

resource "azurerm_traffic_manager_azure_endpoint" "primary" {
  name               = "endpoint-primary"
  profile_id         = azurerm_traffic_manager_profile.global_dns.id
  target_resource_id = "/subscriptions/.../primary-alb"
  weight             = 100
  priority           = 1
}

resource "azurerm_traffic_manager_azure_endpoint" "secondary" {
  name               = "endpoint-secondary"
  profile_id         = azurerm_traffic_manager_profile.global_dns.id
  target_resource_id = "/subscriptions/.../secondary-alb"
  weight             = 100
  priority           = 2
}
