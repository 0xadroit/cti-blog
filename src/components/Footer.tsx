import Link from 'next/link';
import { Terminal, Github, Twitter, Linkedin, Rss } from 'lucide-react';
import { siteConfig, categories } from '@/config/site';

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-dark-card border-t border-gray-200 dark:border-dark-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <div className="w-9 h-9 bg-primary-500/10 rounded-lg flex items-center justify-center">
                <Terminal className="w-5 h-5 text-primary-500" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                0x<span className="text-primary-500">adroit</span>
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mb-4">
              {siteConfig.description}
            </p>
            <div className="flex space-x-3">
              <a
                href={siteConfig.author.social?.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.author.social?.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.author.social?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="/feed.xml"
                className="p-2 text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
              >
                <Rss className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm transition-colors">
                  All Posts
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/tags" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm transition-colors">
                  Tags
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/feed.xml" className="text-gray-500 hover:text-primary-500 text-sm transition-colors">
              RSS Feed
            </Link>
            <Link href="/sitemap.xml" className="text-gray-500 hover:text-primary-500 text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
