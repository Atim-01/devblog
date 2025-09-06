import { Post, serverPostsApi, handleServerApiError } from '@/lib/server-api';
import PostsPageClient from './PostsPageClient';

// Server Component - data fetching happens on the server
export default async function PostsPage() {
  let posts: Post[] = [];
  let error: string | undefined;

  try {
    posts = await serverPostsApi.getAll();
  } catch (err) {
    console.error('Failed to fetch posts on server:', err);
    error = handleServerApiError(err);
  }

  return <PostsPageClient initialPosts={posts} initialError={error} />;
}
