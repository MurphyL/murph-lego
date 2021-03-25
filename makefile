CONTAINER=murph-lego

SERVE_PORT?=6500

WORK_DIR=$(CURDIR)

start: 
	docker run --name $(CONTAINER) -v $(WORK_DIR):/usr/murph -p $(SERVE_PORT):5000 -p 35729:35729 -e CHOKIDAR_USEPOLLING=true murphyl/nodejs sh -c "npm run dev"

install:
	docker run --rm -v $(WORK_DIR):/usr/murph murphyl/nodejs npm install