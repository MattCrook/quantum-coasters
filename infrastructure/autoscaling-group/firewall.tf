// resource "google_compute_firewall" "allow_all" {
//   project     = "${var.project}"
//   name        = "ingress-allow-all"
//   network     = "${data.google_compute_network.default_network.name}"
//   direction   = "INGRESS"
//   description = "Firewall rule allows all traffic with protocols tcp, udp, and icmp from all IPs into port 80 and port 443."

//   source_ranges = "${local.all_ips}"

//   allow {
//     protocol = "${local.tcp_protocol}"
//     ports    = ["80", "443"]
//   }

//   allow {
//     protocol = "icmp"
//   }

//   allow {
//     protocol = "udp"
//   }

//   log_config {
//     metadata = "EXCLUDE_ALL_METADATA"
//   }
// }

// resource "google_compute_firewall" "egress_allow_all" {
//   project     = "${var.project}"
//   name        = "egress-allow-all"
//   network     = "${data.google_compute_network.default_network.name}"
//   direction   = "EGRESS"
//   # priority    = 65535
//   priority    = 1000
//   description = "Firewall rule allows all Egress traffic from all IPs and all ports."


//   allow {
//     protocol = "all"
//   }

//   log_config {
//     metadata = "EXCLUDE_ALL_METADATA"
//   }
// }


// resource "google_compute_firewall" "allow_http" {
//   project     = "${var.project}"
//   name        = "ingress-allow-http"
//   network     = "${data.google_compute_network.default_network.name}"
//   direction   = "INGRESS"
//   description = "Firewall rule allows Ingress traffic on port 80 into VM instances with tag quantum-coasters-production."

//   # source_tags = ["quantum-coasters-production"]
//   target_tags = ["quantum-coasters-production"]

//   allow {
//     protocol = "${local.tcp_protocol}"
//     ports    = ["${var.server_port}"]
//   }

//   log_config {
//     metadata = "EXCLUDE_ALL_METADATA"
//   }
// }

// resource "google_compute_firewall" "allow_https" {
//   project     = "${var.project}"
//   name        = "ingress-allow-https"
//   network     = "${data.google_compute_network.default_network.name}"
//   direction   = "INGRESS"
//   description = "Firewall rule allows Ingress traffic on port 443 into VM instances with tag quantum-coasters-production."

//   # source_tags = ["quantum-coasters-production"]
//   target_tags = ["quantum-coasters-production"]

//   allow {
//     protocol = "${local.tcp_protocol}"
//     ports    = ["443"]
//   }

//   log_config {
//     metadata = "EXCLUDE_ALL_METADATA"
//   }
// }

// resource "google_compute_firewall" "allow_ssh" {
//   project     = "${var.project}"
//   name        = "ingress-allow-https"
//   network     = "${data.google_compute_network.default_network.name}"
//   direction   = "INGRESS"
//   priority    = 1000
//   description = "Firewall rule allows Ingress traffic for SSH on port 22 into VM instances with tag quantum-coasters-production."

//   target_tags = ["quantum-coasters-production"]

//   allow {
//     protocol = "tcp"
//     ports    = ["22"]
//   }

//   log_config {
//     metadata = "EXCLUDE_ALL_METADATA"
//   }
// }
