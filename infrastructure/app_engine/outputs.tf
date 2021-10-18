########
# App Engine
#########
output "name" { value = "${google_app_engine_application.quantumapp.name}" }
output "url_dispatch_rule " { value = "${google_app_engine_application.quantumapp.url_dispatch_rule }" }
output "code_bucket " { value = "${google_app_engine_application.quantumapp.code_bucket}" }
output "default_hostname " { value = "${google_app_engine_application.quantumapp.default_hostname}" }
output "default_bucket  " { value = "${google_app_engine_application.quantumapp.default_bucket}" }
output "gcr_domain  " { value = "${google_app_engine_application.quantumapp.gcr_domain}" }
