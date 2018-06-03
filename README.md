## Installation

> `npm i`
> `docker-compose up`

### Helpers

* `docker stop $(docker ps -a -q)` - stop all containers
* `docker rm $(docker ps -a -q)` - remove all containers
* `docker rmi $(docker images -q)` - delete all images