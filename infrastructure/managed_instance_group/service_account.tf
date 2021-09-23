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
