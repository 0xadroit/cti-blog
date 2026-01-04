import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getAllSlugs } from '@/lib/blog';

interface Props {
  params: { slug: string };
}

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.summary || `Read ${post.title} by ${post.author}`,
    authors: [{ name: post.author }],
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.summary || `Read ${post.title} by ${post.author}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary || `Read ${post.title} by ${post.author}`,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[var(--dark-border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Terminal navigation */}
          <div className="terminal-text text-sm text-[var(--text-dim)] mb-6 animate-fade-in">
            <Link
              href="/blog"
              className="hover:text-[var(--neon-green)] transition-colors"
            >
              <span className="text-[var(--neon-green)]">$</span> cd ../blog
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-6 leading-tight animate-slide-up">
            {post.title}
          </h1>

          {/* Meta - Terminal style */}
          <div className="hacker-card rounded-lg p-4 mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="terminal-text text-sm space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-dim)] w-20">author:</span>
                <span className="text-[var(--neon-green)]">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-dim)] w-20">date:</span>
                <time dateTime={post.date} className="text-[var(--text-secondary)]">
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-dim)] w-20">read_time:</span>
                <span className="text-[var(--text-secondary)]">{post.readingTime} min</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-dim)] w-20">file:</span>
                <span className="text-[var(--neon-cyan)]">{params.slug}.md</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase()}`}
                  className="hacker-tag px-3 py-1 rounded hover:bg-[rgba(0,255,65,0.2)] transition-colors"
                >
                  #{tag.toLowerCase().replace(/\s+/g, '_')}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="terminal-text text-xs text-[var(--text-dim)] mb-6 animate-fade-in">
          <span className="text-[var(--neon-green)]">$</span> cat {params.slug}.md | render
        </div>
        
        <div 
          className="prose prose-lg max-w-none animate-slide-up"
          style={{ animationDelay: '100ms' }}
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--dark-border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="terminal-text text-sm text-[var(--text-secondary)] hover:text-[var(--neon-green)] transition-colors"
            >
              <span className="text-[var(--neon-green)]">←</span> cd ../blog
            </Link>
            
            <div className="terminal-text text-xs text-[var(--text-dim)]">
              EOF
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}
