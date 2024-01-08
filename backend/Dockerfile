FROM node:18.13.0

# Set the working directory in the container
WORKDIR /app/backend

# Copy package.json and package-lock.json (if available) to the container
COPY backend/package*.json ./

CMD ["npm", "i"]

COPY backend/ ./

# Expose the port your backend service listens on
EXPOSE 5000


CMD ["npm", "start"]