## Deploy
```
$ cp next.config.js.example next.config.js
# and setup env 

$ docker build -t nextjs-docker .
$ docker run -p 3000:3000 nextjs-docker
```