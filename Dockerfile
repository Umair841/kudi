FROM 489994096722.dkr.ecr.us-east-1.amazonaws.com/ammar-k:latest

COPY . ./app

WORKDIR /app

RUN npm install

RUN npm install pm2 -g

RUN npm install -D pm2
RUN npm install -D ts-node

RUN pm2 install typescript

# Temporary variables: @TODO Add the real variables in a conf fily for only deployment
ENV PORT 3900
ENV JWT_SECRET jwt_secret
ENV MONGO_HOST mongodb
ENV MONGO_PORT 27017
ENV MONGO_DATABASE kudi_db
ENV SENDGRID_API_KEY my-api-key

# testing new release

EXPOSE 3900

CMD ["pm2-runtime", "pm2.json"]
