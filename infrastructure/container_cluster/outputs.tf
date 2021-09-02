output "endpoint" {
    description = "The IP address of this cluster's Kubernetes master"
    value = "${google_container_cluster.cluster.endpoint}"
}

output "instance_group_urls" {
  value = "${google_container_cluster.cluster.instance_group_urls}"
}

output "name" {
    value = "${google_container_cluster.cluster.name}"
}

output "project" {
    value = "${google_container_cluster.cluster.project}"
}

output "tpu_ipv4_cidr_block" {
    value = "${google_container_cluster.cluster.tpu_ipv4_cidr_block}"
}

output "cluster_self_link" {
    description = "The server-defined URL for the resource"
    value       = "${google_container_cluster.cluster.self_link}"
}

output "services_ipv4_cidr" {
    description = "The IP address range of the Kubernetes services in this cluster, in CIDR notation (e.g. 1.2.3.4/29). Service addresses are typically put in the last /16 from the container CIDR"
    value       = "${google_container_cluster.cluster.services_ipv4_cidr}"
}

output "certificate" {
    value       = "${google_container_cluster.cluster.master_auth.0.cluster_ca_certificate}"
    sensitive   = true
}

output "client_certificate" {
    value     = "${google_container_cluster.cluster.master_auth.0.client_certificate}"
    sensitive = true
}

output "client_key" {
    value     = "${google_container_cluster.cluster.master_auth.0.client_key}"
    sensitive = true
}

output "master_version" {
    value = "${google_container_cluster.cluster.master_version}"
}
