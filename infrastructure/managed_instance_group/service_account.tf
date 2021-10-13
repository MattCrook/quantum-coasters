resource "random_id" "instance_id" {
  byte_length = 4
}

resource "google_service_account" "quantum_coasters_sa" {
  account_id   = "quantum-coasters-sa-${random_id.instance_id.hex}"
  display_name = "quantum-coasters-compute-sa"
  project      = "${var.project}"
  description  = "Service account for Quantum-Coasters compute instances."
}
