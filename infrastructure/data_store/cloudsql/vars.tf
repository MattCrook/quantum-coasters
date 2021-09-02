####################
# CloudSQL Instance
####################
variable project { default = "quantum-coasters" }
variable name { default = "master" }
variable database_version { default = "POSTGRES_13" }
variable region { default = "us-central1" }
variable instance_type { default = "" }
variable disk_resize { default = "true" }
variable authorize_networks { type = "list" default = [] }
variable binary_log { default = "true" }
variable backup_enabled {}
variable backup_time { default = "" }
variable require_ssl { default = "false" }
variable database_flags { type = "list" default = [] }
variable disk_size { default = "" }
variable zone { default = "" }

#################
# CloudSQL User
#################
variable user {}
# variable master_instance {}
variable host { default = "%" }
variable password {}
