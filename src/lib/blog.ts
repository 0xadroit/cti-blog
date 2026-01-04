import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

// Posts directory at root level
const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostMeta {
  title: string;
  date: string;
  author: string;
  tags: string[];
  summary?: string;
}

export interface Post extends PostMeta {
  slug: string;
  content: string;
  readingTime: number;
}

/**
 * Parse markdown content to HTML with GFM support (tables, strikethrough, etc.)
 */
async function parseMarkdown(content: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm) // Enable GitHub Flavored Markdown (tables, strikethrough, etc.)
    .use(html, { sanitize: false }) // Allow raw HTML and proper table rendering
    .process(content);
  return result.toString();
}

/**
 * Calculate reading time in minutes
 */
function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

/**
 * Get all post slugs (filename without .md extension)
 */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }
  return fs.readdirSync(postsDirectory)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''));
}

/**
 * Get all posts with metadata
 */
export function getAllPosts(): (PostMeta & { slug: string; readingTime: number })[] {
  const slugs = getAllSlugs();
  
  return slugs
    .map(slug => {
      const filePath = path.join(postsDirectory, `${slug}.md`);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author || 'Anonymous',
        tags: data.tags || [],
        summary: data.summary || '',
        readingTime: getReadingTime(content),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single post by slug (filename)
 */
export async function getPost(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const htmlContent = await parseMarkdown(content);

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'Anonymous',
      tags: data.tags || [],
      summary: data.summary || '',
      content: htmlContent,
      readingTime: getReadingTime(content),
    };
  } catch {
    return null;
  }
}

/**
 * Get all unique tags with count
 */
export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const tagCounts = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): (PostMeta & { slug: string; readingTime: number })[] {
  const posts = getAllPosts();
  return posts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}
