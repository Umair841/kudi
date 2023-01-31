FROM 489994096722.dkr.ecr.us-east-1.amazonaws.com/ammar-k:latest

COPY . ./app

WORKDIR /app

RUN npm install

RUN npm install pm2 -g

RUN npm install -D pm2
RUN npm install -D ts-node

RUN pm2 install typescript

EXPOSE 3900

CMD ["pm2-runtime", "pm2.json"]
