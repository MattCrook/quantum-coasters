##########
# DNS
###########
resource "google_dns_managed_zone" "private-zone" {
  name        = "private-zone"
  dns_name    = "quantumcoasters.private."
  description = "Private DNS zone"
  project     = var.project
  visibility  = "private"
  force_destroy = true
  labels = {
    internal = "true"
  }

  private_visibility_config {
    networks {
      network_url = module.managed_instance_autoscaling_group.network_id
    }
  }
}

resource "google_dns_policy" "inbound_dns_policy" {
  name                      = "inbound-dns-policy"
  enable_inbound_forwarding = true
  enable_logging            = true
  project                   = var.project

  networks {
    network_url = module.managed_instance_autoscaling_group.network_id
  }
}

resource "google_dns_managed_zone" "public-zone" {
  name          = "public-zone"
  dns_name      = "quantumcoasters.demo."
  description   = "Public DNS zone"
  visibility    = "public"
  force_destroy = true
}

resource "google_dns_record_set" "external" {
  name = "staging.${google_dns_managed_zone.public-zone.dns_name}"
  type = "A"
  ttl  = 300

  managed_zone = google_dns_managed_zone.public-zone.name
  rrdatas      = [module.managed_instance_autoscaling_group.public_ip]
}

resource "google_dns_policy" "external" {
  name                      = "external-policy"
  enable_inbound_forwarding = true
  enable_logging            = true

  alternative_name_server_config {
    target_name_servers {
      ipv4_address    = module.managed_instance_autoscaling_group.public_ip
      forwarding_path = "default"
    }
  }
}
