## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Workshop

Prerequisites
Docker (only for workshop)
Node.js (>= 10.13.0)

## Documentation

[Nest first steps](https://docs.nestjs.com/first-steps)

## First Steps

```bash
# Installing Nest Cli
$ npm i -g @nestjs/cli

# Create a new nest project
$ nest new project-name

# Create our Cats Module
$ nest g module cats

# Create our Cats Controller
$ nest g controller cats

# Create our Cats Service
$ nest g service cats
```

## Additional installs

```bash
# Swagger Ui
$ yarn add @nestjs/swagger swagger-ui-express

# Class Validator
$ yarn add class-validator

# TypeOrm
$ npm install --save @nestjs/typeorm typeorm mysql2
or
$ yarn add @nestjs/typeorm typeorm mysql2

# Class Transformer
$ yarn add class-transformer

# Testing
$ yarn add --dev @nestjs/testing

```

## Docker

```bash
# create a mysql container
$ docker run -d -p 33061:3306 --name mysql57 -e MYSQL_ROOT_PASSWORD=secret mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```


## Start the server

```bash
# To download libraries
$ yarn

# To start the server
$ yarn start

# To start the server in dev mode
$ yarn start:dev

```
