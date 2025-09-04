import { SeedPost } from './seed-data.interface';

export const postsSeedData: SeedPost[] = [
  {
    title: 'Getting Started with TypeScript in 2024',
    content: `# Getting Started with TypeScript in 2024

TypeScript has become an essential tool for modern web development. In this post, I'll share my journey learning TypeScript and why it's become my go-to language for building scalable applications.

## Why TypeScript?

TypeScript brings static typing to JavaScript, which helps catch errors at compile time rather than runtime. This leads to:
- Better code quality
- Improved developer experience
- Easier refactoring
- Better IDE support

## Setting Up Your First TypeScript Project

\`\`\`bash
npm init -y
npm install -D typescript @types/node
npx tsc --init
\`\`\`

## Basic Types

TypeScript provides several built-in types:

\`\`\`typescript
let message: string = "Hello, TypeScript!";
let count: number = 42;
let isActive: boolean = true;
let items: string[] = ["apple", "banana", "orange"];
\`\`\`

## Conclusion

TypeScript is a powerful tool that can significantly improve your development workflow. Start with the basics and gradually incorporate more advanced features as you become comfortable with the language.

Happy coding! 🚀`,
    authorUsername: 'john_doe',
  },
  {
    title: 'Building RESTful APIs with NestJS',
    content: `# Building RESTful APIs with NestJS

NestJS is a progressive Node.js framework for building efficient and scalable server-side applications. It uses TypeScript by default and is heavily inspired by Angular.

## Why Choose NestJS?

- **Modular Architecture**: Built with modules, controllers, and services
- **TypeScript First**: Full TypeScript support out of the box
- **Decorator-based**: Uses decorators for clean, readable code
- **Built-in Validation**: Automatic request validation with class-validator
- **Database Integration**: Seamless integration with TypeORM, Prisma, and more

## Project Structure

\`\`\`
src/
├── app.module.ts
├── main.ts
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   └── users.service.ts
└── posts/
    ├── posts.module.ts
    ├── posts.controller.ts
    └── posts.service.ts
\`\`\`

## Creating a Simple Controller

\`\`\`typescript
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get()
  findAll() {
    return 'This action returns all posts';
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }
}
\`\`\`

## Database Integration with TypeORM

\`\`\`typescript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;
}
\`\`\`

NestJS makes it easy to build robust, scalable APIs with minimal boilerplate code.`,
    authorUsername: 'jane_smith',
  },
  {
    title: 'React Hooks: A Complete Guide',
    content: `# React Hooks: A Complete Guide

React Hooks revolutionized how we write React components by allowing us to use state and other React features in functional components.

## What are Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from functional components. They were introduced in React 16.8.

## Essential Hooks

### useState
Manages local component state:

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### useEffect
Handles side effects:

\`\`\`jsx
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []); // Empty dependency array means run once

  return <div>{data ? data.title : 'Loading...'}</div>;
}
\`\`\`

### useContext
Consumes context values:

\`\`\`jsx
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemedButton() {
  const theme = useContext(ThemeContext);
  
  return (
    <button style={{ background: theme.background }}>
      Themed Button
    </button>
  );
}
\`\`\`

## Custom Hooks

You can create your own hooks to share stateful logic:

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
\`\`\`

## Best Practices

1. **Only call hooks at the top level** - Don't call hooks inside loops, conditions, or nested functions
2. **Use multiple useState calls** - Don't try to put all state in a single object
3. **Extract custom hooks** - Reuse stateful logic across components
4. **Use dependency arrays correctly** - Include all values from component scope that are used inside the effect

Hooks have made React development more intuitive and functional components more powerful!`,
    authorUsername: 'alex_dev',
  },
  {
    title: 'CSS Grid vs Flexbox: When to Use Which',
    content: `# CSS Grid vs Flexbox: When to Use Which

CSS Grid and Flexbox are both powerful layout tools, but they serve different purposes. Understanding when to use each can significantly improve your CSS skills.

## CSS Grid

CSS Grid is a two-dimensional layout system, perfect for creating complex layouts with rows and columns.

### When to Use Grid:
- **Two-dimensional layouts** (rows AND columns)
- **Complex page layouts**
- **Overlapping elements**
- **Precise positioning**

### Example:
\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
  height: 100vh;
}

.header { grid-column: 1 / -1; }
.sidebar { grid-row: 2; }
.main { grid-row: 2; }
.footer { grid-column: 1 / -1; }
\`\`\`

## Flexbox

Flexbox is a one-dimensional layout system, ideal for distributing space along a single axis.

### When to Use Flexbox:
- **One-dimensional layouts** (row OR column)
- **Component-level layouts**
- **Aligning items**
- **Distributing space**

### Example:
\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.flex-item {
  flex: 1;
}
\`\`\`

## The Decision Framework

**Use Grid when:**
- You need to control both rows and columns
- Creating page layouts
- You want items to overlap
- You need precise positioning

**Use Flexbox when:**
- You're working with a single row or column
- Aligning items within a container
- Creating component layouts
- You need responsive behavior

## Combining Both

You can use both together! Grid for the overall layout and Flexbox for component internals:

\`\`\`css
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## Conclusion

- **Grid**: Two-dimensional, complex layouts, page structure
- **Flexbox**: One-dimensional, component layouts, alignment

Choose the right tool for the job, and don't be afraid to combine them!`,
    authorUsername: 'sarah_coder',
  },
  {
    title: 'Docker for Developers: A Practical Guide',
    content: `# Docker for Developers: A Practical Guide

Docker has revolutionized how we develop, ship, and run applications. It provides a consistent environment across development, testing, and production.

## What is Docker?

Docker is a containerization platform that packages applications and their dependencies into lightweight, portable containers.

## Key Benefits

- **Consistency**: Same environment everywhere
- **Isolation**: Applications run in isolated containers
- **Portability**: Run anywhere Docker is installed
- **Scalability**: Easy to scale applications
- **Efficiency**: Shared OS kernel, smaller footprint

## Basic Docker Commands

\`\`\`bash
# Build an image
docker build -t my-app .

# Run a container
docker run -p 3000:3000 my-app

# List running containers
docker ps

# Stop a container
docker stop container-id

# Remove a container
docker rm container-id
\`\`\`

## Dockerfile Example

\`\`\`dockerfile
# Use Node.js 18 as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
\`\`\`

## Docker Compose

For multi-container applications:

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db

  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
\`\`\`

## Best Practices

1. **Use .dockerignore** - Exclude unnecessary files
2. **Multi-stage builds** - Reduce image size
3. **Don't run as root** - Use non-root users
4. **Use specific tags** - Avoid 'latest' in production
5. **Health checks** - Monitor container health

## Development Workflow

\`\`\`bash
# Development
docker-compose up -d

# View logs
docker-compose logs -f

# Execute commands in container
docker-compose exec app npm test

# Rebuild after changes
docker-compose up --build
\`\`\`

Docker simplifies deployment and ensures your application runs consistently across all environments!`,
    authorUsername: 'mike_tech',
  },
  {
    title: 'Introduction to GraphQL',
    content: `# Introduction to GraphQL

GraphQL is a query language and runtime for APIs that provides a more efficient, powerful, and flexible alternative to REST.

## What is GraphQL?

GraphQL is a query language for APIs and a runtime for executing those queries. It was developed by Facebook in 2012 and open-sourced in 2015.

## Key Features

- **Single Endpoint**: One endpoint for all operations
- **Client-specified Queries**: Request exactly what you need
- **Strongly Typed**: Schema defines the API contract
- **Real-time**: Subscriptions for live updates
- **Introspection**: Self-documenting API

## GraphQL vs REST

| Feature | REST | GraphQL |
|---------|------|---------|
| Endpoints | Multiple | Single |
| Data Fetching | Fixed | Flexible |
| Over-fetching | Common | Rare |
| Under-fetching | Common | Rare |
| Caching | HTTP | Custom |

## Basic Schema

\`\`\`graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

type Query {
  user(id: ID!): User
  posts: [Post!]!
}

type Mutation {
  createPost(title: String!, content: String!): Post!
}
\`\`\`

## Example Query

\`\`\`graphql
query GetUserWithPosts($userId: ID!) {
  user(id: $userId) {
    name
    email
    posts {
      title
      content
    }
  }
}
\`\`\`

## Example Mutation

\`\`\`graphql
mutation CreatePost($title: String!, $content: String!) {
  createPost(title: $title, content: $content) {
    id
    title
    author {
      name
    }
  }
}
\`\`\`

## Setting Up GraphQL with Node.js

\`\`\`bash
npm install apollo-server graphql
\`\`\`

\`\`\`javascript
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql\`
  type Query {
    hello: String
  }
\`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(\`Server ready at \${url}\`);
});
\`\`\`

## Benefits

1. **Efficient Data Loading**: Request only what you need
2. **Single Source of Truth**: One endpoint for all data
3. **Real-time Updates**: Built-in subscription support
4. **Strong Typing**: Catch errors at development time
5. **Developer Experience**: Great tooling and introspection

GraphQL is particularly powerful for mobile applications and complex UIs where network efficiency is crucial.`,
    authorUsername: 'demo_user',
  },
  {
    title: 'Modern JavaScript: ES6+ Features You Should Know',
    content: `# Modern JavaScript: ES6+ Features You Should Know

JavaScript has evolved significantly since ES6 (ES2015). Here are the essential modern features every developer should know.

## Arrow Functions

Concise function syntax with lexical \`this\` binding:

\`\`\`javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With single parameter
const square = x => x * x;

// With no parameters
const getTime = () => new Date();
\`\`\`

## Destructuring

Extract values from objects and arrays:

\`\`\`javascript
// Object destructuring
const user = { name: 'John', age: 30, city: 'NYC' };
const { name, age } = user;

// Array destructuring
const colors = ['red', 'green', 'blue'];
const [primary, secondary] = colors;

// Function parameters
function greet({ name, age }) {
  return \`Hello \${name}, you are \${age} years old\`;
}
\`\`\`

## Template Literals

String interpolation with backticks:

\`\`\`javascript
const name = 'World';
const greeting = \`Hello, \${name}!\`;

// Multi-line strings
const html = \`
  <div>
    <h1>\${title}</h1>
    <p>\${content}</p>
  </div>
\`;
\`\`\`

## Spread and Rest Operators

\`\`\`javascript
// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];

// Object spread
const user = { name: 'John', age: 30 };
const updatedUser = { ...user, age: 31 };

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
\`\`\`

## Promises and Async/Await

\`\`\`javascript
// Promises
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Async/await
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

## Modules

\`\`\`javascript
// Export
export const PI = 3.14159;
export function calculateArea(radius) {
  return PI * radius * radius;
}

// Import
import { PI, calculateArea } from './math.js';
import * as math from './math.js';
\`\`\`

## Classes

\`\`\`javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return \`Hello, I'm \${this.name}\`;
  }

  static createAdult(name) {
    return new Person(name, 18);
  }
}

class Developer extends Person {
  constructor(name, age, language) {
    super(name, age);
    this.language = language;
  }

  code() {
    return \`I code in \${this.language}\`;
  }
}
\`\`\`

## Map and Set

\`\`\`javascript
// Map
const userRoles = new Map();
userRoles.set('john', 'admin');
userRoles.set('jane', 'user');

// Set
const uniqueNumbers = new Set([1, 2, 2, 3, 3, 4]);
console.log(uniqueNumbers); // Set {1, 2, 3, 4}
\`\`\`

## Optional Chaining and Nullish Coalescing

\`\`\`javascript
// Optional chaining
const user = { profile: { name: 'John' } };
const userName = user?.profile?.name; // 'John'
const userAge = user?.profile?.age; // undefined

// Nullish coalescing
const displayName = user?.name ?? 'Anonymous';
const port = process.env.PORT ?? 3000;
\`\`\`

These features make JavaScript more powerful, readable, and maintainable. Start incorporating them into your code today!`,
    authorUsername: 'john_doe',
  },
  {
    title: 'Database Design Best Practices',
    content: `# Database Design Best Practices

Good database design is crucial for application performance, maintainability, and scalability. Here are the essential principles every developer should follow.

## Normalization

Normalization reduces data redundancy and improves data integrity:

### First Normal Form (1NF)
- Each column contains atomic values
- No repeating groups
- Each row is unique

### Second Normal Form (2NF)
- Must be in 1NF
- All non-key attributes fully depend on the primary key

### Third Normal Form (3NF)
- Must be in 2NF
- No transitive dependencies

## Primary Keys

Choose appropriate primary keys:

\`\`\`sql
-- Natural key (if unique and stable)
CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Surrogate key (auto-generated)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL
);

-- Composite key (when needed)
CREATE TABLE order_items (
  order_id INT,
  product_id INT,
  quantity INT,
  PRIMARY KEY (order_id, product_id)
);
\`\`\`

## Indexing Strategy

Create indexes for frequently queried columns:

\`\`\`sql
-- Single column index
CREATE INDEX idx_users_email ON users(email);

-- Composite index
CREATE INDEX idx_posts_author_date ON posts(author_id, created_at);

-- Partial index
CREATE INDEX idx_active_users ON users(email) WHERE active = true;
\`\`\`

## Foreign Key Constraints

Maintain referential integrity:

\`\`\`sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  author_id INT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

## Data Types

Choose appropriate data types:

\`\`\`sql
-- Use specific numeric types
price DECIMAL(10,2)  -- Not FLOAT for money
quantity INTEGER     -- Not VARCHAR for numbers

-- Use appropriate string types
username VARCHAR(50)  -- Fixed max length
content TEXT         -- Variable length, large text

-- Use proper date types
created_at TIMESTAMP WITH TIME ZONE
birth_date DATE
\`\`\`

## Naming Conventions

Follow consistent naming:

\`\`\`sql
-- Tables: plural, snake_case
users, blog_posts, order_items

-- Columns: snake_case
user_id, created_at, first_name

-- Indexes: descriptive
idx_users_email, idx_posts_author_date

-- Constraints: descriptive
fk_posts_author, uk_users_email
\`\`\`

## Performance Considerations

### Query Optimization
\`\`\`sql
-- Use LIMIT for pagination
SELECT * FROM posts ORDER BY created_at DESC LIMIT 10 OFFSET 20;

-- Use EXISTS instead of IN for large datasets
SELECT * FROM users u WHERE EXISTS (
  SELECT 1 FROM posts p WHERE p.author_id = u.id
);
\`\`\`

### Avoid N+1 Queries
\`\`\`sql
-- Bad: N+1 queries
SELECT * FROM posts;
-- Then for each post: SELECT * FROM users WHERE id = ?

-- Good: Single query with JOIN
SELECT p.*, u.username 
FROM posts p 
JOIN users u ON p.author_id = u.id;
\`\`\`

## Security Best Practices

\`\`\`sql
-- Use parameterized queries (prevent SQL injection)
-- Bad
SELECT * FROM users WHERE email = '\${email}';

-- Good
SELECT * FROM users WHERE email = ?;

-- Limit user privileges
CREATE USER app_user WITH PASSWORD 'secure_password';
GRANT SELECT, INSERT, UPDATE ON posts TO app_user;
\`\`\`

## Backup and Recovery

\`\`\`bash
# Regular backups
pg_dump -h localhost -U username dbname > backup.sql

# Point-in-time recovery
pg_basebackup -D /backup/location -Ft -z -P
\`\`\`

## Monitoring and Maintenance

\`\`\`sql
-- Monitor slow queries
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC;

-- Update table statistics
ANALYZE users;

-- Rebuild indexes
REINDEX TABLE posts;
\`\`\`

Good database design is an investment that pays dividends in performance, maintainability, and developer productivity!`,
    authorUsername: 'jane_smith',
  },
];
