FROM node:9.11.1


# set working directory
RUN mkdir /app
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

ADD ./dist /app

RUN npm install

# start app
CMD ["npm", "start"]
