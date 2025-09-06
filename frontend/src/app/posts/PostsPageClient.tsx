'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Post, postsApi, ApiError, handleApiError } from '@/lib/api';
import PostList from '@/components/blog/PostList';
import { useAuth } from '@/hooks/useAuth';
import { Search, Plus, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';

interface PostsPageClientProps {
  initialPosts: Post[];
  initialError?: string;
}

export default function PostsPageClient({ initialPosts, initialError }: PostsPageClientProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      // If search is empty, fetch all posts
      try {
        setIsSearching(true);
        const fetchedPosts = await postsApi.getAll();
        setPosts(fetchedPosts);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError(handleApiError(err));
      } finally {
        setIsSearching(false);
      }
      return;
    }

    try {
      setIsSearching(true);
      setError(null);
      const searchResults = await postsApi.search(query);
      setPosts(searchResults);
    } catch (err) {
      console.error('Search failed:', err);
      setError(handleApiError(err));
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">All Blog Posts</h1>
                <p className="text-gray-600 mt-1">
                  Discover insights, tutorials, and stories from the developer community
                </p>
              </div>
            </div>
            
            {isAuthenticated && (
              <Link href="/create-post">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Write a Post
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <form onSubmit={handleSearchSubmit} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts by title or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <Button
              type="submit"
              variant="outline"
              loading={isSearching}
              disabled={isSearching}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </div>
      </div>

      {/* Posts Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-primary-600 transition ease-in-out duration-150">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading posts...
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
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
                    onClick={() => router.refresh()}
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
        {!isLoading && !error && (
          <PostList 
            posts={posts} 
            showActions={false}
            emptyMessage={searchQuery ? "No posts found matching your search." : "No posts have been published yet."}
          />
        )}

        {/* Search Results Info */}
        {searchQuery && !isLoading && !error && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {posts.length} post{posts.length !== 1 ? 's' : ''} found for "{searchQuery}"
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                handleSearch('');
              }}
              className="mt-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
