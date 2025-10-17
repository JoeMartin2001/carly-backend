# Carly Backend

A scalable microservices backend built with NestJS, featuring a GraphQL gateway and gRPC-based microservices architecture.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Development](#development)
- [Testing](#testing)
- [API Documentation](#api-documentation)

## 🎯 Overview

Carly Backend is a microservices-based application designed with scalability and modularity in mind. The system consists of multiple services that communicate via gRPC, with a GraphQL gateway serving as the main entry point for client applications.

## 🏗 Architecture

The application follows a microservices architecture pattern:

```
┌─────────────────┐
│   Client App    │
└────────┬────────┘
         │ GraphQL
         ▼
┌─────────────────┐
│     Gateway     │  (Port: 4000)
│   (GraphQL API) │
└────────┬────────┘
         │ gRPC
    ┌────┴────┐
    ▼         ▼
┌─────────┐ ┌─────────┐
│  User   │ │  Auth   │
│ Service │ │ Service │
│ (50051) │ │ (50052) │
└─────────┘ └─────────┘
```

### Services

1. **Gateway** - Main entry point for client applications
   - Provides GraphQL API
   - Orchestrates communication between microservices
   - Handles authentication and authorization
   - Port: 4000 (development)

2. **User Service** - Manages user data and operations
   - gRPC microservice
   - Handles user CRUD operations
   - PostgreSQL database integration
   - Port: 50051

3. **Auth Service** - Handles authentication and authorization
   - gRPC microservice
   - JWT-based authentication
   - User authentication and token management
   - Port: 50052

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) v11
- **Language**: TypeScript v5.7
- **API Gateway**: GraphQL (Apollo Server v5)
- **Communication**: gRPC
- **Database**: PostgreSQL
- **ORM**: TypeORM v0.3
- **Authentication**: JWT (Passport.js)
- **Protocol Buffers**: ts-proto
- **Containerization**: Docker & Docker Compose
- **Package Manager**: Yarn

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v22.x or higher
- **Yarn**: v1.22.x or higher
- **Docker**: v20.x or higher (for containerized deployment)
- **Docker Compose**: v2.x or higher
- **PostgreSQL**: v13.x or higher (if running locally without Docker)

## 📁 Project Structure

```
carly-backend/
├── apps/
│   ├── gateway/              # GraphQL API Gateway
│   │   └── src/
│   │       ├── modules/      # Feature modules
│   │       ├── infra/        # Infrastructure (config, db, clients)
│   │       ├── common/       # Shared utilities and guards
│   │       └── graphql/      # GraphQL schema
│   ├── user-service/         # User microservice
│   │   └── src/
│   │       ├── common/       # Entities and constants
│   │       ├── infra/        # Infrastructure layer
│   │       └── user.controller.ts
│   └── auth-service/         # Authentication microservice
│       └── src/
│           ├── common/       # Entities and constants
│           ├── infra/        # Infrastructure layer
│           └── auth.controller.ts
├── libs/
│   └── proto/                # Protocol buffer definitions
│       ├── auth.proto
│       ├── user.proto
│       └── gen/              # Generated TypeScript files
├── config/                   # Environment configurations
│   ├── gateway/
│   ├── user-service/
│   └── auth-service/
├── docker/                   # Dockerfiles
│   ├── Dockerfile.gateway
│   ├── Dockerfile.user-service
│   └── Dockerfile.auth-service
├── docker-compose.yml        # Production compose file
├── docker-compose.dev.yml    # Development compose file
└── package.json
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd carly-backend
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Set up environment variables

Create environment configuration files for each service:

```bash
# Gateway
mkdir -p config/gateway
touch config/gateway/.env.dev

# User Service
mkdir -p config/user-service
touch config/user-service/.env.dev

# Auth Service
mkdir -p config/auth-service
touch config/auth-service/.env.dev
```

See [Environment Variables](#environment-variables) section for required variables.

### 4. Generate Protocol Buffer files

```bash
yarn proto:generate
```

## 🏃 Running the Application

### Development Mode (with Docker)

The easiest way to run all services in development:

```bash
yarn compose:up:dev
```

This will:

- Start all three services in watch mode
- Hot-reload on code changes
- Mount your local code as volumes
- Expose all service ports

Access the services:

- Gateway (GraphQL): http://localhost:4000/graphql
- User Service (gRPC): localhost:50051
- Auth Service (gRPC): localhost:50052

### Development Mode (without Docker)

Run each service individually:

```bash
# Terminal 1 - User Service
yarn start:user:dev

# Terminal 2 - Auth Service
yarn start:auth:dev

# Terminal 3 - Gateway
yarn start:gateway:dev
```

Or run all services in parallel:

```bash
yarn start:all
```

### Production Mode (with Docker)

```bash
yarn compose:up:prod
```

### Build for Production

```bash
# Build all services
yarn build

# Build individual services
yarn build:gateway
yarn build:user-service
yarn build:auth-service
```

## ⚙️ Environment Variables

### Gateway (.env.dev)

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=carly_gateway

# gRPC Services
USER_SERVICE_URL=localhost:50051
AUTH_SERVICE_URL=localhost:50052

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=3600
```

### User Service (.env.dev)

```env
# Server Configuration
PORT=50051
NODE_ENV=development

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=carly_users
```

### Auth Service (.env.dev)

```env
# Server Configuration
PORT=50052
NODE_ENV=development

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=carly_auth

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=3600
```

## 📜 Available Scripts

### Development

```bash
# Start all services in development
yarn start:all

# Start individual services
yarn start:gateway:dev      # Gateway in watch mode
yarn start:user:dev         # User service in watch mode
yarn start:auth:dev         # Auth service in watch mode
```

### Building

```bash
yarn build                  # Build all services
yarn build:gateway          # Build gateway only
yarn build:user-service     # Build user service only
yarn build:auth-service     # Build auth service only
```

### Docker

```bash
yarn compose:up:dev         # Start all services (development)
yarn compose:up:prod        # Start all services (production)
yarn compose:down           # Stop all services
yarn compose:restart        # Restart all services
```

### Protocol Buffers

```bash
yarn proto:generate         # Generate TypeScript from .proto files
```

### Code Quality

```bash
yarn lint                   # Run ESLint
yarn format                 # Format code with Prettier
```

### Testing

```bash
yarn test                   # Run unit tests
yarn test:watch             # Run tests in watch mode
yarn test:cov               # Generate test coverage
yarn test:e2e               # Run e2e tests
yarn test:debug             # Debug tests
```

## 💻 Development

### Adding a New Service

1. Generate a new NestJS application:

```bash
nest generate app <service-name>
```

2. Update `nest-cli.json` with the new service configuration

3. Create a Dockerfile in `docker/Dockerfile.<service-name>`

4. Add the service to `docker-compose.yml` and `docker-compose.dev.yml`

5. Create environment configuration in `config/<service-name>/`

### Working with Protocol Buffers

1. Define your service in `libs/proto/<service>.proto`

2. Generate TypeScript code:

```bash
yarn proto:generate
```

3. Import generated types in your service:

```typescript
import { ServiceClient } from '@libs/proto/gen/<service>';
```

### Database Migrations

TypeORM migrations can be run using the TypeORM CLI:

```bash
# Generate migration
npx typeorm migration:generate -n MigrationName

# Run migrations
npx typeorm migration:run

# Revert migration
npx typeorm migration:revert
```

## 🧪 Testing

### Unit Tests

```bash
yarn test
```

### E2E Tests

```bash
yarn test:e2e
```

### Test Coverage

```bash
yarn test:cov
```

## 📚 API Documentation

### GraphQL API

Access the GraphQL Playground in development mode:

```
http://localhost:4000/graphql
```

The playground provides:

- Interactive API documentation
- Schema exploration
- Query/Mutation testing

### gRPC Services

gRPC service definitions are available in:

- `libs/proto/user.proto` - User service contract
- `libs/proto/auth.proto` - Auth service contract

Use tools like [BloomRPC](https://github.com/bloomrpc/bloomrpc) or [grpcurl](https://github.com/fullstorydev/grpcurl) for testing gRPC endpoints.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Ensure linting passes
5. Submit a pull request

## 📄 License

This project is [UNLICENSED](LICENSE).

## 👥 Authors

- **Sardorbek** - Initial work

## 🔗 Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [GraphQL Documentation](https://graphql.org/learn/)
- [gRPC Documentation](https://grpc.io/docs/)
- [TypeORM Documentation](https://typeorm.io/)
- [Protocol Buffers Guide](https://protobuf.dev/)

---

Built with ❤️ using [NestJS](https://nestjs.com/)
