From node:latest

WORKDIR /gui

COPY package.json .
COPY package-lock.json .

RUN npm install -g npm

RUN npm install

COPY . .


