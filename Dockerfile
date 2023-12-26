FROM node:17-alpine

WORKDIR /app

COPY package.json /app/
COPY src/ /app/src
COPY public/ /app/public

RUN npm install 

RUN npm install --save lightweight-charts

RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

EXPOSE 3000


CMD ["npm", "start"]