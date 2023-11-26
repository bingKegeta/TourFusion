FROM docker.io/node:20-alpine3.18

WORKDIR /app
COPY . .
RUN npm i

EXPOSE   80
CMD npx vite preview --port 80 --host
