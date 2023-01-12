# Raspberry Pi Server

# Docker config

## Docker containers
The containers run on their own seperated network. The network is configured in a bridge configuration

### Usage
We have 2 docker compose configuration files, 1 for developing and 1 for production.

#### Production
Run `docker-compose up --build -d` to start the production server  
Run `docker-compose down` to stop the production server  
Run `docker-compose logs -f node|nginx|mariadb` to show the logs of the specified container (node|nginx|mariadb) in production  
Run `docker-compose rm` to remove the containers in production. Remember to stop the containers first  
Run `docker-compose exec node|nginx|mariadb /bin/bash` to ssh into the specified container (node|nginx|mariadb) in production  

#### Development
Run `docker-compose -f docker-compose-dev.yml up --build -d` to start the development server  
Run `docker-compose -f docker-compose-dev.yml down` to stop the development server  
Run `docker-compose -f docker-compose-dev.yml logs -f node|nginx|mariadb` to show the logs of the specified container (node|nginx|mariadb) in development  
Run `docker-compose -f docker-compose-dev.yml rm` to remove the containers in development. Remember to stop the containers first  
Run `docker-compose -f docker-compose-dev.yml exec node|nginx|mariadb /bin/bash` to ssh into the specified container (node|nginx|mariadb) in development  

#### General
Run `docker volume prune` to remove all unused container volumes. Containers must be stopped and removed for this to work.