SHELL:=/bin/bash
REPO := quantumapp

prep:
	npm install

start_dev:
	npm run dev

test:
	npm run test

docker_build:
	docker build -t quantumcoasters:latest .

docker_run:
	docker run -it -d --env-file .env -p 8000:8000 quantumcoasters

docker_compose:
	docker-compose up --build

dockerhub_tag:
	docker tag $(image):latest $(DOCKERHUB_REPO):$(tag)

dockerhub_push:
	docker push $(DOCKERHUB_REPO):$(tag)
