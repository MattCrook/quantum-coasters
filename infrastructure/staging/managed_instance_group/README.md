# GCP Managed Instance Group


## Architecture
![architecture](../../public/ReadMePhotos/architecture.png)



![loadbalancertopology](../../public/ReadMePhotos/Screen%20Shot%202021-09-22%20at%204.35.08%20PM.png)

Create Self Signed Cert
```
openssl genrsa -out tls.key 2048
openssl req -new -x509 -key tls.key -out tls.cert -days 360 -subj /CN=localhost

or

openssl req -new -x509 -key tls.key -out tls.cert -days 360 -subj /CN=www.staging.quantum-coasters.com
```
