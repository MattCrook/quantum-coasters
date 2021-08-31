provider "google" {
    project     = var.project_id
    region      = var.region
    zone        = var.zone
    # credentials = file("credentials.json")
}

terraform {
    required_version = ">= 0.13"

    backend "gcs" {
        bucket      = "quantum-core-tf-state"
        prefix      = "global/terraform.tfstate"
        credentials = "./credentials.json"
    }
}
