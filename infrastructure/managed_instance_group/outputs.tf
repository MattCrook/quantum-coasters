##########################
# Compute Global Addeess
#########################

output "external_global_address" {
  value = "${module.managed_instance_autoscaling_group.public_ip}"
}


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
  description = "Id of VPC network created for Quantum Coasters"
  value = "${module.managed_instance_autoscaling_group.network_id}"
}

output "google_compute_network_gateway_ipv4" {
  description = "The gateway address for default routing out of the network. This value is selected by GCP"
  value = "${module.managed_instance_autoscaling_group.network_gateway_ipv4}"
}

################
# Public Subnet
###############
output "public_subnet_ip_cidr_range" {
  description = "The public IP address range that machines in this network are assigned to, represented as a CIDR block."
  value = "${module.managed_instance_autoscaling_group.public_subnet_ip_cidr_range}"
}

output "private_subnet_ip_cidr_range" {
  description = "The Private IP address range that machines in this network are assigned to, represented as a CIDR block."
  value = "${module.managed_instance_autoscaling_group.private_subnet_ip_cidr_range}"
}

output "public_subnet_gateway_address" {
  description = "The public IP address of the gateway"
  value = "${module.managed_instance_autoscaling_group.public_subnet_gateway_address}"
}

################
# Private Subnet
###############
output "private_subnet_gateway_address" {
  description = "The private IP address of the gateway"
  value = "${module.managed_instance_autoscaling_group.private_subnet_gateway_address}"
}

output "public_subnet_private_ip_google_access" {
  description = "Whether the VMs in this subnet can access Google services without assigned external IP addresses"
  value = "${module.managed_instance_autoscaling_group.public_subnet_private_ip_google_access}"
}

output "private_subnet_private_ip_google_access" {
  description = "Whether the VMs in this subnet can access Google services without assigned external IP addresses"
  value = "${module.managed_instance_autoscaling_group.private_subnet_private_ip_google_access}"
}
