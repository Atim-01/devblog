import Link from 'next/link';
import { Post } from '@/lib/api';

interface PostCardProps {
  post: Post;
  showActions?: boolean;
  onEdit?: (post: Post) => void;
  onDelete?: (post: Post) => void;
  isOwner?: boolean;
}

export default function PostCard({ 
  post, 
  showActions = false, 
  onEdit, 
  onDelete, 
  isOwner = false 
}: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Post Meta */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>By {post.author?.username}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(post.createdAt)}</span>
          {post.updatedAt !== post.createdAt && (
            <>
              <span className="mx-2">•</span>
              <span className="text-xs">Updated {formatDate(post.updatedAt)}</span>
            </>
          )}
        </div>
        
        {/* Post Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          <Link
            href={`/posts/${post.id}`}
            className="hover:text-primary-600 transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h3>
        
        {/* Post Content Preview */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {truncateContent(post.content)}
        </p>
        
        {/* Post Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Read More Link */}
            <Link
              href={`/posts/${post.id}`}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              Read more →
            </Link>
            
            {/* Author Avatar */}
            {post.author && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 text-sm font-medium">
                    {post.author.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {post.author.username}
                </span>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          {showActions && isOwner && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit?.(post)}
                className="px-3 py-1 text-xs border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete?.(post)}
                className="px-3 py-1 text-xs border border-red-300 rounded-md text-red-700 hover:bg-red-50 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
