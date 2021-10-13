data "template_file" "startup_script" {
  template = file("${path.module}/startup-script.sh")

  vars = {
    CERT        = google_container_cluster.cluster.master_auth.0.cluster_ca_certificate
    CLIENT_KEY  = google_container_cluster.cluster.master_auth.0.client_key
    CLIENT_CERT = google_container_cluster.cluster.master_auth.0.client_certificate
    PASSWORD    = var.password
  }
}
