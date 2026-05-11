import prisma from "@/lib/prisma";

export default async function Portfolio() {
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];
  try {
    projects = await prisma.project.findMany();
  } catch (e) {
    console.warn("DB not connected or seeded yet.");
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
                <span className="text-gray-400">Image: {p.imageUrl}</span>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{p.name}</h2>
                <p className="text-sm text-gray-600 mb-3">{p.description}</p>
                <div className="flex gap-1 flex-wrap">
                  {p.techStack.map(t => (
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
