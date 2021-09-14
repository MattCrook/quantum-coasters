
variable project_name {}
variable name {}
variable database_version {}
variable region {}
variable instance_type { default = "" }
variable connect_retry { default = "10" }
variable failover_target { }
variable master_instance {}
variable disk_resize { default = "true" }
variable database_flags { type = "list" default = [] }
variable disk_size { default = 10 }
