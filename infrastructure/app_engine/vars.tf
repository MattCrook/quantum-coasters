variable "project_id" {
    description = "The project id of the current project as shown in GCP"
    type        = string
    default     = "quantum-coasters"
}

variable "enable_logging" {
    description = "If set to true, enables logging and creates a GCS bucket to store the logging files"
    type        = bool
    default     = false
}

variable "iam_members" {
    description = "List of Service Accounts, Users, etc..to give IAM memebership to a new member tf_state bucket. Updates the IAM policy to grant a role to a new member."
    type        = list(string)
    default     = ["user:matt.crook11@gmail.com"]
}

variable "db_remote_state_key" {
    description = "The prefix of the key in the Cloud Storage bucket used for the database's remote state storage"
    type        = string
    default     = "global/terraform.tfstate"
}
