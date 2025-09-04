import Link from 'next/link';
import { postsApi, Post } from '@/lib/api';
import PostList from '@/components/blog/PostList';

// Mock data for development (remove when backend is ready)
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14',
    content: 'Next.js 14 introduces the new App Router, Server Components, and many other exciting features...',
    authorId: '1',
    author: { id: '1', username: 'johndoe' },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Building Scalable APIs with NestJS',
    content: 'NestJS provides a robust framework for building scalable and maintainable server-side applications...',
    authorId: '2',
    author: { id: '2', username: 'janedoe' },
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z',
  },
  {
    id: '3',
    title: 'Mastering TypeScript for Production',
    content: 'TypeScript has become the standard for building large-scale JavaScript applications...',
    authorId: '1',
    author: { id: '1', username: 'johndoe' },
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
  },
];

export default async function HomePage() {
  // TODO: Replace with actual API call when backend is ready
  // const posts = await postsApi.getAll();
  const posts = mockPosts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Welcome to{' '}
              <span className="text-primary-600">Dev-Blog</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              A platform for developers to share knowledge, experiences, and insights through blog posts.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/create-post"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                >
                  Write a Post
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Latest Blog Posts
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover insights, tutorials, and stories from the developer community
          </p>
        </div>

        <PostList 
          posts={posts} 
          showActions={false}
          emptyMessage="Be the first to share your knowledge!"
        />

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to share your knowledge?
            </h3>
            <p className="text-gray-600 mb-6">
              Join our community of developers and start writing blog posts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
