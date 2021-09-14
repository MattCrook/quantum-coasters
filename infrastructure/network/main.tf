provider "google" {
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

resource "google_compute_network" "vpc_network" {
  project                 = "${var.project}"
  name                    = "${var.network_name}"
  description             = "${var.network_description}"
  auto_create_subnetworks = false
  routing_mode            = "REGIONAL"
  mtu                     = 1500
}

resource "google_compute_subnetwork" "default" {
  name          = "usc1-subnet"
  ip_cidr_range = "10.0.0.0/16"
  region        = "us-central1"
  network       = "${google_compute_network.vpc_network.id}"
}

resource "google_compute_address" "internal_with_subnet_and_address" {
  name         = "usc1-internal-address"
  subnetwork   = "${google_compute_subnetwork.vpc_network.id}"
  address_type = "INTERNAL"
  address      = "10.0.42.42"
  region       = "us-central1"
}
