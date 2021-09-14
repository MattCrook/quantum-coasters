##################
# TF State Bucket
##################

output "tf_state_bucket_self_link" {
  value = "${google_storage_bucket.tf_state.self_link}"
}

output "state_bucket_url" {
  description = "The created storage bucket"
  value       = "${google_storage_bucket.tf_state.url}"
}

output "tf_bucket_acl" {
    value = "${google_storage_bucket_acl.tf-bucket-acl.role_entity}"
}

##################
# Logging Bucket
##################

# ToDo: Dynamic outputs - IF logging or acl bucket enabled, have these outputs, if not, don't.
// output "logging_bucket_self_link" {
//   description = "The created storage bucket self link"
//   value       = "${google_storage_bucket.logging_bucket.self_link}"
// }

// output "logging_bucket_url" {
//   description = "The created storage bucket self link"
//   value       = "${google_storage_bucket.logging_bucket.url}"
// }


// output "logging_bucket_acl" {
//     value = "${google_storage_bucket_acl.logging-bucket-acl.role_entity}"
// }

#####################
# Object ACL Bucket
#####################

// output "object_acl_bucket_self_link" {
//   description = "The created storage bucket self link"
//   value       = "${google_storage_bucket.object_acl_bucket.self_link}"
// }

// output "object_acl_bucket_url" {
//   description = "The created storage bucket self link"
//   value       = "${google_storage_bucket.object_acl_bucket.url}"
// }


// output "object_acl_bucket_object_acl" {
//     value = "${google_storage_bucket_acl.object-acl.role_entity}"
// }

// output "object_acl_bucket_default_acl" {
//     value = "${google_storage_bucket_acl.default-acl.role_entity}"
// }
