<h1 align="center">
   Express-todos-Api
</h1>

If you want to add a new environment variable,you must add it to both your .env as well as define the validator in src/config/config.service.ts

### env variable all needed in .env.example

- JWT_ACCESS_TOKEN_LIFETIME values in '30m' minute, '10h' hours, '7d' for days, 'y' years
- JWT_REFRESH_TOKEN_LIFETIME values in '30m' minute , '10h' hours, '7d' for days, 'y' years

# Run app in typescript

```bash
 npm install
 npm start
```

# Routes

## Metrics Routes on Merrics server

    GET    /metrics

## Healthz Routes

    GET  api/healthz

## AUTH Routes

    login
    POST     api/auth/login
    register
    POST    api/auth/register
    logout
    POST    api/auth/logout
    me
    GET     api/auth/me
    new accessToken
    POST    api/auth/refresh

## Todos Routes

    create todo
    POST      api/tods
    get  todos
    GET       api/todos
    get todo
    GET       api/todo/id
    update todo
    PATCH     api/todo/id
    delete todo
    DELETE    api/todo/id
