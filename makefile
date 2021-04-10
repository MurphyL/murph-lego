CONTAINER=murph-lego-v1

SERVE_PORT?=6600

WORK_DIR=$(CURDIR)

start: 
	docker run --name $(CONTAINER) -v $(WORK_DIR):/usr/murph -p $(SERVE_PORT):3000 -e CHOKIDAR_USEPOLLING=true murphyl/nodejs npm run start

install:
	docker run --rm -v $(WORK_DIR):/usr/murph murphyl/nodejs npm install