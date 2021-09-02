variable "project_id" {
    description = "The project id of the current project as shown in GCP"
    type        = string
    default     = "quantum-coasters"
}

variable "region" {
    description = "The region of the current project"
    type        = string
    default     = "us-central1"
}

variable "zone" {
    description = "The zone of the current project"
    type        = string
    default     = "us-central1-c"
}

# For remote state data source
variable "db_remote_state_bucket" {
    description = "The name of the Cloud Storage bucket used for the database's remote state storage"
    type        = string
    default     = "quantum-core-tf-state"
}

variable "db_remote_state_key" {
    description = "The prefix of the key in the Cloud Storage bucket used for the database's remote state storage"
    type        = string
    default     = "global/terraform.tfstate"
}

variable "enable_logging" {
    description = "If set to true, enables logging and creates a GCS bucket to store the logging files"
    type        = bool
    default     = false
}

variable "storage_class" {
    description = "The Storage Class of the new bucket"
    type        = string
    default     = "STANDARD"
}

variable "object_acl_bucket_name" {
    description = "Name for bucket that Authoritatively manages the default object ACLs for a Google Cloud Storage bucket without managing the bucket itself"
    type        = string
    default     = "quantum-acl-bucket"
}

variable "enable_bucket_object_acl" {
    description = "If set to true, enables object ACL bucket and creates a GCS bucket to store the ACL files, and [google_storage_default_object_acl] and [google_storage_object_acl] and [google_storage_bucket_object]"
    type        = bool
    default     = false
}

variable "versioning" {
    description = "The bucket's Versioning configuration"
    type        = string
    default     = "false"
}


variable acl { type = "list" default = [] }
variable object_name {}
variable filename {}
variable content {}
variable content_type { default = "" }
