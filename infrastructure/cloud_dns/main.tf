resource "google_dns_managed_zone" "private-zone" {
  name        = "private-zone"
  dns_name    = "quantum.private."
  description = "Private DNS zone"
  labels = {
    internal = "true"
  }

  project = "${module.google_project_host.id}"

  visibility = "private"

  private_visibility_config {
    networks {
      network_url = "${google_compute_network.network.id}"
    }
  }
}

resource "google_dns_policy" "inbound_dns_policy" {
  name                      = "inbound-dns-policy"
  enable_inbound_forwarding = true

  enable_logging = true

  project = "${module.google_project_host.id}"

  networks {
    network_url = "${google_compute_network.network.id}"
  }
}
