## 


## Deploy
```
$ cp .env.example .env
$ vim .env
$ make genconfig

$ docker build -t nextjs-docker .
$ docker run -p 3000:3000 nextjs-docker
```