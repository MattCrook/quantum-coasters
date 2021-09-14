output "gateway_ipv4" {
    description = "The gateway address for default routing out of the network. This value is selected by GCP"
    value       = "${google_compute_network.vpc_network.gateway_ipv4}"
}
