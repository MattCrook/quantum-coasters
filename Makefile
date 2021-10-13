SHELL:=/bin/bash
REPO := quantum-coasters

prep:
	npm install

start_dev:
	npm run dev

test:
	npm run test

build:
	chmod +x ./scripts/build.sh && ./scripts/build.sh

docker_build:
	docker build -t quantumcoasters:latest .

docker_run:
	docker run --env-file .env -it -d -p 3000:3000 quantumcoasters

docker_compose:
	docker-compose up --build

dockerhub_tag:
	docker tag $(image):latest $(DOCKERHUB_REPO):$(tag)

dockerhub_push:
	docker push $(DOCKERHUB_REPO):$(tag)

app_engine_deploy:
	gcloud app deploy deploy.yaml
