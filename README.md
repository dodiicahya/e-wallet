
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes

### Prerequisites

make sure you have installed NPM (Node Package Manager)

### Installing

A step by step series of examples that tell you have to get a development env running

install all requirement dependency

```
npm install
```
after all dependency successfully installed, you can start migrating database using this command:

```
npm run migrate
```
for running seeder database using this command:
```
npm run seeder
```
just remember, command above will running well if your **.env** file is filled correctly

## Running application

To run this application just simply type
```
npm start
```
or you can run with [pm2](https://www.npmjs.com/package/pm2)

## See API Documentation
you can see api documentation:
ex: http://localhost:3001/api-docs/

## Noted
this application database using mysql. If you want simple configuration you can use mysql running inside docker container. using command and make sure you have installed docker 
```cd dockerfiles
  docker-compose up --build
```
