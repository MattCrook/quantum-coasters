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

locals {
  all_ports                 = 0
  tcp_protocol              = "tcp"
  all_ips                   = ["0.0.0.0/0"]
  all_service_account_roles = [
    "roles/compute.instanceAdmin",
    "roles/logging.logWriter",
    "roles/monitoring.metricWriter",
    "roles/monitoring.viewer",
    "roles/stackdriver.resourceMetadata.writer"
  ]
}

resource "random_id" "instance_id" {
  byte_length = 4
}

resource "google_service_account" "quantum_coasters_sa" {
  account_id   = "quantum-coasters-sa-${random_id.instance_id.hex}"
  display_name = "quantum-coasters-compute-sa"
  project      = "${var.project}"
  description  = "Service account for Quantum-Coasters compute instances."
}

// resource "google_service_account_iam_binding" "iam-binding" {
//   service_account_id = "${google_service_account.quantum_coasters_sa.email}"
//   # role               = "roles/compute.instanceAdmin.v1"
//   # role               = "roles/iam.serviceAccountUser"
//   role               = "roles/iam.serviceAccountAdmin"
//   members            = ["user:matt.crook11@gmail.com"]
// }

// resource "google_project_iam_member" "service_account_roles" {
//   for_each = toset(local.all_service_account_roles)

//   project = var.project
//   role    = each.value
//   member  = "serviceAccount:${google_service_account.quantum_coasters_sa.email}"
// }

module "managed_instance_autoscaling_group" {
  source = "git@github.com:MattCrook/quantum-infrastructure.git"

  instance_type                = "e2-medium"
  name                         = "quantum-coasters"
  service_account              = "${google_service_account.quantum_coasters_sa.email}"
  # compute_address_name         = "private-services-access"
  compute_address_name         = "compute-address"
  zone                         = "us-central1-c"
  max_replicas                 = 5
  min_replicas                 = 2
  // server_port                  = 3000
  project                      = "${var.project}"
  region                       = "us-central1"
  compute_resource_policy_name = "quantum-coasters-daily-backup"
  can_ip_forward               = false
  docker_username              = "${file("${path.module}/docker.username")}"
  docker_password              = "${file("${path.module}/docker.password")}"
  private_key                  = "${file("${path.module}/tls.key")}"
  certificate                  = "${file("${path.module}/tls.cert")}"
  autoscaler_name              = "quantum-coasters-autoscaler"
}

// resource "google_compute_firewall" "allow_all" {
//   project     = "${var.project}"
//   name        = "ingress-allow-all"
//   network     = "${data.google_compute_network.default_network.name}"
//   direction   = "INGRESS"
//   description = "Firewall rule allows all traffic with protocols tcp, udp, and icmp from all IPs into port 80 and port 443."

//   source_ranges = "${local.all_ips}"

//   allow {
//     protocol = "${local.tcp_protocol}"
//     ports    = ["80", "443"]
//   }

//   allow {
//     protocol = "icmp"
//   }

//   allow {
//     protocol = "udp"
//   }

//   log_config {
//     metadata = "EXCLUDE_ALL_METADATA"
//   }
// }

// resource "google_compute_firewall" "egress_allow_all" {
//   project     = "${var.project}"
//   name        = "egress-allow-all"
//   network     = "${data.google_compute_network.default_network.name}"
//   direction   = "EGRESS"
//   # priority    = 65535
//   priority    = 1000
//   description = "Firewall rule allows all Egress traffic from all IPs and all ports."


//   allow {
//     protocol = "all"
//   }

//   log_config {
//     metadata = "EXCLUDE_ALL_METADATA"
//   }
// }


// resource "google_compute_firewall" "allow_http" {
//   project     = "${var.project}"
//   name        = "ingress-allow-http"
//   network     = "${data.google_compute_network.default_network.name}"
//   direction   = "INGRESS"
//   description = "Firewall rule allows Ingress traffic on port 80 into VM instances with tag quantum-coasters-production."

//   # source_tags = ["quantum-coasters-production"]
//   target_tags = ["quantum-coasters-production"]

//   allow {
//     protocol = "${local.tcp_protocol}"
//     ports    = ["${var.server_port}"]
//   }

//   log_config {
//     metadata = "EXCLUDE_ALL_METADATA"
//   }
// }

// resource "google_compute_firewall" "allow_https" {
//   project     = "${var.project}"
//   name        = "ingress-allow-https"
//   network     = "${data.google_compute_network.default_network.name}"
//   direction   = "INGRESS"
//   description = "Firewall rule allows Ingress traffic on port 443 into VM instances with tag quantum-coasters-production."

//   # source_tags = ["quantum-coasters-production"]
//   target_tags = ["quantum-coasters-production"]

//   allow {
//     protocol = "${local.tcp_protocol}"
//     ports    = ["443"]
//   }

//   log_config {
//     metadata = "EXCLUDE_ALL_METADATA"
//   }
// }

// resource "google_compute_firewall" "allow_ssh" {
//   project     = "${var.project}"
//   name        = "ingress-allow-https"
//   network     = "${data.google_compute_network.default_network.name}"
//   direction   = "INGRESS"
//   priority    = 1000
//   description = "Firewall rule allows Ingress traffic for SSH on port 22 into VM instances with tag quantum-coasters-production."

//   target_tags = ["quantum-coasters-production"]

//   allow {
//     protocol = "tcp"
//     ports    = ["22"]
//   }

//   log_config {
//     metadata = "EXCLUDE_ALL_METADATA"
//   }
// }
