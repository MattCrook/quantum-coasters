#####################################
# Self signed pem for testing
#####################################


# Self-signed regional SSL certificate for testing
resource "tls_private_key" "default" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "tls_self_signed_cert" "default" {
  key_algorithm   = tls_private_key.default.algorithm
  private_key_pem = tls_private_key.default.private_key_pem
  is_ca_certificate = true

  # Certificate expires after 12 hours.
  validity_period_hours = 12

  # Generate a new certificate if Terraform is run within three
  # hours of the certificate's expiration time.
  early_renewal_hours = 3

  # Reasonable set of uses for a server SSL certificate.
  allowed_uses = [
    "key_encipherment",
    "digital_signature",
    "server_auth",
  ]

  dns_names = ["*.quantum-coasters.com"]
  # ip_addresses = [google_compute_global_address.external_address.address]

  subject {
    common_name  = "www.staging.quantum-coasters.com"
    organization = "ACME Examples, Inc"
  }
}

resource "google_compute_ssl_certificate" "test_cert" {
  name_prefix = "tls-cert-"
  description = "The testing SSL certificate for Quantum Coasters HTTPS Load Balancer SSL Offload"
  private_key = tls_private_key.default.private_key_pem
  certificate = tls_self_signed_cert.default.cert_pem

  lifecycle {
    create_before_destroy = true
  }
}
