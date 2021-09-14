output "nat_ip" {
  description = "If the instance has an access config, either the given external ip (in the nat_ip field) or the ephemeral (generated) ip (if you didn't provide one)"
  value       = "${google_compute_instance.www.*.network_interface.0.access_config.0.nat_ip}"
}

output "network_ip" {
  description = "The internal ip address of the instance, either manually or dynamically assigned"
  value       = "${google_compute_instance.www.*.network_interface.0.network_ip}"
}

output "instance_id" {
  description = "The server-assigned unique identifier of this instance"
  value       = "${google_compute_instance.www.*.instance_id}"
}

output "cpu_platform" {
  description = "The CPU platform used by this instance"
  value       = "${google_compute_instance.www.*.cpu_platform}"
}
