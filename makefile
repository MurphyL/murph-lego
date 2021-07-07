CONTAINER=murph-lego

SERVE_PORT?=6600

start: 
	docker run --rm --name $(CONTAINER) -v $(CURDIR):/usr/murph -p $(SERVE_PORT):3000 -e CHOKIDAR_USEPOLLING=true murphyl/nodejs npm run start

install:
	docker run --rm -v $(CURDIR):/usr/murph murphyl/nodejs npm install