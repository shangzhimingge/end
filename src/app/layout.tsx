import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "我的个人小站",
  description: "个人简历、作品集与博客",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <nav className="p-4 bg-anime-pink text-white flex gap-4">
          <a href="/" className="font-bold hover:underline">首页</a>
          <a href="/about" className="hover:underline">关于我</a>
          <a href="/portfolio" className="hover:underline">作品集</a>
          <a href="/blog" className="hover:underline">博客</a>
        </nav>
        <main className="p-8 max-w-4xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
