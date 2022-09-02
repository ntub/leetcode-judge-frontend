## 


## Deploy
```
$ cp .env.example .env
$ vim .env
$ make genconfig

$ make build
$ docker run -p 3000:3000 10446005/leetcode-judge-frontend:master
```