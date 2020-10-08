# piafagent

## Project setup
```
npm install
```

## Project run

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run with docker
A Dockfile for running your app in production is already prepared.
You only have to build the image and run it, typing :

```bash
docker build -t piafagent_image .
docker run -d -p 8081:80 --name piafagent piafagent_image
```

Note: the 8081 port will of course depend on your nginx / apache configuration.

## Project Configuration

Edit the `src/.env` file (you can find an example here `src/.envexample`)

VUE_APP_API_URL: endpoint you want this app to talk to
VUE_APP_PUBLIC_PATH: base_app_uri, used in the vue app config for setting publicPath, and also for the base uri of VueRouter.
