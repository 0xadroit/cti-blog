import Link from 'next/link';
import { Metadata } from 'next';
import { getPostsByTag, getAllTags } from '@/lib/blog';

interface Props {
  params: { tag: string };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: tag.name.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `#${params.tag}`,
    description: `Browse all posts tagged with ${params.tag}`,
  };
}

export default function TagPage({ params }: Props) {
  const posts = getPostsByTag(params.tag);
  const tagName = params.tag;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Terminal Header */}
        <div className="mb-10 animate-fade-in">
          <Link
            href="/tags"
            className="terminal-text text-sm text-[var(--text-dim)] hover:text-[var(--neon-green)] transition-colors mb-4 inline-block"
          >
            <span className="text-[var(--neon-green)]">$</span> cd ../tags
          </Link>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded flex items-center justify-center bg-[rgba(0,255,65,0.1)] border border-[var(--neon-green)] animate-glow">
              <span className="terminal-text neon-text text-lg">#</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              <span className="neon-text">{tagName.toLowerCase().replace(/\s+/g, '_')}</span>
            </h1>
          </div>
          
          <p className="text-[var(--text-secondary)] terminal-text text-sm">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
          </p>
        </div>

        {/* Posts List */}
        {posts.length > 0 ? (
          <div className="space-y-4 animate-stagger">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="hacker-card rounded-lg p-6"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  {/* File-style header */}
                  <div className="flex items-center gap-2 mb-3 text-xs terminal-text text-[var(--text-dim)]">
                    <span className="text-[var(--neon-green)]">-rw-r--r--</span>
                    <span>{post.author}</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric'
                    })}</span>
                    <span>{post.readingTime}m</span>
                  </div>
                  
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--neon-green)] transition-colors mb-2">
                    {post.title}
                  </h2>
                  
                  {post.summary && (
                    <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
                      {post.summary}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className={`hacker-tag px-2 py-0.5 rounded text-xs ${
                            t.toLowerCase() === tagName.toLowerCase() 
                              ? 'bg-[var(--neon-green)] text-black border-[var(--neon-green)]' 
                              : ''
                          }`}
                        >
                          #{t.toLowerCase().replace(/\s+/g, '_')}
                        </span>
                      ))}
                    </div>
                    
                    <span className="hidden sm:inline terminal-text text-[var(--text-dim)] group-hover:text-[var(--neon-green)] transition-colors">
                      →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 hacker-card rounded-lg animate-fade-in">
            <div className="terminal-text text-[var(--text-dim)] mb-4">
              <span className="text-[var(--neon-green)]">$</span> grep -r #{tagName} ./posts/
            </div>
            <p className="terminal-text text-[var(--text-secondary)]">
              No matches found.
            </p>
            <Link
              href="/tags"
              className="inline-block mt-4 terminal-text text-sm text-[var(--neon-green)] hover:underline"
            >
              ← Browse all tags
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
