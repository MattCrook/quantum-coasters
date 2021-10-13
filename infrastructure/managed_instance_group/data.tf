// data "google_compute_network" "default_network" {
//   name    = "default"
//   project = "${var.project}"
// }

// data "google_compute_subnetwork" "default_subnetwork" {
//   for_each = toset(data.google_compute_network.default_network.subnetworks_self_links)

//   project = "${var.project}"
//   self_link = each.key
//   region = "us-central1"
// }
