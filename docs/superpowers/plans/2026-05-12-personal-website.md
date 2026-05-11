# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an anime-style (二次元) personal website with resume, portfolio, and blog using Next.js.

**Architecture:** Next.js App Router for frontend and API routes. Prisma + PostgreSQL for data layer. Tailwind CSS for styling with custom anime-themed utility classes. MDX for blog content parsing.

**Tech Stack:** Next.js, Tailwind CSS, Prisma, PostgreSQL, MDX.

---

### Task 1: Scaffold Next.js Project and Tailwind Config

**Files:**
- Create: `package.json`
- Create: `next.config.mjs`
- Create: `tailwind.config.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`

- [ ] **Step 1: Initialize Next.js project**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```

- [ ] **Step 2: Configure Anime Theme in Tailwind**

Edit `tailwind.config.ts` to add custom pastel colors and rounded themes:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        anime: {
          pink: "#ffb6c1",
          blue: "#add8e6",
          bg: "#fff5f8",
          text: "#4a4a4a",
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 3: Setup Global CSS**

Edit `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: theme('colors.anime.bg');
  color: theme('colors.anime.text');
  font-family: system-ui, -apple-system, sans-serif;
}
```

- [ ] **Step 4: Update Root Layout**

Edit `src/app/layout.tsx`:

```tsx
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
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: init nextjs project with anime tailwind theme"
```

### Task 2: Setup Prisma and Database Schema

**Files:**
- Create: `prisma/schema.prisma`
- Create: `.env`
- Create: `src/lib/prisma.ts`

- [ ] **Step 1: Install Prisma**

```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

- [ ] **Step 2: Define Schema**

Edit `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Post {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String
  publishedAt DateTime @default(now())
  views       Int      @default(0)
  tags        String[]
}

model Project {
  id          String   @id @default(cuid())
  name        String
  description String
  imageUrl    String
  link        String?
  techStack   String[]
  featured    Boolean  @default(false)
}
```

- [ ] **Step 3: Setup Prisma Client Instance**

Create `src/lib/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
```

- [ ] **Step 4: Commit**

```bash
git add prisma/schema.prisma src/lib/prisma.ts package.json package-lock.json
git commit -m "chore: setup prisma schema for posts and projects"
```

### Task 3: Build Home and About Pages

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Implement Home Page**

Edit `src/app/page.tsx`:

```tsx
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
```

- [ ] **Step 2: Implement About Page**

Create `src/app/about/page.tsx`:

```tsx
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
```

- [ ] **Step 3: Test Pages**

Run `npm run build` to ensure no syntax errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/about/page.tsx
git commit -m "feat: implement home and about pages with anime styling"
```

### Task 4: Build Portfolio Page

**Files:**
- Create: `src/app/portfolio/page.tsx`

- [ ] **Step 1: Implement Portfolio Page**

Create `src/app/portfolio/page.tsx`:

```tsx
import prisma from "@/lib/prisma";

export default async function Portfolio() {
  // Graceful fallback if DB is not seeded yet
  let projects = [];
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
```

- [ ] **Step 2: Test Page**

Run `npm run build`.

- [ ] **Step 3: Commit**

```bash
git add src/app/portfolio/page.tsx
git commit -m "feat: implement portfolio gallery page"
```

### Task 5: Build Blog List and Detail Pages

**Files:**
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Implement Blog List Page**

Create `src/app/blog/page.tsx`:

```tsx
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function BlogList() {
  let posts = [];
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
```

- [ ] **Step 2: Implement Blog Detail Page**

Create `src/app/blog/[slug]/page.tsx`:

```tsx
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
        {/* Render markdown content here. For now, simple text */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}
```

- [ ] **Step 3: Test Pages**

Run `npm run build`.

- [ ] **Step 4: Commit**

```bash
git add src/app/blog/page.tsx src/app/blog/[slug]/page.tsx
git commit -m "feat: implement blog list and detail views"
```