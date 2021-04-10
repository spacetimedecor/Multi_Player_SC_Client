FROM node:12.18.1
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# add app
COPY . ./

# install app dependencies
RUN npm install
RUN npm install react-scripts@4.0.3 -g

# start app
CMD ["npm", "start"]