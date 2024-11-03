# Use an official Node.js image as the base
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight web server to serve the React app
RUN npm install -g serve

# Expose the port that the app will run on
EXPOSE 80

# Command to run the app
CMD ["serve", "-s", "build", "-l", "80"]
