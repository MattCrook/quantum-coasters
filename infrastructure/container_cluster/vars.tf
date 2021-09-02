####################
# Cluster
###################

variable "cluster_name" {
  description = "The name of the cluster"
  type        = string
}

variable "project" {
  description = "The ID of the project in GCP"
  type        = string
}

variable "cluster_description" {
  description = "The description of the google_container_cluster"
  type        = string
}

# The location (region or zone) in which the cluster master will be created,
# as well as the default node location. If you specify a zone (such as us-central1-a),
# the cluster will be a zonal cluster with a single cluster master. If you specify a region (such as us-west1),
# the cluster will be a regional cluster with multiple masters spread across zones in the region,
# and with default node locations in those zones as well
variable "primary_zone" {
  description = "The location (region or zone) in which the cluster master will be created"
  type        = string
}

variable "resource_labels" {
    description = "The GCE resource labels (a map of key/value pairs) to be applied to the cluster"
    type = map(string)
}

variable "min_master_version" {
  description = "The minimum version of the master. GKE will auto-update the master to new versions, so this does not guarantee the current master version--use the read-only master_version field to obtain that"
  type        = string
}

// variable "node_version" {
//   description = "The Kubernetes version on the nodes. Must either be unset or set to the same value as min_master_version on create"
//   type        = string
// }

// variable "cluster_ipv4_cidr" {
//   description = "The IP address range of the Kubernetes pods in this cluster in CIDR notation"
//   type        = string
// }

variable "network" {
  description = "The name or self_link of the Google Compute Engine network to which the cluster is connected"
  type        = string
}

variable "subnetwork" {
  description = "The name or self_link of the Google Compute Engine subnetwork in which the cluster's instances are launched."
  type        = string
}

variable "release_channel" {
  type        = string
  default     = "STABLE"
}

variable "enable_vertical_pod_autoscaling" {
  type        = bool
  default     = false
}

variable "user" {
  description = "The password to use for HTTP basic authentication when accessing the Kubernetes master endpoint"
  type        = string
}

variable "password" {
  description = "The username to use for HTTP basic authentication when accessing the Kubernetes master endpoint. If not present basic auth will be disabled"
  type        = string
}

variable "initial_node_count" {
  description = "The initial number of nodes for the pool. In regional or multi-zonal clusters, this is the number of nodes per zone"
  type        = number
  default     = 1
}

variable "logging_service" {
  type        = string
}

variable "monitoring_service" {
  type        = string
}

##########################
# Node Pool
##########################

variable "node_pool_name" {
  description = "The name of the cluster"
  type        = string
}

variable "node_count" {
  description = "The number of nodes in the node pool"
  type        = number
  default     = 2
}

variable "machine_type" {
  description = "The name of a Google Compute Engine machine type"
  type        = string
  default     = "e2-medium"
}

# variable instance_type { default = "n1-standard-1" }

variable "image_type" {
  description = "The image type to use for this node. Note that changing the image type will delete and recreate all nodes in the node pool"
  type        = string
  default     = "COS"
}

variable "disk_size" {
  description = "Size of the disk attached to each node, specified in GB"
  type        = string
  default     = "100"
}

variable "disk_type" {
  description = "Type of the disk attached to each node"
  type        = string
}

variable "serviceaccount"{
  description = "The service account to be used by the Node VMs"
}

variable "default_oauth_scopes" {
  description = "Default Scopes that are used by NAP when creating node pools"
  type = list(string)
  default = [
    "https://www.googleapis.com/auth/compute",
    "https://www.googleapis.com/auth/devstorage.full_control",
    "https://www.googleapis.com/auth/logging.write",
    "https://www.googleapis.com/auth/monitoring",
    "https://www.googleapis.com/auth/servicecontrol",
    "https://www.googleapis.com/auth/service.management.readonly",
    "https://www.googleapis.com/auth/trace.append"
    ]
}

variable "oauth_scopes" {
  description = "Scopes that are used by NAP when creating node pools"
  type        = list(string)
  default     = ["https://www.googleapis.com/auth/cloud-platform"]
}

// variable "labels" {
//   description = "The Kubernetes labels (key/value pairs) to be applied to each node. The kubernetes.io/ and k8s.io/ prefixes are reserved by Kubernetes Core components and cannot be specified"
//   type = list(string)
// }

// variable "metadata" {
//   description = "The metadata key/value pairs assigned to instances in the cluster"
//   type = list(string)
// }

// variable "tags" {
//   description = "The list of instance tags applied to all nodes"
//   type = list(string)
// }

variable "preemptible" {
  description = "A boolean that represents whether or not the underlying node VMs are preemptible. See the official documentation for more information. Defaults to false"
  type        = bool
  default     = false
}

variable "min_node_count" {
  description = "Minimum number of nodes in the NodePool"
  type        = number
}

variable "max_node_count" {
  description = "Maximum number of nodes in the NodePool"
  type        = number
}

variable "auto_repair" {
  description = "Whether the nodes will be automatically repaired"
  type        = bool
}

variable "auto_upgrade" {
  description = "Whether the nodes will be automatically upgraded"
  type        = bool
}
