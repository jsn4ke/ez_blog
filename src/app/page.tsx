import Main from "@/components/layout/Main";
import PostCard from "@/components/post/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <Main>
      <h1 className="text-2xl font-bold mb-8">Latest Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.slug} post={post} />)
      ) : (
        <p className="text-[var(--muted-foreground)]">
          No posts yet. Stay tuned!
        </p>
      )}
    </Main>
  );
}
