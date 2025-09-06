import Link from 'next/link';
import { Post, serverPostsApi, handleServerApiError } from '@/lib/server-api';
import PostPageClient from './PostPageClient';
import ServerError from '@/components/ui/ServerError';

interface PostPageProps {
  params: {
    id: string;
  };
}

// Server Component - data fetching happens on the server
export default async function PostPage({ params }: PostPageProps) {
  const { id } = params;
  let post: Post | null = null;
  let error: string | undefined;

  try {
    post = await serverPostsApi.getById(id);
  } catch (err) {
    console.error('Failed to fetch post on server:', err);
    error = handleServerApiError(err);
  }

  if (error) {
    return <ServerError error={error} title="Error loading post" />;
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
          <p className="mt-2 text-gray-600">The post you're looking for doesn't exist.</p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Back to posts
          </Link>
        </div>
      </div>
    );
  }

  return <PostPageClient post={post} />;
}
