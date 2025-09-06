'use client';

import Link from 'next/link';
import { Post } from '@/lib/server-api';
import PostList from '@/components/blog/PostList';
import { useAuth } from '@/hooks/useAuth';

interface HomePageClientProps {
  posts: Post[];
  error?: string;
}

export default function HomePageClient({ posts, error }: HomePageClientProps) {
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {authLoading ? (
              <div className="text-lg text-gray-500">Loading...</div>
            ) : isAuthenticated && user ? (
              <>
                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                  Welcome back,{' '}
                  <span className="text-primary-600">{user.username}</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Ready to share your knowledge or explore the latest posts from the community?
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <Link
                      href="/create-post"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 hover:text-white md:py-4 md:text-lg md:px-10"
                    >
                      Write a Post
                    </Link>
                  </div>
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <Link
                      href="/posts"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Browse Posts
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
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
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 hover:text-white md:py-4 md:text-lg md:px-10"
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
              </>
            )}
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

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-md p-6 max-w-md mx-auto">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Failed to load posts</h3>
                  <p className="mt-2 text-sm text-red-700">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts List */}
        {!error && (
          <PostList 
            posts={posts} 
            showActions={false}
            emptyMessage="Be the first to share your knowledge!"
          />
        )}

        {/* My Posts Section - Only show when authenticated */}
        {isAuthenticated && user && !authLoading && (
          <div className="mt-16">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
              My Blog Dashboard
              </h3>
              <p className="text-gray-600 mb-6">
                View and manage all your blog posts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/create-post"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 hover:text-white"
                >
                  Write a New Post
                </Link>
                <Link
                  href="/my-posts"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Browse All My Posts
                </Link>
              </div>
            </div>
          </div>
        )}
        
      </div>
      
    </div>
  );
}
