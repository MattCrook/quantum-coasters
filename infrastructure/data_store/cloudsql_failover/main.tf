resource "google_sql_database_instance" "failover" {
  project              = "${var.project_name}"
  name                 = "${var.name}"
  database_version     = "${var.database_version}"
  master_instance_name = "${var.master_instance}"
  region               = "${var.region}"

  replica_configuration {
    connect_retry_interval = "${var.connect_retry}"
    failover_target        = "${var.failover_target}"
  }

  settings {
    tier            = "${var.instance_type}"
    disk_autoresize = "${var.disk_resize}"
    disk_size       = "${var.disk_size}"
    database_flags  = ["${var.database_flags}"]
  }
}
