export interface PostMeta {
  title: string;
  date: string;
  author: string;
  summary: string;
  category: string;
  tags: string[];
  readingTime: number;
}

export interface Post extends PostMeta {
  slug: string;
  content: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
    role: string;
    social: {
      twitter: string;
      github: string;
      linkedin: string;
    };
  };
  postsPerPage: number;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  color: string;
}
