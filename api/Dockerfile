FROM node:16.15.1
ENV NODE_ENV production
LABEL version="1.0"
LABEL description="This is the base docker image for Humaine frontend react app."
LABEL maintainer = ["saivicky2015@gmail.com", "akashsmaran@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]


RUN npm install --production

COPY --chown=node:node . .

USER node

EXPOSE 4000

CMD "npm" "start"
