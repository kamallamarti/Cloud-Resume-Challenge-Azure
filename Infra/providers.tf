terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.79.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "2.4.0"
    }
  }

  # Using local state file instead of Azure backend
  # This is a workaround for the AuthorizationPermissionMismatch issue
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
  skip_provider_registration = true
  # These are set via environment variables:
  # ARM_CLIENT_ID, ARM_CLIENT_SECRET, ARM_SUBSCRIPTION_ID, ARM_TENANT_ID
}