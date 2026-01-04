import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '0xadroit // CTI',
    template: '%s | 0xadroit',
  },
  description: 'Cybersecurity Threat Intelligence - Malware Analysis, APT Research, and Security Insights',
  keywords: ['cybersecurity', 'threat intelligence', 'malware analysis', 'CTI', 'security research', 'hacking', 'red team'],
  authors: [{ name: '0xadroit' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: '0xadroit // CTI',
    description: 'Cybersecurity Threat Intelligence - Malware Analysis, APT Research, and Security Insights',
    siteName: '0xadroit',
  },
  twitter: {
    card: 'summary_large_image',
    title: '0xadroit // CTI',
    description: 'Cybersecurity Threat Intelligence - Malware Analysis, APT Research, and Security Insights',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col antialiased grid-bg">
        {/* Header */}
        <header className="bg-black border-b border-[var(--dark-border)] sticky top-0 z-50">
          <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link 
                href="/" 
                className="flex items-center gap-2 group"
              >
                <span className="text-xl font-bold terminal-text neon-text">
                  0xadroit
                </span>
                <span className="text-[var(--text-dim)] terminal-text text-sm hidden sm:inline">
                  | CTI
                </span>
                <span className="w-2 h-5 bg-[var(--neon-green)] animate-blink ml-1"></span>
              </Link>
              
              <div className="flex items-center gap-1 sm:gap-2">
                <Link
                  href="/"
                  className="px-3 py-2 text-sm terminal-text text-[var(--text-secondary)] hover:text-[var(--neon-green)] hover:bg-[rgba(0,255,65,0.1)] rounded transition-all duration-200"
                >
                  ~/home
                </Link>
                <Link
                  href="/blog"
                  className="px-3 py-2 text-sm terminal-text text-[var(--text-secondary)] hover:text-[var(--neon-green)] hover:bg-[rgba(0,255,65,0.1)] rounded transition-all duration-200"
                >
                  ~/blog
                </Link>
                <Link
                  href="/tags"
                  className="px-3 py-2 text-sm terminal-text text-[var(--text-secondary)] hover:text-[var(--neon-green)] hover:bg-[rgba(0,255,65,0.1)] rounded transition-all duration-200"
                >
                  ~/tags
                </Link>
                <Link
                  href="/about"
                  className="px-3 py-2 text-sm terminal-text text-[var(--text-secondary)] hover:text-[var(--neon-green)] hover:bg-[rgba(0,255,65,0.1)] rounded transition-all duration-200"
                >
                  ~/about
                </Link>
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-[var(--dark-border)] py-8 mt-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[var(--text-dim)] text-sm terminal-text">
                <span className="text-[var(--neon-green)]">$</span>
                <span>© {new Date().getFullYear()} 0xadroit</span>
              </div>
              <div className="flex items-center gap-4 text-sm terminal-text">
                <span className="text-[var(--text-dim)]">[</span>
                <a href="https://github.com/0xadroit" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--neon-green)] transition-colors">
                  github
                </a>
                <span className="text-[var(--text-dim)]">|</span>
                <a href="https://twitter.com/0xadroit" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--neon-cyan)] transition-colors">
                  twitter
                </a>
                <span className="text-[var(--text-dim)]">]</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
