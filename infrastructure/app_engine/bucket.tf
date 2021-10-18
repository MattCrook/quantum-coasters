#########################
# GCS bucket to store logging, as referenced in the state bucket.
##########################
resource "google_storage_bucket" "logging_bucket" {
    count = var.enable_logging ? 1 : 0

    project       = var.project_id
    name          = "tf-quantumcoasters-logging-bucket"
    location      = "US"
    storage_class = "STANDARD"
    # This is only here so we can destroy the bucket as part of automated tests. You should not copy this for production usage.
    force_destroy = true

    versioning {
        enabled = false
    }

    labels {
        env = "prod"
        bucket = "quantumcoasters-logging"
    }

    lifecycle_rules = [{
        action = {
        type = "Delete"
        }
        condition = {
        age        = 365
        with_state = "ANY"
        }
    }]

    iam_members = [{
        role   = "roles/storage.admin"
        member = "user:matt.crook11@gmail.com"
    }]
}


#################################
# GCS bucket for storing static files from Qauntum Coasters app build for App Engine
##################################
resource "google_storage_bucket" "quantum_coasters_gae_storage" {
    project       = var.project_id
    name          = "quantum-coasters.appspot.com"
    location      = "US"
    storage_class = "STANDARD"
    # This is only here so we can destroy the bucket as part of automated tests. You should not copy this for production usage.
    force_destroy = true

    versioning {
        enabled = true
    }

    labels {
        env = "prod"
        bucket = "quantumcoasters-gae-storage"
    }

    logging {
        log_bucket = var.enable_logging ? google_storage_bucket.logging_bucket.name : null
    }

    lifecycle_rules = [{
        action = {
        type = "Delete"
        }
        condition = {
        age        = 365
        with_state = "ANY"
        }
    }]

    iam_members = [{
        role   = "roles/storage.admin"
        member = "user:matt.crook11@gmail.com"
    }]
}

resource "google_storage_bucket_iam_member" "members" {
    for_each = {
        for _, m in var.iam_members : "${m.role} ${m.member} => m
    }
    bucket = "${google_storage_bucket.tf_state.name}"
    role   = "${each.value.role}"
    member = "${each.value.member}"
}
