FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g @prisma/client

# Copy the rest of your application code
COPY prisma ./prisma

# Bundle app source
COPY . .

RUN npx prisma generate --schema ./prisma/schema.prisma
RUN npm run build
# Expose port 6000 for your app
EXPOSE 6000

# Start the application
CMD ["npm", "start"]
