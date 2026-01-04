import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-[var(--dark-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-fade-in">
            {/* Terminal-style intro */}
            <div className="terminal-text text-sm text-[var(--text-dim)] mb-6">
              <span className="text-[var(--neon-green)]">$</span> cat /etc/motd
            </div>
            
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-[var(--text-primary)]">Cyber</span>
                <span className="neon-text">security</span>
                <br />
                <span className="text-[var(--text-primary)]">Threat </span>
                <span className="neon-text-cyan">Intelligence</span>
              </h1>
            </div>
            
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mb-8 leading-relaxed">
              Deep dives into <span className="text-[var(--neon-green)]">malware analysis</span>, 
              threat intelligence, and security research. 
              Documenting findings from the digital underground.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="glow-button px-6 py-3 terminal-text text-sm font-medium rounded transition-all duration-300"
              >
                [ VIEW_POSTS ]
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 terminal-text text-sm font-medium text-[var(--text-secondary)] border border-[var(--dark-border)] hover:border-[var(--text-dim)] hover:text-[var(--text-primary)] rounded transition-all duration-300"
              >
                [ ABOUT_ME ]
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-[var(--dark-border)]">
              <div className="grid grid-cols-3 gap-8 max-w-md">
                <div>
                  <div className="text-2xl font-bold neon-text terminal-text">{posts.length}</div>
                  <div className="text-xs text-[var(--text-dim)] terminal-text">POSTS</div>
                </div>
                <div>
                  <div className="text-2xl font-bold neon-text-cyan terminal-text">
                    {Array.from(new Set(posts.flatMap(p => p.tags))).length}
                  </div>
                  <div className="text-xs text-[var(--text-dim)] terminal-text">TAGS</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--neon-purple)] terminal-text" style={{textShadow: '0 0 5px var(--neon-purple)'}}>
                    {posts.reduce((acc, p) => acc + p.readingTime, 0)}m
                  </div>
                  <div className="text-xs text-[var(--text-dim)] terminal-text">READ_TIME</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts List */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8 animate-fade-in">
          <span className="text-[var(--neon-green)] terminal-text">$</span>
          <h2 className="text-xl font-bold terminal-text text-[var(--text-primary)]">
            ls -la ./recent_posts/
          </h2>
        </div>

        {posts.length > 0 ? (
          <div className="space-y-4 animate-stagger">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="hacker-card rounded-lg p-6"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* File-style header */}
                      <div className="flex items-center gap-2 mb-3 text-xs terminal-text text-[var(--text-dim)]">
                        <span className="text-[var(--neon-green)]">-rw-r--r--</span>
                        <span>{post.author}</span>
                        <span>{new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                        <span>{post.readingTime}m</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--neon-green)] transition-colors duration-200 mb-2">
                        {post.title}
                      </h3>
                      
                      {post.summary && (
                        <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
                          {post.summary}
                        </p>
                      )}
                      
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 5).map((tag) => (
                            <span
                              key={tag}
                              className="hacker-tag px-2 py-0.5 rounded"
                            >
                              #{tag.toLowerCase().replace(/\s+/g, '_')}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="hidden sm:flex items-center text-[var(--text-dim)] group-hover:text-[var(--neon-green)] transition-colors">
                      <span className="terminal-text text-lg">→</span>
                    </div>
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
            <p className="text-[var(--text-dim)] text-sm">
              No posts found. Add markdown files to <code className="text-[var(--neon-green)]">/posts</code> directory.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
