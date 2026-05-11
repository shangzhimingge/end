export default function Home() {
  return (
    <div className="flex flex-col items-center text-center gap-8">
      <div className="bg-anime-blue p-8 rounded-2xl shadow-lg w-full">
        <h1 className="text-4xl font-bold mb-4 text-white">欢迎来到我的小站！✨</h1>
        <p className="text-white">这里是我的数字花园，包含简历、作品集和日常碎碎念。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-2 text-anime-pink">精选作品</h2>
          <p>看看我最近都在做什么好玩的项目~</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold mb-2 text-anime-blue">最新动态</h2>
          <p>分享技术、生活与思考。</p>
        </div>
      </div>
    </div>
  );
}
