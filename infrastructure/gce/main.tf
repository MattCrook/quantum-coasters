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

resource "random_id" "instance_id" {
  byte_length = 4
}

resource "google_service_account" "quantum_coasters_sa" {
  account_id   = "quantum-coasters-sa-${random_id.instance_id.hex}"
  display_name = "quantum-coasters-compute-sa"
  project      = "${var.project}"
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

resource "google_compute_target_pool" "default" {
  name          = "tf-www-target-pool"
  instances     = google_compute_instance.www.*.self_link
  health_checks = [google_compute_http_health_check.default.name]
}

resource "google_compute_forwarding_rule" "default" {
  name       = "tf-www-forwarding-rule"
  target     = google_compute_target_pool.default.self_link
  port_range = "80"
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

    access_config {
      # Ephemeral
    }
  }

  metadata = {
    ssh-keys = "root:${file("~/.ssh/rsa_pub.pub")}"
  }

  // provisioner "file" {
  //   source      = "./install.sh"
  //   destination = "/tmp/install.sh"

  //   connection {
  //     host        = self.network_interface.0.access_config.0.nat_ip
  //     type        = "ssh"
  //     user        = "root"
  //     private_key = file("~/.ssh/rsa_pub") # gcloud_id_rsa
  //     agent       = false
  //   }
  // }

  // provisioner "remote-exec" {
  //   connection {
  //     host        = self.network_interface.0.access_config.0.nat_ip
  //     type        = "ssh"
  //     user        = "root"
  //     private_key = file("~/.ssh/rsa_pub") # gcloud_id_rsa
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
      private_key = file("~/.ssh/rsa_pub") # gcloud_id_rsa
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
      private_key = file("~/.ssh/rsa_pub") # gcloud_id_rsa
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
      private_key = file("~/.ssh/rsa_pub") # gcloud_id_rsa
      agent       = false
    }
  }

  provisioner "remote-exec" {
    connection {
      host        = self.network_interface.0.access_config.0.nat_ip
      type        = "ssh"
      user        = "root"
      private_key = file("~/.ssh/rsa_pub") # gcloud_id_rsa
      agent       = false
    }

    inline = [
      "chmod +x /tmp/docker_login.sh",
      "sudo /tmp/docker_login.sh ${count.index}",
    ]
  }

  service_account {
    email = "${google_service_account.quantum_coasters_sa.email}"
    scopes = ["https://www.googleapis.com/auth/compute.readonly", "cloud-platform"]
  }
}

resource "google_compute_firewall" "default" {
  name    = "tf-www-firewall"
  network = "default"
  project = "${var.project}"

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["www-node"]
}

resource "google_compute_firewall" "egress_allow_all" {
  project     = "${var.project}"
  name        = "egress-allow-all"
  network     = "default"
  # network     = "${data.google_compute_network.default_network.name}"
  direction   = "EGRESS"
  # priority    = 65535
  priority    = 1000
  description = "Firewall rule allows all Egress traffic from all IPs and all ports."


  allow {
    protocol = "all"
  }
}
