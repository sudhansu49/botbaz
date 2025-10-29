# Docker Setup for BotBaz

This guide explains how to run the BotBaz application using Docker for easier deployment and development.

## Prerequisites

- Docker installed on your system
- Docker Compose installed on your system

## Docker Configuration

### Frontend Dockerfile

Create a file named `Dockerfile` in the `botbaz-frontend` directory:

```dockerfile
# botbaz-frontend/Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Backend Dockerfile

Create a file named `Dockerfile` in the `botbaz-backend` directory:

```dockerfile
# botbaz-backend/Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### Docker Compose Configuration

Create a file named `docker-compose.yml` in the root directory:

```yaml
version: '3.8'

services:
  # MongoDB Database
  mongodb:
    image: mongo:5.0
    container_name: botbaz-mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password

  # Frontend Application
  frontend:
    build:
      context: ./botbaz-frontend
      dockerfile: Dockerfile
    container_name: botbaz-frontend
    ports:
      - "3000:3000"
    volumes:
      - ./botbaz-frontend:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
    depends_on:
      - backend

  # Backend Application
  backend:
    build:
      context: ./botbaz-backend
      dockerfile: Dockerfile
    container_name: botbaz-backend
    ports:
      - "5000:5000"
    volumes:
      - ./botbaz-backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - MONGO_URI=mongodb://admin:password@mongodb:27017/botbaz?authSource=admin
      - JWT_SECRET=botbaz_jwt_secret_key_change_in_production
      - WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token
      - WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
      - WEBHOOK_VERIFY_TOKEN=your_webhook_verify_token
    depends_on:
      - mongodb

volumes:
  mongodb_data:
```

## Running with Docker

1. Make sure you're in the root directory of the project (where docker-compose.yml is located)

2. Build and start all services:
   ```bash
   docker-compose up --build
   ```

3. The applications will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: mongodb://localhost:27017

4. To stop the services:
   ```bash
   docker-compose down
   ```

## Development with Docker

For development, you can run the services in detached mode:

```bash
docker-compose up -d --build
```

To view logs:
```bash
docker-compose logs -f
```

To stop services:
```bash
docker-compose down
```

## Environment Variables

Make sure to update the environment variables in the docker-compose.yml file with your actual values, especially:
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WEBHOOK_VERIFY_TOKEN`
- `JWT_SECRET` (use a strong secret in production)

## Production Considerations

For production deployment:

1. Use a production-ready MongoDB setup (MongoDB Atlas or replica set)
2. Use environment files (.env) for sensitive configuration
3. Implement proper SSL/HTTPS
4. Add reverse proxy (nginx) for better performance
5. Use Docker Swarm or Kubernetes for orchestration
6. Implement proper logging and monitoring
7. Set up automated backups for the database

## Troubleshooting

If you encounter issues:

1. Make sure all ports are available (3000, 5000, 27017)
2. Check that Docker and Docker Compose are properly installed
3. Verify environment variables are correctly set
4. Check container logs with `docker-compose logs`