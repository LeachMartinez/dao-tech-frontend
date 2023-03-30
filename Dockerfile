FROM node:19-alpine3.16 AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /dao-tech-frontend
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install typescript -g
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]