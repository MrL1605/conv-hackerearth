# conv-hackerearth
A simple expenses handler for a contest in hackerearth


Source can be found at [Github](https://github.com/MrL1605/conv-hackerearth)


## Building

You will not need the images if you only need to view the application.
To only deploy skip to deploy section.

This requires docker installed on you machine. 
Follow [installation steps](https://docs.docker.com/install/)

Building the module has two steps:
 - UI - run `./ui/build.sh`
   
   This will build the UI and create a docker image for UI.

 - Java - run `gradle clean dockerBuildImage`
 
   This will build java and create a docker image.
   
   
## Deploy

You do not need to build for deployment. Images are already pushed to Docker hub.

Deployment will need docker and docker-compose installed on your machine. 
Follow [installation steps](https://docs.docker.com/install/)

If docker is already installed run 
```bash
docker-compose -f docker-compose.yml up -d conv-db
docker-compose -f docker-compose.yml up conv-app conv-ui
```

First command will bring up a MYSQL Db and second will bring up UI as well as backend.
