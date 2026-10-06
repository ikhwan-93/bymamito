import { prisma } from "@/lib/prisma";
import { PostManager } from "./post-manager";

export default async function PostsAdminPage() {
  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-cocoa">Posts</h1>
      <p className="mt-2 text-sm text-cocoa/60">
        Write notes, news, and stories for your customers.
      </p>

      <PostManager
        posts={posts.map((p) => ({
          id: p.id,
          title: p.title,
          body: p.body,
          imageUrl: p.imageUrl,
          published: p.published,
          publishedAt: p.publishedAt.toISOString(),
        }))}
      />
    </div>
  );
}
