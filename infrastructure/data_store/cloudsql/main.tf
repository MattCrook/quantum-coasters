resource "google_sql_database_instance" "master" {
  project            = "${var.project}"
  name               = "${var.name}"
  database_version   = "${var.database_version}"
  region             = "${var.region}"

  settings {
    tier = "${var.instance_type}"

    ip_configuration {
        ipv4_enabled        = true
        require_ssl         = "${var.require_ssl}"
        authorized_networks = ["${var.authorize_networks}"]
    }

    location_preference {
        zone = "${var.zone}"
    }

    backup_configuration {
        binary_log_enabled = "${var.binary_log}"
        enabled            = "${var.backup_enabled}"
        start_time         = "${var.backup_time}"
    }

    disk_autoresize = "${var.disk_resize}"
    disk_size       = "${var.disk_size}"
    database_flags  = ["${var.database_flags}"]
  }
}

resource "google_sql_user" "users" {
  project  = "${var.project}"
  name     = "${var.user}"
  instance = "${google_sql_database_instance.master.name}"
  host     = "${var.host}"
  password = "${var.password}"
}
