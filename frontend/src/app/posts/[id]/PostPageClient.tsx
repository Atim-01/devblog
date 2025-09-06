'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Post, postsApi, ApiError, handleApiError } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import PostView from '@/components/blog/PostView';
import { ConfirmationModal } from '@/components/ui/Modal';
import { useToastNotifications } from '@/components/ui/Toast';

interface PostPageClientProps {
  post: Post;
}

export default function PostPageClient({ post }: PostPageClientProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const { success, error: showError } = useToastNotifications();

  const isOwner = post?.authorId === user?.id;

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await postsApi.delete(post.id);
      success('Post deleted successfully', 'The post has been permanently removed.');
      setShowDeleteModal(false);
      // Redirect to all posts page after a short delay
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err) {
      console.error('Failed to delete post:', err);
      showError('Failed to delete post', handleApiError(err));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

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
            
            {/* Edit/Delete buttons for post owner */}
            {isAuthenticated && isOwner && (
              <div className="flex space-x-3">
                <Link
                  href={`/posts/edit/${post.id}`}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDeleteClick}
                  disabled={isDeleting}
                  className="px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PostView 
          post={post}
          showActions={false}
          isOwner={isOwner}
          showBackButton={false}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone and the post will be permanently removed."
        confirmText="Delete Post"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
