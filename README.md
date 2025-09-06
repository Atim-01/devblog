# Dev-Blog Platform

A modern, full-stack blog platform built with **Next.js** (frontend) and **NestJS** (backend). This project demonstrates modern web development practices including TypeScript, authentication, responsive design, and comprehensive error handling.

## 🚀 Features

### Core Functionality
- **User Authentication** - Secure registration and login with JWT
- **Blog Management** - Create, read, update, and delete blog posts
- **User Authorization** - Users can only edit/delete their own posts
- **Public Access** - View all posts without authentication
- **Responsive Design** - Mobile-first, responsive UI

### Technical Features
- **TypeScript** - Full type safety across frontend and backend
- **Modern UI** - Beautiful, accessible components with Tailwind CSS
- **Loading States** - Skeleton loaders and loading spinners
- **Error Handling** - Comprehensive error boundaries and user feedback
- **Toast Notifications** - Real-time user feedback system
- **Database Seeding** - Sample data for development and testing
- **API Documentation** - Well-structured REST API with validation

## 🏗️ Architecture

### Backend (NestJS)
```
backend/
├── src/
│   ├── auth/           # Authentication module
│   ├── users/          # User management
│   ├── posts/          # Blog post management
│   ├── entities/       # Database entities
│   ├── config/         # Configuration files
│   ├── common/         # Shared utilities
│   └── database/       # Database seeds
```

### Frontend (Next.js)
```
frontend/
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # API and utility functions
│   └── types/          # TypeScript type definitions
```

## 🛠️ Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeORM** - Object-Relational Mapping
- **PostgreSQL** - Primary database
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **class-validator** - Request validation
- **class-transformer** - Data transformation

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Context** - State management
- **Custom Hooks** - Reusable logic

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd devblog
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Configure your .env file with database credentials
# Edit .env with your PostgreSQL connection details

# Run database migrations (if using TypeORM migrations)
npm run typeorm:migration:run

# Seed the database with sample data
npm run seed

# Start the development server
npm run start:dev
```

The backend will be available at `http://localhost:3001`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=devblog_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure
JWT_EXPIRES_IN=24h

# Application Configuration
NODE_ENV=development
PORT=3001
API_PREFIX=api

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### Frontend Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Application Configuration
NEXT_PUBLIC_APP_NAME=Dev-Blog
NEXT_PUBLIC_APP_DESCRIPTION=A modern blog platform for developers

# Authentication Configuration
NEXT_PUBLIC_JWT_STORAGE_KEY=authToken
NEXT_PUBLIC_AUTH_REDIRECT_URL=/login
```

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Posts Table
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Posts (Public)
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `GET /api/posts/search?q=query` - Search posts
- `GET /api/posts/tag/:tag` - Get posts by tag

### Posts (Authenticated)
- `POST /api/posts` - Create new post
- `PATCH /api/posts/:id` - Update post (owner only)
- `DELETE /api/posts/:id` - Delete post (owner only)

### Users (Authenticated)
- `GET /api/users/profile` - Get user profile
- `PATCH /api/users/profile` - Update user profile

## 🎨 UI Components

The frontend includes a comprehensive set of reusable UI components:

### Core Components
- **Button** - Various styles and states
- **Input** - Form inputs with validation
- **Card** - Content containers with hover effects
- **LoadingSpinner** - Loading indicators
- **Skeleton** - Loading placeholders

### Feedback Components
- **ErrorMessage** - Error display
- **ErrorBoundary** - Error catching
- **Toast** - Notification system
- **EmptyState** - Empty state displays

### Layout Components
- **Header** - Navigation with mobile menu
- **Footer** - Site footer
- **PostCard** - Blog post preview
- **PostForm** - Create/edit post form

## 🧪 Testing

### Backend Testing
```bash
cd backend

# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov
```

### Frontend Testing
```bash
cd frontend

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

## 📦 Available Scripts

### Backend Scripts
- `npm run start` - Start production server
- `npm run start:dev` - Start development server
- `npm run build` - Build the application
- `npm run seed` - Seed database with sample data
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🚀 Deployment

### Backend Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Set production environment variables:**
   ```env
   NODE_ENV=production
   DATABASE_HOST=your_production_db_host
   JWT_SECRET=your_production_jwt_secret
   ```

3. **Deploy to your preferred platform:**
   - Heroku
   - AWS
   - DigitalOcean
   - Railway
   - Vercel (with serverless functions)

### Frontend Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel, Netlify, or your preferred platform**

## 🔒 Security Features

- **Password Hashing** - bcryptjs with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Server-side validation with class-validator
- **CORS Protection** - Configured for specific origins
- **SQL Injection Prevention** - TypeORM query builder
- **XSS Protection** - Input sanitization

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first approach** - Optimized for mobile devices
- **Breakpoints** - sm, md, lg, xl responsive breakpoints
- **Touch-friendly** - Large touch targets and gestures
- **Flexible layouts** - Adapts to all screen sizes

## 🎯 Performance Optimizations

- **Code Splitting** - Automatic code splitting with Next.js
- **Image Optimization** - Next.js Image component
- **Lazy Loading** - Components loaded on demand
- **Caching** - API response caching
- **Bundle Optimization** - Tree shaking and minification

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NestJS** - Amazing Node.js framework
- **Next.js** - React framework for production
- **Tailwind CSS** - Utility-first CSS framework
- **TypeORM** - TypeScript ORM
- **Lucide** - Beautiful icons

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/your-username/devblog/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

**Happy Coding! 🚀**
