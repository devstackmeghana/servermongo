

# FROM node:latest

# # Import the MongoDB public GPG Key
# RUN wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -

# # Add MongoDB repository to sources list
# RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# # Update package index and install MongoDB server and client tools
# RUN apt-get update && \
#     apt-get install -y mongodb-org

# # Set environment variable for MongoDB connection string
# ENV MONGODB_CONNECTION_STRING="mongodb+srv://certsManager:REEEEEEEC212112SDSDSD22_@certs.crwa1op.mongodb.net/certsManager?retryWrites=true&w=majority"


# WORKDIR /app

# COPY package.json .
# RUN npm install

# COPY . .

# CMD ["node", "index.js"]








# Use the official MongoDB image as the base image
FROM mongo

# Install required dependencies
RUN apt-get update && \
    apt-get install -y \
        openssl \
        mongodb-org-mongos \
        mongodb-org-server \
        mongodb-org-shell \
        mongodb-mongosh && \
    ln -s /usr/bin/mongosh /usr/bin/mongo

# Set the MONGODB_CONNECTION_STRING environment variable
ENV MONGODB_CONNECTION_STRING="mongodb+srv://certsManager:REEEEEEEC212112SDSDSD22_@certs.crwa1op.mongodb.net/certsManager?retryWrites=true&w=majority"

# Expose MongoDB port
EXPOSE 27017

# Command to run MongoDB
CMD ["mongod"]


















# FROM mongo

# # Install Node.js (if needed)
# RUN apt-get update && apt-get install -y nodejs npm

# # Set working directory
# WORKDIR /app

# # Copy package.json and install dependencies
# COPY package.json .
# RUN npm install

# # Copy the rest of the application
# COPY . .



# # Command to run the Node.js application
# CMD ["node", "index.js"]
