# dorm-management-tool
A tool for managing garbage collection, common financial expenses and other student dorm related responsibilities

## Running the application (using docker)
### First time set-up
- build the docker images: `$ docker-compose build`
- start the application using docker compose: `$ docker-compose up`
- run `$ docker exec dormmanagementtool_backend_1 bundle exec rake db:reset` to initialize the database

### Starting the app
If this is not the first time you start the app, you can use either `$ docker-compose up` or `$ docker-compose scale backend=1 db=1`.

### Stopping the app
To stop the application, run `$ docker-compose scale backend=0 db=0`. **Important**: do not use `$ docker-compose down` as this will also remove the database.
