import { getPayloadClient } from "@/lib/payload";

export default async function Portfolio() {
  let projects: any[] = [];
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: 'projects',
      limit: 100,
    });
    projects = res.docs;
  } catch (e) {
    console.warn("DB not connected or not initialized yet.");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-anime-pink text-center">作品画廊</h1>

      {projects.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-xl shadow">暂无作品记录哦~</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map(p => (
            <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform">
              <div className="h-40 bg-gray-200 w-full flex items-center justify-center">
                {p.image?.url ? (
                  <img src={p.image.url} alt={p.image.alt || p.name} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-gray-400">暂无图片</span>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{p.name}</h2>
                <p className="text-sm text-gray-600 mb-3">{p.description}</p>
                <div className="flex gap-1 flex-wrap">
                  {(p.techStack || []).map((t: string) => (
                    <span key={t} className="bg-anime-pink text-white text-xs px-2 py-1 rounded">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
