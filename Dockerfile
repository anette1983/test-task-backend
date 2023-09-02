# FROM node:18-alpine as base
# WORKDIR /src
# COPY package*.json ./
# EXPOSE 3000

# FROM base as production
# ENV NODE_ENV=production
# RUN npm install
# COPY --chown=node:node . ./
# USER node
# CMD ["npm", "start"]

FROM node:18
WORKDIR /app
COPY . .
RUN npm install
# EXPOSE 3000
CMD ["npm", "start"]
