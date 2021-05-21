# piafagent

Frontend application to be plugged to a Question-answering backend ([like this one](https://github.com/deepset-ai/haystack)). It is a search bar, displaying  answers after you press "Search".  

Note: the text is currently in french, but can easily be adapted to any other language.  

## Project setup
```
npm install
```

## Project run

### Compiles and hot-reloads for development
```
npm run serve
```

![search](/public/search_bar.png)

![answers](/public/answers.png)

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

`VUE_APP_API_URL`: endpoint you want this app to talk to  
`VUE_APP_PUBLIC_PATH`: base_app_uri, used in the vue app config for setting publicPath, and also for the base uri of VueRouter.  
`VUE_APP_USE_FILTERS`: boolean for if you want to use filters or not. If you do want to use filters, you need to add a file describing your filters. it must follow this format : [filter file example](/filters.json)
`VUE_APP_DISPLAY_NAME`: Name to be displayed in the title   
`VUE_APP_EXAMPLE_QUESTION`: The question serving as example in the Homepage  
`VUE_APP_DISPLAY_PROBABILITIES`: boolean for if you want to display the probability associated with the document

![search](/public/filters.png)
