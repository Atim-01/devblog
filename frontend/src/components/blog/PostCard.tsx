'use client';

import Link from 'next/link';
import { Post } from '@/lib/api';
import { Card, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Edit2, Trash2, Calendar, User, ArrowRight } from 'lucide-react';
import { cn } from '@/utils';

interface PostCardProps {
  post: Post;
  showActions?: boolean;
  onEdit?: (post: Post) => void;
  onDelete?: (post: Post) => void;
  isOwner?: boolean;
  className?: string;
}

export default function PostCard({ 
  post, 
  showActions = false, 
  onEdit, 
  onDelete, 
  isOwner = false,
  className = ''
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

  // Safety check - don't render if post doesn't have required data
  if (!post || !post.id) {
    console.error('PostCard: Post data is missing or invalid:', post);
    return null;
  }

  return (
    <Card 
      hover 
      className={cn('group overflow-hidden', className)}
    >
      <CardBody className="p-6">
        {/* Post Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>By {post.author?.username}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.createdAt)}</span>
            {post.updatedAt !== post.createdAt && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                Updated
              </span>
            )}
          </div>
        </div>
        
        {/* Post Title */}
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
          <Link
            href={`/posts/${post.id}`}
            className="hover:text-primary-600 transition-colors duration-200 block"
          >
            <span className="block overflow-hidden" style={{ 
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: '1.4',
              maxHeight: '2.8em'
            }}>
              {post.title}
            </span>
          </Link>
        </h3>
        
        {/* Post Content Preview */}
        <p 
          className="text-gray-600 mb-6 leading-relaxed"
          style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: '1.5',
            maxHeight: '4.5em'
          }}
        >
          {truncateContent(post.content)}
        </p>
        
        {/* Post Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center justify-between sm:justify-start">
            {/* Read More Link */}
            <Link
              href={`/posts/${post.id}`}
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm group/link"
            >
              Read more
              <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
            
            {/* Author Avatar */}
            {post.author && (
              <div className="flex items-center space-x-2 sm:hidden">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                  <span className="text-primary-600 text-sm font-semibold">
                    {post.author.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* Desktop Author Avatar */}
          {post.author && (
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                <span className="text-primary-600 text-sm font-semibold">
                  {post.author.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {post.author.username}
              </span>
            </div>
          )}
          
          {/* Action Buttons */}
          {showActions && isOwner && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit?.(post)}
                className="flex items-center gap-1"
              >
                <Edit2 className="h-3 w-3" />
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete?.(post)}
                className="flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
