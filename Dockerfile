FROM nginx:1.10-alpine
# LibSass needs to be built in this container, thus the need for git, phyton, make and g++
RUN apk add --no-cache nodejs git python make g++
WORKDIR /usr/share/nginx/html/acquire-frontend
COPY . /usr/share/nginx/html/acquire-frontend
COPY nginx.conf /etc/nginx/nginx.conf
