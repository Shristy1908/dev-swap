export interface Tool {
  id: string;
  name: string;
  description: string;
  category: Category;
  imageUrl: string;
  githubUrl: string;
  demoUrl?: string;
  tags: string[];
  likes: number;
  views: number;
  author: string;
  createdAt: string;
  screenshots?: string[];
  featured?: boolean;
}

export type Category = 
  | 'React Tools'
  | 'VSCode Extensions'
  | 'APIs'
  | 'Design Tools'
  | 'CLI Tools'
  | 'Developer Utilities'
  | 'Starter Templates'
  | 'UI Kits';

export interface SearchFilters {
  category?: Category;
  search?: string;
  sortBy?: 'newest' | 'likes' | 'views';
}