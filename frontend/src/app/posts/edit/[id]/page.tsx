'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { postsApi, Post, UpdatePostData, ApiError, handleApiError } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import PostForm from '@/components/blog/PostForm';

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const { id } = params;
  const [originalPost, setOriginalPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [submitError, setSubmitError] = useState('');
  const [fetchError, setFetchError] = useState<string | null>(null);
  
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoadingPost(true);
        setFetchError(null);
        
        const post = await postsApi.getById(id);
        
        if (!post) {
          setFetchError('Post not found');
          return;
        }

        // Check if user owns this post
        if (post.authorId !== user?.id) {
          setFetchError('You can only edit your own posts');
          return;
        }

        setOriginalPost(post);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        if (error instanceof ApiError && error.status === 404) {
          setFetchError('Post not found');
        } else if (error instanceof ApiError && error.status === 403) {
          setFetchError('You can only edit your own posts');
        } else {
          setFetchError(handleApiError(error));
        }
      } finally {
        setIsLoadingPost(false);
      }
    };

    fetchPost();
  }, [id, user?.id]);

  const handleSubmit = async (data: UpdatePostData) => {
    setIsLoading(true);
    setSubmitError('');

    try {
      await postsApi.update(id, data);
      router.push(`/posts/${id}`);
    } catch (error) {
      setSubmitError(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/posts/${id}`);
  };

  // Loading state
  if (isLoadingPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin mx-auto h-12 w-12 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (fetchError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-md p-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading post</h3>
                <p className="mt-2 text-sm text-red-700">{fetchError}</p>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Try again
                  </button>
                  <Link
                    href="/"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Back to posts
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!originalPost) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <Link
              href={`/posts/${id}`}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Back to post
            </Link>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 text-sm font-medium">
                  {user?.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-gray-700">
                {user?.username}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Post Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">
              Edit Post
            </h1>
            <p className="mt-2 text-gray-600">
              Make changes to your blog post
            </p>
          </div>

          <div className="p-8">
            <PostForm
              mode="edit"
              initialData={originalPost}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isLoading}
              submitError={submitError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
