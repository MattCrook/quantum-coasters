provider "google" {
  project     = var.project
  region      = var.region
  zone        = var.zone
  credentials = file("default-compute-credentials.json")
}

terraform {
  required_version = ">= 0.13"

  // backend "gcs" {
  //     bucket      = "quantum-core-tf-state"
  //     prefix      = "global/terraform.tfstate"
  //     credentials = "./credentials.json"
  // }
}

data "google_compute_subnetwork" "usc1_default_subnet" {
    project = var.project
    name   = "default"
    region = "us-central1"
}

resource "random_id" "instance_id" {
  byte_length = 4
}

resource "google_service_account" "quantum_coasters_sa" {
  project      = var.project
  account_id   = "quantum-coasters-sa-${random_id.instance_id.hex}"
  display_name = "quantum-coasters-compute-sa"
  description  = "Service account for Quantum-Coasters compute instances."
}

resource "google_compute_http_health_check" "default" {
  name                = "tf-www-basic-check"
  request_path        = "/"
  check_interval_sec  = 1
  healthy_threshold   = 1
  unhealthy_threshold = 10
  timeout_sec         = 1
}

// resource "google_compute_global_address" "external_ip" {
//   project      = var.project
//   name         = "external-global-addr"
//   address_type = "EXTERNAL"
//   ip_version   = "IPV4"
// }

resource "google_compute_target_pool" "default" {
  name              = "tf-www-target-pool"
  instances         = google_compute_instance.www.*.self_link
  session_affinity  = "CLIENT_IP"
  health_checks     = [google_compute_http_health_check.default.name]
}

resource "google_compute_forwarding_rule" "default" {
  name                  = "tf-www-forwarding-rule"
  target                = google_compute_target_pool.default.self_link
  ip_protocol           = "TCP"
  port_range            = 443
  load_balancing_scheme = "EXTERNAL"
}

resource "google_compute_instance" "www" {
  count = 2

  name         = "tf-www-${count.index}"
  machine_type = "e2-medium"
  zone         = var.zone
  tags         = ["www-node"]

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-1404-trusty-v20160602"
    }
  }

  network_interface {
    network = "default"
    subnetwork = data.google_compute_subnetwork.usc1_default_subnet.id

    access_config {
      # Ephemeral
    }
  }

  metadata = {
    ssh-keys = "root:${file("~/.ssh/quantum_rsa.pub")}"
  }

  // provisioner "file" {
  //   source      = "./install.sh"
  //   destination = "/tmp/install.sh"

  //   connection {
  //     host        = self.network_interface.0.access_config.0.nat_ip
  //     type        = "ssh"
  //     user        = "root"
  //     private_key = file("~/.ssh/quantum_rsa") # gcloud_id_rsa
  //     agent       = false
  //   }
  // }

  // provisioner "remote-exec" {
  //   connection {
  //     host        = self.network_interface.0.access_config.0.nat_ip
  //     type        = "ssh"
  //     user        = "root"
  //     private_key = file("~/.ssh/quantum_rsa") # gcloud_id_rsa
  //     agent       = false
  //   }

  //   inline = [
  //     "chmod +x /tmp/install.sh",
  //     "sudo /tmp/install.sh ${count.index}",
  //   ]
  // }

  provisioner "file" {
    source      = "./docker.username"
    destination = "/tmp/docker.username"

    connection {
      host        = self.network_interface.0.access_config.0.nat_ip
      type        = "ssh"
      user        = "root"
      private_key = file("~/.ssh/quantum_rsa") # gcloud_id_rsa
      agent       = false
    }
  }

  provisioner "file" {
    source      = "./docker.password"
    destination = "/tmp/docker.password"

    connection {
      host        = self.network_interface.0.access_config.0.nat_ip
      type        = "ssh"
      user        = "root"
      private_key = file("~/.ssh/quantum_rsa") # gcloud_id_rsa
      agent       = false
    }
  }

  provisioner "file" {
    source      = "./docker_login.sh"
    destination = "/tmp/docker_login.sh"

    connection {
      host        = self.network_interface.0.access_config.0.nat_ip
      type        = "ssh"
      user        = "root"
      private_key = file("~/.ssh/quantum_rsa") # gcloud_id_rsa
      agent       = false
    }
  }

  provisioner "remote-exec" {
    connection {
      host        = self.network_interface.0.access_config.0.nat_ip
      type        = "ssh"
      user        = "root"
      private_key = file("~/.ssh/quantum_rsa") # gcloud_id_rsa
      agent       = false
    }

    inline = [
      "chmod +x /tmp/docker_login.sh",
      "sudo /tmp/docker_login.sh ${count.index}",
    ]
  }

  service_account {
    email = "${google_service_account.quantum_coasters_sa.email}"
    scopes = ["cloud-platform"]
  }
}

resource "google_compute_firewall" "default" {
  name    = "tf-www-firewall"
  network = "default"
  project = "${var.project}"

  allow {
    protocol = "tcp"
    ports    = ["80", "443", "22"]
  }

  allow {
    protocol = "udp"
  }

  allow {
    protocol = "icmp"
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["www-node"]
}


resource "google_compute_firewall" "http" {
  name    = "tf-www-http-firewall"
  network = "default"
  project = "${var.project}"

  allow {
    protocol = "tcp"
    ports    = ["3000"]
  }

  source_ranges = ["0.0.0.0/0"]
}

resource "google_compute_firewall" "egress_allow_all" {
  project     = "${var.project}"
  name        = "egress-allow-all"
  network     = "default"
  direction   = "EGRESS"
  description = "Firewall rule allows all Egress traffic from all IPs and all ports."


  allow {
    protocol = "all"
  }
}
