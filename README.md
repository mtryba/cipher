## Requirements
**Node: v12.17.0** - you can use nvm to install correct version of node. 

If you have nvm use `nvm install v12.17.0` and after it use `nvm use`

### How to use
1. Set correct variables in root directory in `.env` file. See for example .env file at the end of manual.
2. If you can use docker:
- To start dev server use `docker-compose up dev`
- To start prod server you can use `docker-compose up prod`

### Production:
1. `docker build -t leocode/task:latest .`
2. `docker run -p 9000:9000 -e PORT=9000 -e NODE_ENV=PROD -e LOGGER_LOG_LEVEL=info -e SWAGGER_DOCS=true -e AUTH_TOKEN_SECRET=authSecret -e PRIV_KEY_SECRET=secret -e TOKEN_EXPIRATION=5 leocode/task:latest `

### Urls
- `npm run build` - Build app
- `npm run start:dev` - Start app in development mode
- `npm run start` - Start app without watcher
- `npm run test` - Run unit test
- `npm run lint` - Lint server files

### Users credentials
1. Jan:
    - email: jan@leocode.com
    - password: leojan
2. Kasia
    - email: kasia@leocode.com
    - passowrd: leocode
    
## .env file example
```
PORT=9000
NODE_ENV=DEV
AUTH_TOKEN_SECRET=secret
LOGGER_LOG_LEVEL=info
TOKEN_EXPIRATION=5
SWAGGER_DOCS=true
PRIV_KEY_SECRET=secret
```
