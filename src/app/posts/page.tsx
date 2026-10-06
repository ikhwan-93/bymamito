import { prisma } from "@/lib/prisma";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
        From the kitchen
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-cocoa md:text-5xl">
        Notes &amp; news
      </h1>

      {posts.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-cream-line bg-rose/30 px-6 py-12 text-center">
          <p className="font-display text-xl font-semibold text-cocoa">
            Nothing here yet
          </p>
          <p className="mt-2 text-cocoa/70">
            We&apos;re still stirring up our first story — check back soon.
          </p>
        </div>
      ) : (
        <div className="mt-10 divide-y divide-cream-line border-y border-cream-line">
          {posts.map((post) => (
            <article key={post.id} className="py-10 first:pt-6 last:pb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-caramel">
                {new Date(post.publishedAt).toLocaleDateString("en-MY", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-cocoa md:text-3xl">
                {post.title}
              </h2>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-cocoa/80">
                {post.body}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
