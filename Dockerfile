# Use the official Node.js Alpine image as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Set environment variables
ENV MONGO_URI=mongodb+srv://medaminegh50:Aminegh90@pfedb.90fe3.mongodb.net/?retryWrites=true&w=majority
ENV PORT=3001
ENV JWT_SECRET=your-secret-key

# Expose the port that the application will run on
EXPOSE 3001

# Define the command to run the application
CMD ["npm", "start"]
