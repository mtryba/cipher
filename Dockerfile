FROM node:12.17.0-alpine as builder
RUN apk --no-cache add --virtual builds-deps build-base python

WORKDIR /app
COPY package* ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:12.17.0-alpine
WORKDIR /app

COPY --from=builder ./app/dist ./dist
COPY package* ./

RUN npm ci --production
CMD ["npm", "run", "start:prod"]
