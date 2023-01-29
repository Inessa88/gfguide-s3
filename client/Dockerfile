FROM node:16.15.1 as build
ENV NODE_ENV production
LABEL version="1.0"
LABEL description="This is the base docker image for prod frontend react app."
LABEL maintainer = ["abc@gmail.com", "anc@gmail.com"]

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install --production

COPY . ./


RUN npm run build


# production environment
FROM nginx:1.14.0
COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
