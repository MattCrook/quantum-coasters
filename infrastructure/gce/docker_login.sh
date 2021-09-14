#!/bin/bash -xe

sudo apt-get update

sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release


curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker

sudo apt update
sudo apt install -y --force-yes docker-ce

USERNAME=$(cat /tmp/docker.username)
cat /tmp/docker.password | sudo docker login -u $USERNAME --password-stdin
sudo docker pull mgcrook11/quantum-coasters:app-1.0
sudo docker run -it -d --name quantum-coasters -p 80:3000 mgcrook11/quantum-coasters:app-1.0
