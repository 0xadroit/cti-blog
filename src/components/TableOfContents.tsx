'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface Props {
  content: string;
}

export function TableOfContents({ content }: Props) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from content
    const headingRegex = /<h([2-3])[^>]*>([^<]*)<\/h[2-3]>/g;
    const items: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const title = match[2].trim();
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      items.push({
        id,
        title,
        level: parseInt(match[1]),
      });
    }

    setToc(items);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) {
    return null;
  }

  return (
    <nav className="toc">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200 dark:border-dark-border">
        <List className="w-4 h-4 text-primary-500" />
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Table of Contents</h4>
      </div>
      <ul className="space-y-1 max-h-[60vh] overflow-y-auto">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`toc-link ${item.level === 2 ? 'toc-link-h2' : 'toc-link-h3'} ${
                activeId === item.id ? 'active' : ''
              }`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
