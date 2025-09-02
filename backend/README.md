# Dev-Blog Backend

A NestJS-based backend API for the Dev-Blog platform, providing user authentication and blog post management.

## Features

- User registration and authentication with JWT
- Blog post CRUD operations
- PostgreSQL database integration
- RESTful API endpoints
- Input validation and error handling
- Secure password hashing with bcrypt

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (remote or local)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment file:
```bash
cp env.example .env
```

3. Configure your environment variables in `.env`:
   - Database connection details
   - JWT secret key
   - Application port and CORS settings

4. Run the application:
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Posts (Public)
- `GET /posts` - Get all blog posts
- `GET /posts/:id` - Get single blog post

### Posts (Protected - Requires Authentication)
- `POST /posts` - Create new blog post
- `PATCH /posts/:id` - Update blog post (own posts only)
- `DELETE /posts/:id` - Delete blog post (own posts only)

## Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `password` - Hashed password
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Posts Table
- `id` - Primary key
- `title` - Post title
- `content` - Post content
- `authorId` - Foreign key to Users table
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Development

- `npm run start:dev` - Start in watch mode
- `npm run build` - Build the application
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
