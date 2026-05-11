export default function About() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-anime-pink">关于我</h1>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3 border-b-2 border-anime-pink pb-2">个人简介</h2>
        <p>你好！我是一名热爱二次元与编程的开发者。</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3 border-b-2 border-anime-pink pb-2">技能栈</h2>
        <div className="flex gap-2 flex-wrap">
          <span className="bg-anime-blue text-white px-3 py-1 rounded-full text-sm">React</span>
          <span className="bg-anime-blue text-white px-3 py-1 rounded-full text-sm">Next.js</span>
          <span className="bg-anime-blue text-white px-3 py-1 rounded-full text-sm">TypeScript</span>
        </div>
      </section>
    </div>
  );
}
