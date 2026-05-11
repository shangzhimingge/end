# Personal Website Design Spec

## Overview
A personal website combining a resume, portfolio, and blog. Designed with an "Anime/ACG (二次元)" visual style. The UI copy and interactive elements should primarily use Chinese (中文).

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma (or Drizzle)
- **Content**: Markdown/MDX for blog bodies, DB for metadata/dynamic features.

## Visual Direction
- **Style**: Anime / ACG (二次元)
- **Characteristics**: Pastel/vibrant colors (e.g., pinks, light blues), anime-style illustrations/mascots, rounded corners, soft shadows, playful hover animations. UI text primarily in Chinese.

## Routes & Views
1. **`/` (首页 / Home)**
   - Hero section (看板娘/欢迎语)
   - Featured projects grid (精选作品)
   - Recent blog posts list (最新动态)
2. **`/about` (关于我 / About)**
   - Professional background (个人简介)
   - Timeline-style work history / education (履历时间轴)
   - Skills overview (技能栈)
3. **`/portfolio` (作品集 / Portfolio)**
   - Full gallery of projects (作品画廊)
   - Masonry or creative grid layout (瀑布流布局)
4. **`/blog` (博客 / Blog)**
   - List of all articles (文章列表)
   - Tag filtering (标签筛选)
5. **`/blog/[slug]` (文章详情 / Article)**
   - Article content (文章内容)
   - Dynamic view counter (阅读量统计)

## Database Schema (Draft)

```prisma
model Post {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String   // MDX or plain text if fully DB driven
  publishedAt DateTime @default(now())
  views       Int      @default(0)
  tags        String[] // Array of strings or relation
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

## Next Steps
1. Scaffold Next.js project.
2. Setup database/ORM.
3. Build base layout and theme.
4. Implement routing and core pages.