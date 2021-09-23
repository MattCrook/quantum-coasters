#!/bin/bash -xe

RESOURCE_INDEX=$1
apt-get -y update
apt-get -y install nginx

sudo apt-get install docker
service docker start
chkconfig docker on
sudo apt-get install jq

STDIN=$(cat /tmp/docker.password)
echo "PASSWORD IS: ............"
echo $STDIN

USERNAME=$(cat /tmp/docker.username)

echo "USERNAME IS: ............"
echo $USERNAME


docker login -username ${USERNAME} --password-stdin
