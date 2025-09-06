'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { postsApi, CreatePostData } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import PostForm from '@/components/blog/PostForm';

export default function CreatePostPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated (use useEffect to avoid SSR issues)
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-gray to-soft-lavender flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vivid-indigo mx-auto"></div>
          <p className="mt-4 text-medium-gray">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  const handleSubmit = async (data: CreatePostData) => {
    setIsLoading(true);
    setSubmitError('');

    try {
      const newPost = await postsApi.create(data);
      router.push(`/posts/${newPost.id}`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-gray to-soft-lavender">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-vivid-indigo hover:text-electric-blue font-medium"
            >
              ← Back to posts
            </Link>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-soft-lavender rounded-full flex items-center justify-center">
                <span className="text-vivid-indigo text-sm font-medium">
                  {user?.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-dark-charcoal">
                {user?.username}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-dark-charcoal">
              Create a New Post
            </h1>
            <p className="mt-2 text-medium-gray">
              Share your knowledge and experiences with the developer community
            </p>
          </div>

          <div className="p-8">
            <PostForm<CreatePostData>
              mode="create"
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
