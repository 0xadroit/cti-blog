import { SiteConfig, Category } from '@/types/blog';

export const siteConfig: SiteConfig = {
  name: '0xadroit',
  description: 'Cybersecurity Threat Intelligence - Malware Analysis, APT Research, and Security Insights',
  url: 'https://wkexl5fef.localto.net',
  author: {
    name: '0xadroit',
    avatar: '/images/author/avatar.png',
    bio: 'Cybersecurity researcher focused on threat intelligence, malware analysis, and adversary tracking. Sharing insights to help defenders stay ahead of threats.',
    role: 'Threat Intelligence Researcher',
    social: {
      twitter: 'https://twitter.com/0xadroit',
      github: 'https://github.com/0xadroit',
      linkedin: 'https://linkedin.com/in/0xadroit',
    },
  },
  postsPerPage: 9,
};

export const categories: Category[] = [
  {
    name: 'Threat Analysis',
    slug: 'threat-analysis',
    description: 'In-depth analysis of APT groups, campaigns, and threat actors',
    color: 'red',
  },
  {
    name: 'Malware',
    slug: 'malware',
    description: 'Malware reverse engineering, unpacking, and behavioral analysis',
    color: 'orange',
  },
  {
    name: 'Vulnerabilities',
    slug: 'vulnerabilities',
    description: 'CVE analysis, exploit development, and patch analysis',
    color: 'yellow',
  },
  {
    name: 'Tools & Techniques',
    slug: 'tools-techniques',
    description: 'Security tools, hunting techniques, and methodologies',
    color: 'cyan',
  },
  {
    name: 'Tutorials',
    slug: 'tutorials',
    description: 'Step-by-step guides and educational content',
    color: 'green',
  },
];

export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Categories', href: '/categories' },
  { name: 'Tags', href: '/tags' },
  { name: 'About', href: '/about' },
];
