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
  private_key                  = "${file("${path.module}/ssl.key")}"
  certificate                  = "${file("${path.module}/ssl.cert")}"
  autoscaler_name              = "quantum-coasters-autoscaler"
  https_proxy_name             = "https-proxy"
  instance_template_tags       = ["quantum-coasters-production"]

  private_subnetwork_name                    = "quantum-private-subnetwork"
  private_subnetwork_description             = "Private subnetwork for Quantum Coasters VPC."
  private_subnetwork_network                 = "quantum-coasters-network"
  private_subnetwork_range                   = "10.2.0.0/16"
  private_subnetwork_secondary_ip_range_name = "quantum-private-secondary-subnet-range"
  private_subnetwork_secondary_ip_range      = "192.168.10.0/24"

  public_subnetwork_name                    = "quantum-public-subnetwork"
  public_subnetwork_description             = "Public subnetwork for Quantum Coasters VPC."
  public_subnetwork_network                 = "quantum-coasters-network"
  public_subnetwork_range                   = "10.0.1.0/24"
  public_subnetwork_secondary_ip_range_name = "quantum-public-secondary-subnet-range"
  public_subnetwork_secondary_ip_range      = "10.0.0.0/24"
}
