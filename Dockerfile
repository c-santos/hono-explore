# Start with a base image
FROM node:23-alpine3.19

# Set workdir
WORKDIR /hono-explore

# Copy all files to workdir
COPY . /hono-explore/

# Install fresh node_modules
RUN npm install

# Run project
CMD ["npm", "run", "dev"]
