# React-Starter-3-app
[![Build Status](https://travis-ci.org/nudoru/React-Starter-3.svg?branch=master)](https://travis-ci.org/nudoru/React-Starter-3)

Bootstrap starter for React 15 projects with hot reloading and SASS styles. Built with Webpack 2 beta. Components are intended for mocks and are generally not functional.

Static assets for the front end are `front/www/*` and all app development files are located in `front/app/*`.
On build, the `front/www/js/app` directory is cleaned and new code is bundled there. 

JS Entry point is `front/app/index.js`
SASS is `front/app/index.sass`

## 1. Docker

I'm experimenting with a Docker based workflow. Current setup is based on these posts
https://medium.com/@andyccs/webpack-and-docker-for-development-and-deployment-ae0e73243db4#.dmfqhhbyk
http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html#the-nodemodules-volume-trick

- The `Dockerfile` and `docker-compose.yml` files are for running the compiled app as standalone.
- To update the node_modules folder in the machine, run `docker-compose -f docker-compose-dev.yml build`
    - If it refuses to rebuild, remove the previous image `docker rmi reactstarter3_web-dev -f ` and try again
- For front end development `docker-compose -f docker-compose-dev.yml up` and open a browser to `http://localhost:3000`
- To build the front end for prod `docker-compose -f docker-compose-build.yml up`

The `node_modules` folder contents will be installed to a dir inside the image so that it doesn't take up space on the host.

## 2. Build options

`npm run dev` to start the webpack-dev-server with hot reloading at localhost:3000. Will also open the default browser to the site.
`npm run build:prod` to clean and create a production build of the app
`npm run dev:server` will start an Nodemon/Express web server at localhost:8080 for developing server code
`npm start` will start an Express web server at localhost:8080

## Notes

- When the application start, it will try to load ./front/www/config.json for special configuration options for the running app. If there is a problem, a warning will appear in the log and the app will try to run normally.
- Webpack-dev-server runs with --history-api-fallback to enabled React-Router routes to work for an SPA.