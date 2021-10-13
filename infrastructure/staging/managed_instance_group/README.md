# GCP Managed Instance Group


## Architecture
![architecture](../../public/ReadMePhotos/architecture.png)



![loadbalancertopology](../../public/ReadMePhotos/Screen%20Shot%202021-09-22%20at%204.35.08%20PM.png)

##### Create Self Signed Cert
```
openssl genrsa -out tls.key 2048
openssl req -new -x509 -key tls.key -out tls.cert -days 360 -subj /CN=localhost

or

openssl req -new -x509 -key tls.key -out tls.cert -days 360 -subj /CN=www.staging.quantum-coasters.com
```

### Create SSH Keys for VM Instances

##### Create a public key

This will put a public/private key pair into your `~./ssh` directory that Terraform will use.
```
ssh-keygen -t rsa -b 4096 -C "root" -f ~/.ssh/quantum_rsa

Press enter twice to skip adding a passphrase
```
