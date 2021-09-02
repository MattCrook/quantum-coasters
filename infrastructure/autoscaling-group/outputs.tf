output "public_ip" {
  value = "${module.managed_instance_autoscaling_group.public_ip}"
}

output "autoscaler_self_link" {
  description = "The URI of the created resource"
  value       = "${module.managed_instance_autoscaling_group.autoscaler_self_link}"
}

output "instance_group_manager_self_link" {
  value = "${module.managed_instance_autoscaling_group.instance_group_manager_self_link}"
}

output "instance_group" {
  description = "The full URL of the instance group created by the manager"
  value       = "${module.managed_instance_autoscaling_group.instance_group}"
}

output "status" {
  description = "The status of this managed instance group"
  value       = "${module.managed_instance_autoscaling_group.status}"
}

output "compute_address_users" {
  description = "The URLs of the resources that are using this address"
  value       = "${module.managed_instance_autoscaling_group.compute_address_users}"
}

output "compute_address_self_link" {
  description = "Self link of the google_compute_address"
  value       = "${module.managed_instance_autoscaling_group.compute_address_self_link}"
}
