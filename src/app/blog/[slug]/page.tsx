import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function BlogPost({ params }: { params: { slug: string } }) {
  let post = null;
  try {
    post = await prisma.post.findUnique({
      where: { slug: params.slug }
    });
  } catch (e) {
    // DB error
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-8 border-b pb-4">
        发布于 {post.publishedAt.toLocaleDateString()} · 阅读量: {post.views}
      </div>

      <article className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}
