import { getPayloadClient } from "@/lib/payload";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  let post: any = null;
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: 'posts',
      where: {
        and: [
          { slug: { equals: slug } },
          { status: { equals: 'published' } },
        ],
      },
      limit: 1,
    });
    post = res.docs[0] ?? null;
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
        发布于 {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '未知'} · 阅读量: {post.views || 0}
      </div>

      <article className="prose max-w-none">
        <pre className="whitespace-pre-wrap">{JSON.stringify(post.content, null, 2)}</pre>
      </article>
    </div>
  );
}
