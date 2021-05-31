FROM node:10-alpine

# Install PM2
RUN npm install -g pm2

# Set working directory
RUN mkdir -p /var/www/nest-es
WORKDIR /var/www/nest-es

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /var/www/nest-es/node_modules/.bin:$PATH
# create user with no password
RUN adduser --disabled-password user

# Copy existing application directory contents
COPY . /var/www/nest-es
# install and cache app dependencies
COPY package.json package-lock.json* /var/www/nest-es/

# grant a permission to the application
RUN chown -R user:user /var/www/nest-es
USER user

# clear application caching
RUN npm cache clean --force
# install all dependencies
RUN npm install

EXPOSE 3002
# start run in production environment
#CMD [ "npm", "run", "pm2:delete" ]
#CMD [ "npm", "run", "build-docker:dev" ]

# start run in development environment
CMD [ "npm", "run", "start:dev" ]
