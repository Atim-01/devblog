import Link from 'next/link';
import { notFound } from 'next/navigation';
import { postsApi, Post } from '@/lib/api';
import PostView from '@/components/blog/PostView';

// Mock data for development (remove when backend is ready)
const mockPosts: Record<string, Post> = {
  '1': {
    id: '1',
    title: 'Getting Started with Next.js 14',
    content: `Next.js 14 introduces the new App Router, Server Components, and many other exciting features that revolutionize how we build React applications.

## What's New in Next.js 14?

The App Router is the biggest change in Next.js 14. It introduces a new file-system based router that makes it easier to create complex layouts and nested routes. With the App Router, you can:

- Create nested layouts that share UI between routes
- Use Server Components by default for better performance
- Implement streaming for faster page loads
- Use the new loading.js and error.js files for better UX

## Server Components

Server Components are React components that run on the server and can access backend resources directly. This means:

- No need to fetch data on the client
- Smaller JavaScript bundles
- Better SEO and performance
- Direct access to databases and APIs

## Getting Started

To get started with Next.js 14, you can create a new project using:

\`\`\`bash
npx create-next-app@latest my-app --app
\`\`\`

This will create a new Next.js project with the App Router enabled by default.

## Key Benefits

- **Performance**: Better performance with Server Components
- **Developer Experience**: Improved DX with the new router
- **SEO**: Better SEO with server-side rendering
- **Scalability**: More scalable architecture for large applications

Next.js 14 represents a significant step forward in the React ecosystem, making it easier than ever to build fast, scalable web applications.`,
    authorId: '1',
    author: { id: '1', username: 'johndoe' },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  '2': {
    id: '2',
    title: 'Building Scalable APIs with NestJS',
    content: `NestJS provides a robust framework for building scalable and maintainable server-side applications. It combines the best practices from object-oriented programming, functional programming, and functional reactive programming.

## Why Choose NestJS?

NestJS offers several advantages over other Node.js frameworks:

- **TypeScript First**: Built with TypeScript from the ground up
- **Modular Architecture**: Easy to organize code into modules
- **Dependency Injection**: Built-in DI container for better testability
- **Decorators**: Use decorators for clean, readable code
- **OpenAPI Support**: Automatic API documentation generation

## Core Concepts

### Modules
Modules are the basic building blocks of NestJS applications. They help organize related functionality:

\`\`\`typescript
@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
\`\`\`

### Controllers
Controllers handle incoming requests and return responses:

\`\`\`typescript
@Controller('users')
export class UserController {
  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }
}
\`\`\`

### Services
Services contain business logic and can be injected into controllers:

\`\`\`typescript
@Injectable()
export class UserService {
  findAll(): User[] {
    return this.users;
  }
}
\`\`\`

## Getting Started

To create a new NestJS project:

\`\`\`bash
npm i -g @nestjs/cli
nest new project-name
\`\`\`

NestJS provides a solid foundation for building enterprise-grade applications with Node.js.`,
    authorId: '2',
    author: { id: '2', username: 'janedoe' },
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z',
  },
  '3': {
    id: '3',
    title: 'Mastering TypeScript for Production',
    content: `TypeScript has become the standard for building large-scale JavaScript applications. It provides static typing, better tooling, and improved developer experience.

## TypeScript Benefits

- **Static Typing**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Improved Maintainability**: Easier to maintain large codebases
- **Team Collaboration**: Better code documentation through types

## Advanced Features

### Generics
Generics allow you to create reusable components:

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

const output = identity<string>("myString");
\`\`\`

### Union Types
Union types allow a value to be one of several types:

\`\`\`typescript
type Status = "loading" | "success" | "error";

function handleStatus(status: Status) {
  switch (status) {
    case "loading":
      return "Please wait...";
    case "success":
      return "Operation completed!";
    case "error":
      return "Something went wrong.";
  }
}
\`\`\`

### Utility Types
TypeScript provides many utility types:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>; // All properties optional
type UserKeys = keyof User; // "id" | "name" | "email"
\`\`\`

## Best Practices

1. **Use strict mode**: Enable strict TypeScript configuration
2. **Define interfaces**: Create clear contracts for your data
3. **Avoid any**: Use proper types instead of any
4. **Use enums sparingly**: Prefer union types for simple cases
5. **Leverage utility types**: Use built-in utility types when possible

TypeScript is an essential tool for modern JavaScript development, providing the safety and tooling needed for production applications.`,
    authorId: '1',
    author: { id: '1', username: 'johndoe' },
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
  },
};

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = params;

  // TODO: Replace with actual API call when backend is ready
  // const post = await postsApi.getById(id);
  const post = mockPosts[id];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Back to posts
            </Link>
            
            {/* TODO: Add edit/delete buttons for post owner */}
            {/* {isOwner && (
              <div className="flex space-x-3">
                <Link
                  href={`/posts/edit/${post.id}`}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PostView 
          post={post}
          showActions={false}
          showBackButton={false}
        />
      </div>
    </div>
  );
}
