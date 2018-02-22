# Устанвока и запуск

Для запуска приложения необходимы следующие пакеты
 - docker v.1.10.0+ (https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce)
 - docker-compose (https://docs.docker.com/compose/install/)
 - yarn (https://yarnpkg.com/lang/en/docs/install/)
 
Запуск приложения производится следующими командами (dev режим)
```bash
$ yarn
$ docker-compose up
```
Приложение будет доступно по [адресу](http://localhost:8080). Административный интерфейс couchDB [http://localhost:3003](http://localhost:3003).