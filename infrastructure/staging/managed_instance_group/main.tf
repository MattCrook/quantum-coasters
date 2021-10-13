module "managed_instance_autoscaling_group" {
  source = "git@github.com:MattCrook/quantum-infrastructure.git"

  project                      = var.project
  instance_type                = "n2-standard-2"
  name                         = "quantum-coasters"
  service_account              = google_service_account.quantum_coasters_sa.email
  address_name                 = "quantum-network"
  zone                         = "us-central1-c"
  max_replicas                 = 5
  min_replicas                 = 2
  region                       = "us-central1"
  compute_resource_policy_name = "quantum-coasters-daily-backup"
  can_ip_forward               = false
  docker_username              = "${file("${path.module}/secrets/docker.username")}"
  docker_password              = "${file("${path.module}/secrets/docker.password")}"
  docker_username_destination  = "/tmp/docker.username"
  docker_password_destination  = "/tmp/docker.password"
  startup_script_file_source   = "${file("${path.module}/scripts/docker_login_startapp.sh")}"
  startup_script_destination   = "/tmp/docker_login_startapp.sh"
  autoscaler_name              = "quantum-coasters-autoscaler"
  https_proxy_name             = "target-https-proxy"
  instance_template_tags       = ["quantum-coasters-production"]
  enable_redirect              = false
  enable_http                  = true
  ssl_certificates             = [google_compute_ssl_certificate.test_cert.self_link]

  private_subnetwork_name                    = "quantum-private-subnetwork"
  private_subnetwork_description             = "Private subnetwork for Quantum Coasters VPC."
  private_subnetwork_network                 = "quantum-coasters-network"
  private_subnetwork_range                   = "10.4.0.0/16"

  public_subnetwork_name                    = "quantum-public-subnetwork"
  public_subnetwork_description             = "Public subnetwork for Quantum Coasters VPC."
  public_subnetwork_network                 = "quantum-coasters-network"
  public_subnetwork_range                   = "10.80.0.0/16"
  public_subnetwork_secondary_ip_range_name = "quantum-public-secondary-subnet-range"
  public_subnetwork_secondary_ip_range      = "240.2.0.0/16"
}
