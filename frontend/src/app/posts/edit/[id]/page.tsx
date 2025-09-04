'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { postsApi, Post, UpdatePostData } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import PostForm from '@/components/blog/PostForm';

// Mock data for development (remove when backend is ready)
const mockPosts: Record<string, Post> = {
  '1': {
    id: '1',
    title: 'Getting Started with Next.js 14',
    content: 'Next.js 14 introduces the new App Router, Server Components, and many other exciting features...',
    authorId: '1',
    author: { id: '1', username: 'johndoe' },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  '2': {
    id: '2',
    title: 'Building Scalable APIs with NestJS',
    content: 'NestJS provides a robust framework for building scalable and maintainable server-side applications...',
    authorId: '2',
    author: { id: '2', username: 'janedoe' },
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z',
  },
  '3': {
    id: '3',
    title: 'Mastering TypeScript for Production',
    content: 'TypeScript has become the standard for building large-scale JavaScript applications...',
    authorId: '1',
    author: { id: '1', username: 'johndoe' },
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
  },
};

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
        // TODO: Replace with actual API call when backend is ready
        // const post = await postsApi.getById(id);
        const post = mockPosts[id];
        
        if (!post) {
          router.push('/');
          return;
        }

        // Check if user owns this post
        if (post.authorId !== user?.id) {
          router.push('/');
          return;
        }

        setOriginalPost(post);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        router.push('/');
      } finally {
        setIsLoadingPost(false);
      }
    };

    fetchPost();
  }, [id, user?.id, router]);

  const handleSubmit = async (data: UpdatePostData) => {
    setIsLoading(true);
    setSubmitError('');

    try {
      await postsApi.update(id, data);
      router.push(`/posts/${id}`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to update post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/posts/${id}`);
  };

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
