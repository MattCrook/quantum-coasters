#!/bin/bash

sudo apt-get update

USERNAME=$(cat /tmp/docker.username)

cat /tmp/docker.password | sudo docker login -u $USERNAME --password-stdin

sudo docker pull mgcrook11/quantum-coasters:1.2

sudo docker run -it -d --name quantum-coasters -p 80:3000 mgcrook11/quantum-coasters:1.2
