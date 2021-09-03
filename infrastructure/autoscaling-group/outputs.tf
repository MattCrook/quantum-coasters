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

// output "compute_address_users" {
//   description = "The URLs of the resources that are using this address"
//   value       = "${module.managed_instance_autoscaling_group.compute_address_users}"
// }

output "compute_address_self_link" {
  description = "Self link of the google_compute_address"
  value       = "${module.managed_instance_autoscaling_group.compute_address_self_link}"
}

output "subnetwork_self_links" {
  value = "${data.google_compute_network.default_network.subnetworks_self_links}"
}

output "subnetwork_cidrs" {
  value = [for o in data.google_compute_subnetwork.default_subnetwork[*] : {for v in o : v.region => v.ip_cidr_range}]
}

output "subnetwork_gateway_address" {
  value = [for o in data.google_compute_subnetwork.default_subnetwork[*] : {for v in o : v.region => v.gateway_address}]
}

output "subnetwork_secondary_ip_range" {
  value = [for o in data.google_compute_subnetwork.default_subnetwork[*] : {for v in o : v.region => v.secondary_ip_range}]
}

// output "backend_services" {
//   description = "The backend service resources."
//   value       = "${module.managed_instance_autoscaling_group.backend_services}"
// }

// output "backend_https_services" {
//   description = "The backend service resources."
//   value       = "${module.managed_instance_autoscaling_group.backend_https_services}"
// }
