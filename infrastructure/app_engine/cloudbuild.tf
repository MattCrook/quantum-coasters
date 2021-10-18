resource "google_cloudbuild_trigger" "filename-trigger" {
  name        = "quantum-coasters-cloudbuild-trigger"
  description = "Configuration for an automated build in response to source repository changes."

  trigger_template {
    branch_name = "master"
    repo_name   = "quantum-coasters"
  }

  filename = "cloudbuild.yaml"
}

resource "random_id" "instance_id" {
  byte_length = 2
}

resource "google_service_account" "cloudbuild_service_account" {
  project      = var.project_id
  account_id   = "cloudbuild-service-account-${${random_id.instance_id.hex}"
  display_name = "quantumcoasters-cloudbuild-serviceaccount"
  description  = "Service account for Quantum Coasters CloudBuild services."
}

resource "google_project_iam_member" "act_as" {
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.cloudbuild_service_account.email}"
}

resource "google_project_iam_member" "logs_writer" {
  role    = "roles/logging.logWriter"
  member  = "serviceAccount:${google_service_account.cloudbuild_service_account.email}"
}

resource "google_cloudbuild_worker_pool" "pool" {
  name = "quantum-coasters-pool"
  location = "us-central-1"

  worker_config {
    disk_size_gb   = 100
    machine_type   = "e2-standard-4"
    no_external_ip = false
  }
}
