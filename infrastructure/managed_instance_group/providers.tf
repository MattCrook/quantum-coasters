provider "google" {
  project     = var.project
  region      = var.region
  zone        = var.zone
  credentials = file("default-compute-credentials.json")
}

provider "google-beta" {
  project     = var.project
  region      = var.region
  zone        = var.zone
  credentials = file("default-compute-credentials.json")
}

terraform {
  required_version = ">= 0.13"

  // backend "gcs" {
  //     bucket      = "quantum-core-tf-state"
  //     prefix      = "global/terraform.tfstate"
  //     credentials = "./credentials.json"
  // }
}
