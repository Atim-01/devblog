import Link from 'next/link';
import { Post } from '@/lib/api';

interface PostViewProps {
  post: Post;
  showActions?: boolean;
  onEdit?: (post: Post) => void;
  onDelete?: (post: Post) => void;
  isOwner?: boolean;
  showBackButton?: boolean;
  backUrl?: string;
}

export default function PostView({
  post,
  showActions = false,
  onEdit,
  onDelete,
  isOwner = false,
  showBackButton = true,
  backUrl = '/'
}: PostViewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="space-y-8">
      {/* Post Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 text-lg font-medium">
                  {post.author?.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {post.author?.username}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(post.createdAt)}
                </p>
              </div>
            </div>
            
            {post.updatedAt !== post.createdAt && (
              <p className="text-sm text-gray-500">
                Updated {formatDate(post.updatedAt)}
              </p>
            )}
          </div>
        </div>

        {/* Post Body */}
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            {formatContent(post.content)}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      {(showActions || showBackButton) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            {showBackButton && (
              <Link
                href={backUrl}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                ← Back
              </Link>
            )}
            
            {/* Action Buttons */}
            {showActions && isOwner && (
              <div className="flex space-x-3">
                <button
                  onClick={() => onEdit?.(post)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Edit Post
                </button>
                <button
                  onClick={() => onDelete?.(post)}
                  className="px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                >
                  Delete Post
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to share your knowledge?
        </h3>
        <p className="text-gray-600 mb-6">
          Join our community and start writing blog posts today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/create-post"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Write a Post
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Browse More Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
