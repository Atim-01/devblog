import { Post } from '@/lib/api';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
  showActions?: boolean;
  onEdit?: (post: Post) => void;
  onDelete?: (post: Post) => void;
  currentUserId?: string;
  emptyMessage?: string;
  layout?: 'grid' | 'list';
}

export default function PostList({ 
  posts, 
  showActions = false, 
  onEdit, 
  onDelete, 
  currentUserId,
  emptyMessage = "No posts found",
  layout = 'grid'
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  const gridClasses = layout === 'grid' 
    ? 'grid gap-8 md:grid-cols-2 lg:grid-cols-3' 
    : 'space-y-6';

  return (
    <div className={gridClasses}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          showActions={showActions}
          onEdit={onEdit}
          onDelete={onDelete}
          isOwner={currentUserId ? post.authorId === currentUserId : false}
        />
      ))}
    </div>
  );
}
