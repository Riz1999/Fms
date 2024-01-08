FROM node:18.13.0 as build

# Set the working directory in the container
WORKDIR /app/woxsen_foodmart_system_old

# Copy package.json and package-lock.json (if available) to the container
COPY woxsen_foodmart_system_old/package*.json ./

Run "npm", "i"

COPY woxsen_foodmart_system_old/ ./

# Expose the port your backend service listens on
EXPOSE 3000


CMD ["npm", "start"]