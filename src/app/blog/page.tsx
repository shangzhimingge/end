import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function BlogList() {
  let posts: Awaited<ReturnType<typeof prisma.post.findMany>> = [];
  try {
    posts = await prisma.post.findMany({ orderBy: { publishedAt: 'desc' } });
  } catch (e) {
    console.warn("DB not connected or seeded yet.");
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-anime-blue">文章列表</h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">博主很懒，还没有写文章。</p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block p-4 border-2 border-transparent hover:border-anime-blue rounded-xl transition-colors bg-anime-bg">
              <h2 className="text-xl font-bold text-anime-text">{post.title}</h2>
              <div className="text-sm text-gray-500 mt-2 flex gap-4">
                <span>📅 {post.publishedAt.toLocaleDateString()}</span>
                <span>👀 {post.views} 阅读</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
