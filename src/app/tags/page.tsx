import Link from 'next/link';
import { Metadata } from 'next';
import { getAllTags } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Browse all tags and topics',
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Terminal Header */}
        <div className="mb-10 animate-fade-in">
          <div className="terminal-text text-sm text-[var(--text-dim)] mb-4">
            <span className="text-[var(--neon-green)]">$</span> ls -la ./tags/ | sort -k2 -rn
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="neon-text">Tags</span>
          </h1>
          <p className="text-[var(--text-secondary)]">
            {tags.length} unique {tags.length === 1 ? 'category' : 'categories'}
          </p>
        </div>

        {/* Tags Grid */}
        {tags.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 animate-stagger">
            {tags.map((tag, index) => (
              <Link
                key={tag.name}
                href={`/tags/${tag.name.toLowerCase()}`}
                className="group hacker-card rounded-lg p-4 hover:border-[var(--neon-green)] transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded flex items-center justify-center bg-[rgba(0,255,65,0.1)] border border-[rgba(0,255,65,0.3)] group-hover:bg-[var(--neon-green)] group-hover:border-[var(--neon-green)] transition-all duration-300">
                    <span className="terminal-text text-[var(--neon-green)] group-hover:text-black transition-colors text-sm">#</span>
                  </div>
                  <div>
                    <span className="block font-medium terminal-text text-[var(--text-primary)] group-hover:text-[var(--neon-green)] transition-colors text-sm">
                      {tag.name.toLowerCase().replace(/\s+/g, '_')}
                    </span>
                    <span className="text-xs terminal-text text-[var(--text-dim)]">
                      {tag.count} {tag.count === 1 ? 'entry' : 'entries'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 hacker-card rounded-lg animate-fade-in">
            <div className="terminal-text text-[var(--text-dim)] mb-4">
              <span className="text-[var(--neon-green)]">$</span> find ./tags -type d
            </div>
            <p className="terminal-text text-[var(--text-secondary)]">
              ./tags (empty)
            </p>
            <p className="text-[var(--text-dim)] text-sm mt-4">
              Tags will appear when posts are created with tags.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
