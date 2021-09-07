##########################
# Compute Global Addeess
#########################

output "external_global_address" {
  value = "${module.managed_instance_autoscaling_group.public_ip}"
}

######################
# Autoscaler and MIG
######################

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


###########################
# Backend Services
############################

// output "backend_services" {
//   description = "The backend service resources."
//   value       = "${module.managed_instance_autoscaling_group.backend_services}"
// }

// output "backend_https_services" {
//   description = "The backend service resources."
//   value       = "${module.managed_instance_autoscaling_group.backend_https_services}"
// }


###########################
# Network and Subnetwork
############################

# DEFAULT NETWORK
// output "subnetwork_self_links" {
//   value = "${data.google_compute_network.default_network.subnetworks_self_links}"
// }

// output "subnetwork_cidrs" {
//   value = [for o in data.google_compute_subnetwork.default_subnetwork[*] : {for v in o : v.region => v.ip_cidr_range}]
// }

// output "subnetwork_gateway_address" {
//   value = [for o in data.google_compute_subnetwork.default_subnetwork[*] : {for v in o : v.region => v.gateway_address}]
// }

// output "subnetwork_secondary_ip_range" {
//   value = [for o in data.google_compute_subnetwork.default_subnetwork[*] : {for v in o : v.region => v.secondary_ip_range}]
// }

##### CUSTOM VPC #####

output "google_compute_network_id" {
  description = "All self_links of healthchecks created for the instance group."
  value = "${module.managed_instance_autoscaling_group.google_compute_network_id}"
}

output "google_compute_network_gateway_ipv4" {
  description = "The gateway address for default routing out of the network. This value is selected by GCP"
  value = "${module.managed_instance_autoscaling_group.google_compute_network_gateway_ipv4}"
}

output "subnet_ip_cidr_range" {
  description = "The IP address range that machines in this network are assigned to, represented as a CIDR block."
  value = "${module.managed_instance_autoscaling_group.subnet_ip_cidr_range}"
}

output "subnet_gateway_address" {
  description = "The IP address of the gateway"
  value = "${module.managed_instance_autoscaling_group.subnet_gateway_address}"
}

output "subnet_private_ip_google_access" {
  description = "Whether the VMs in this subnet can access Google services without assigned external IP addresses"
  value = "${module.managed_instance_autoscaling_group.subnet_private_ip_google_access}"
}

# PROXY ILB SUBNET

// output "proxy_subnet_ip_cidr_range" {
//   description = "The IP address range that machines in this network are assigned to, represented as a CIDR block."
//   value = "${module.managed_instance_autoscaling_group.proxy_subnet_ip_cidr_range}"
// }

// output "proxy_subnet_gateway_address" {
//   description = "The IP address of the gateway"
//   value = "${module.managed_instance_autoscaling_group.proxy_subnet_gateway_address}"
// }

// output "proxy_subnet_private_ip_google_access" {
//   description = "Whether the VMs in this subnet can access Google services without assigned external IP addresses"
//   value = "${module.managed_instance_autoscaling_group.proxy_subnet_private_ip_google_access}"
// }
