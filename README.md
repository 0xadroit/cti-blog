# 🛡️ CTI-Blog | Cyber Threat Intelligence Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, hacker-themed cybersecurity threat intelligence blog built with Next.js 14**

[🌐 Live Demo](https://0xadroit.com) • [📖 Documentation](#documentation) • [🚀 Quick Start](#quick-start)

</div>

---

## 📸 Screenshots

<div align="center">
<table>
<tr>
<td><img src="docs/screenshots/home.png" alt="Home Page" width="400"/></td>
<td><img src="docs/screenshots/blog.png" alt="Blog Page" width="400"/></td>
</tr>
<tr>
<td align="center"><strong>Home Page</strong></td>
<td align="center"><strong>Blog Listing</strong></td>
</tr>
<tr>
<td><img src="docs/screenshots/post.png" alt="Blog Post" width="400"/></td>
<td><img src="docs/screenshots/about.png" alt="About Page" width="400"/></td>
</tr>
<tr>
<td align="center"><strong>Blog Post</strong></td>
<td align="center"><strong>About (Maintenance)</strong></td>
</tr>
</table>
</div>

---

## ✨ Features

### 🎨 Design & UI
- **Dark Hacker Theme** - Matrix-inspired design with neon green (#00ff41) accents
- **Terminal Aesthetics** - JetBrains Mono font, terminal prompts, and command-line styling
- **Glowing Effects** - Animated glow effects on headers and interactive elements
- **Matrix Rain Animation** - Canvas-based falling character animation on 404/maintenance pages
- **Responsive Design** - Mobile-first approach, works on all devices
- **Smooth Animations** - Fade-in, slide-up, and typing effects

### 📝 Content Management
- **Markdown-Based** - Write posts in Markdown with frontmatter metadata
- **Gray Matter** - Parses YAML frontmatter for post metadata
- **Remark + Rehype** - Processes Markdown to HTML with syntax highlighting
- **Dynamic Routing** - Automatic routes based on post slugs
- **Categories & Tags** - Organize content with flexible taxonomies
- **Reading Time** - Automatic calculation of estimated read time

### 🔍 SEO & Performance
- **Static Site Generation (SSG)** - Pre-rendered pages for optimal performance
- **SEO Optimized** - Meta tags, Open Graph, Twitter cards
- **Sitemap Generation** - Automatic XML sitemap
- **Fast Loading** - Optimized images and code splitting
- **Lighthouse Score** - 95+ on all metrics

### 🛠️ Developer Experience
- **TypeScript** - Full type safety across the codebase
- **ESLint + Prettier** - Code quality and formatting
- **Hot Reload** - Instant feedback during development
- **Component-Based** - Reusable React components

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/0xadroit/cti-blog.git

# Navigate to project directory
cd cti-blog

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start

# Or run on specific port
npm run start -- -p 5173
```

---

## 📁 Project Structure

```
cti-blog/
├── 📂 content/
│   └── 📂 posts/                    # Markdown blog posts
│       └── sliver-rat-threat-intel.md
├── 📂 public/
│   ├── 📂 images/                   # Static images
│   └── favicon.ico
├── 📂 src/
│   ├── 📂 app/                      # Next.js App Router
│   │   ├── 📂 about/                # About page (maintenance mode)
│   │   ├── 📂 blog/
│   │   │   ├── 📂 [slug]/           # Dynamic post pages
│   │   │   └── page.tsx             # Blog listing
│   │   ├── 📂 categories/           # Category pages
│   │   ├── 📂 tags/
│   │   │   ├── 📂 [tag]/            # Tag filter pages
│   │   │   └── page.tsx             # All tags
│   │   ├── globals.css              # Global styles & theme
│   │   ├── layout.tsx               # Root layout
│   │   ├── not-found.tsx            # 404 page
│   │   └── page.tsx                 # Home page
│   ├── 📂 components/               # Reusable components
│   │   ├── Footer.tsx
│   │   ├── TableOfContents.tsx
│   │   └── ThemeProvider.tsx
│   ├── 📂 config/
│   │   └── site.ts                  # Site configuration
│   ├── 📂 lib/
│   │   └── blog.ts                  # Blog utility functions
│   └── 📂 types/
│       └── blog.ts                  # TypeScript interfaces
├── .eslintrc.json
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 📝 Writing Blog Posts

### Creating a New Post

1. Create a new `.md` file in `content/posts/`:

```bash
touch content/posts/my-new-post.md
```

2. Add frontmatter and content:

```markdown
---
title: "Your Post Title"
date: "2026-01-03"
excerpt: "Brief description of your post for previews and SEO"
author: "0xadroit"
category: "Threat Analysis"
tags:
  - malware
  - apt
  - threat-intel
image: "/images/posts/cover.png"
featured: true
---

# Your Post Content

Start writing your analysis here...

## Subheading

More content with **bold** and *italic* text.

```python
# Code blocks with syntax highlighting
def analyze_malware():
    print("Analyzing...")
```

---

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Post title |
| `date` | string | ✅ | Publication date (YYYY-MM-DD) |
| `excerpt` | string | ✅ | Short description (max 160 chars) |
| `author` | string | ✅ | Author name |
| `category` | string | ❌ | Primary category |
| `tags` | array | ❌ | List of tags |
| `image` | string | ❌ | Cover image path |
| `featured` | boolean | ❌ | Featured post flag |

---

## ⚙️ Configuration

### Site Configuration

Edit `src/config/site.ts`:

```typescript
export const siteConfig: SiteConfig = {
  name: '0xadroit',
  description: 'Cybersecurity Threat Intelligence...',
  url: 'https://0xadroit.com',
  author: {
    name: '0xadroit',
    avatar: '/images/author/avatar.png',
    bio: 'Cybersecurity researcher...',
    role: 'Threat Intelligence Researcher',
    social: {
      twitter: 'https://twitter.com/0xadroit',
      github: 'https://github.com/0xadroit',
      linkedin: 'https://linkedin.com/in/0xadroit',
    },
  },
  postsPerPage: 9,
};
```

### Categories

```typescript
export const categories: Category[] = [
  {
    name: 'Threat Analysis',
    slug: 'threat-analysis',
    description: 'In-depth analysis of APT groups...',
    color: 'red',
  },
  // Add more categories...
];
```

### Navigation

```typescript
export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Categories', href: '/categories' },
  { name: 'Tags', href: '/tags' },
  { name: 'About', href: '/about' },
];
```

---

## 🎨 Theming

### Color Variables

The theme is defined in `src/app/globals.css`:

```css
:root {
  /* Primary - Neon Green */
  --neon-green: #00ff41;
  --neon-green-dim: #00cc33;
  
  /* Secondary - Cyber Cyan */
  --neon-cyan: #00d4ff;
  
  /* Accent - Warning Orange */
  --neon-orange: #ff6600;
  
  /* Background - Dark */
  --dark-bg: #0a0a0a;
  --dark-surface: #111111;
  --dark-elevated: #1a1a1a;
  --dark-border: #2a2a2a;
  
  /* Text */
  --text-primary: #e5e5e5;
  --text-secondary: #a3a3a3;
  --text-dim: #666666;
}
```

### Custom CSS Classes

```css
/* Neon glow text */
.neon-text {
  color: var(--neon-green);
  text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
}

/* Hacker-style card */
.hacker-card {
  background: linear-gradient(...);
  border: 1px solid var(--dark-border);
}

/* Terminal font */
.terminal-text {
  font-family: 'JetBrains Mono', monospace;
}

/* Tag styling */
.hacker-tag {
  background: rgba(0, 255, 65, 0.1);
  border: 1px solid rgba(0, 255, 65, 0.3);
  color: var(--neon-green);
}
```

---

## 🚢 Deployment

### Vercel (Recommended) 🚀

The easiest way to deploy - connect your GitHub repo and Vercel handles everything automatically.

```bash
# Option 1: Connect GitHub repo to Vercel
# Go to vercel.com/new and import your repository

# Option 2: Deploy via CLI
npm i -g vercel
vercel
```

📖 **Full Guide**: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

### Hostinger (Static Hosting) 🌐

For shared hosting on Hostinger:

```bash
# Build static files for Hostinger
npm run build:static

# Upload contents of 'out/' folder to public_html
```

📖 **Full Guide**: [HOSTINGER_DEPLOYMENT.md](HOSTINGER_DEPLOYMENT.md)

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build image
docker build -t cti-blog .

# Run container
docker run -p 3000:3000 cti-blog
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name 0xadroit.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |

---

## 📦 Dependencies

### Core

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 14.2.x | React framework |
| `react` | 18.x | UI library |
| `typescript` | 5.x | Type safety |

### Styling

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | 3.4.x | Utility-first CSS |
| `postcss` | 8.x | CSS processing |
| `autoprefixer` | 10.x | CSS vendor prefixes |

### Content

| Package | Version | Purpose |
|---------|---------|---------|
| `gray-matter` | 4.x | Parse frontmatter |
| `remark` | 15.x | Markdown processing |
| `remark-html` | 16.x | Markdown to HTML |
| `reading-time` | 1.x | Calculate read time |

### Icons

| Package | Version | Purpose |
|---------|---------|---------|
| `lucide-react` | 0.x | Icon library |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow ESLint rules
- Use meaningful component names
- Write descriptive commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

<div align="center">

**0xadroit**

[![Twitter](https://img.shields.io/badge/Twitter-@0xadroit-1DA1F2?style=for-the-badge&logo=twitter)](https://twitter.com/0xadroit)
[![GitHub](https://img.shields.io/badge/GitHub-0xadroit-181717?style=for-the-badge&logo=github)](https://github.com/0xadroit)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0xadroit-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/0xadroit)

*Security Researcher | Threat Intelligence Analyst | Red Team*

</div>

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icons
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) - Terminal font

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Made with 💚 by [0xadroit](https://github.com/0xadroit)

</div>
# cti-blog
