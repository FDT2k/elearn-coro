FROM node:10.16.0-alpine


ADD ./npmrc /root/.npmrc
# set working directory
RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

ADD ./dist /app


RUN yarn install


RUN rm /root/.npmrc

# start app
CMD ["npm", "start"]
