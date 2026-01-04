import Link from 'next/link';
import { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog - All Posts',
  description: 'Browse all threat intelligence reports and security research',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Terminal Header */}
        <div className="mb-10 animate-fade-in">
          <div className="terminal-text text-sm text-[var(--text-dim)] mb-4">
            <span className="text-[var(--neon-green)]">$</span> find ./posts -type f -name *.md | sort -r
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="neon-text">All Posts</span>
          </h1>
          <p className="text-[var(--text-secondary)]">
            {posts.length} {posts.length === 1 ? 'entry' : 'entries'} found
          </p>
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="space-y-4 animate-stagger">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="hacker-card rounded-lg p-6"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  {/* File-style header */}
                  <div className="flex items-center gap-2 mb-3 text-xs terminal-text text-[var(--text-dim)]">
                    <span className="text-[var(--neon-green)]">-rw-r--r--</span>
                    <span>1</span>
                    <span>{post.author}</span>
                    <span>{post.author}</span>
                    <span>{post.readingTime * 500}</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                    <span className="text-[var(--neon-cyan)]">{post.slug}.md</span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--neon-green)] transition-colors mb-2">
                    {post.title}
                  </h2>
                  
                  {post.summary && (
                    <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
                      {post.summary}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="hacker-tag px-2 py-0.5 rounded"
                          >
                            #{tag.toLowerCase().replace(/\s+/g, '_')}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <span className="hidden sm:inline terminal-text text-[var(--text-dim)] group-hover:text-[var(--neon-green)] transition-colors">
                      cat →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 hacker-card rounded-lg animate-fade-in">
            <div className="terminal-text text-[var(--text-dim)] mb-4">
              <span className="text-[var(--neon-green)]">$</span> ls -la ./posts/
            </div>
            <div className="terminal-text text-[var(--text-secondary)] mb-2">
              total 0
            </div>
            <p className="terminal-text text-[var(--text-dim)] text-sm">
              drwxr-xr-x  2 0xadroit 0xadroit 4096 Jan  1 00:00 .
            </p>
            <p className="text-[var(--text-dim)] text-sm mt-4">
              No posts found. Add markdown files to <code className="text-[var(--neon-green)]">/posts</code> directory.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
