# Main resource group for the Cloud Resume Challenge
# Updated with new service principal credentials
resource "azurerm_resource_group" "main" {
  name     = var.rg_name
  location = var.rg_location
}

resource "random_string" "main" {
  length  = 8
  special = false
  upper   = false
}
