import { Tool } from '../types';

export const tools: Tool[] = [
  {
    id: '1',
    name: 'React Query',
    description: 'Hooks for fetching, caching and updating asynchronous data in React',
    category: 'React Tools',
    imageUrl: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/tanstack/query',
    demoUrl: 'https://tanstack.com/query',
    tags: ['React', 'Data Fetching', 'State Management'],
    likes: 856,
    views: 12500,
    author: 'TanStack',
    createdAt: '2023-01-15',
    screenshots: [
      'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    featured: true
  },
  {
    id: '2',
    name: 'GitHub Theme',
    description: 'GitHub VS Code theme extension with light and dark options',
    category: 'VSCode Extensions',
    imageUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/primer/github-vscode-theme',
    tags: ['VSCode', 'Theme', 'Dark Mode'],
    likes: 543,
    views: 8900,
    author: 'GitHub',
    createdAt: '2022-11-23',
    featured: true
  },
  {
    id: '3',
    name: 'JSONPlaceholder',
    description: 'Free fake API for testing and prototyping',
    category: 'APIs',
    imageUrl: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/typicode/jsonplaceholder',
    demoUrl: 'https://jsonplaceholder.typicode.com',
    tags: ['API', 'REST', 'Testing'],
    likes: 712,
    views: 15600,
    author: 'Typicode',
    createdAt: '2022-09-05'
  },
  {
    id: '4',
    name: 'Chakra UI',
    description: 'Simple, modular and accessible UI components for React applications',
    category: 'UI Kits',
    imageUrl: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/chakra-ui/chakra-ui',
    demoUrl: 'https://chakra-ui.com',
    tags: ['React', 'UI', 'Accessibility'],
    likes: 892,
    views: 19800,
    author: 'Chakra UI',
    createdAt: '2022-08-17',
    featured: true
  },
  {
    id: '5',
    name: 'Create T3 App',
    description: 'Start a full-stack, typesafe Next.js app with tRPC, Prisma, Tailwind & authentication',
    category: 'Starter Templates',
    imageUrl: 'https://images.pexels.com/photos/614117/pexels-photo-614117.jpeg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/t3-oss/create-t3-app',
    demoUrl: 'https://create.t3.gg',
    tags: ['Next.js', 'TypeScript', 'Full Stack'],
    likes: 764,
    views: 11200,
    author: 'T3 Community',
    createdAt: '2022-12-01'
  },
  {
    id: '6',
    name: 'Prettier',
    description: 'Opinionated code formatter that enforces consistent style',
    category: 'Developer Utilities',
    imageUrl: 'https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/prettier/prettier',
    demoUrl: 'https://prettier.io',
    tags: ['Formatting', 'Code Quality', 'Developer Tool'],
    likes: 937,
    views: 22300,
    author: 'Prettier',
    createdAt: '2022-07-14'
  },
  {
    id: '7',
    name: 'Figma to React',
    description: 'Convert Figma designs to React components',
    category: 'Design Tools',
    imageUrl: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/react-figma/react-figma',
    tags: ['Figma', 'React', 'Design'],
    likes: 478,
    views: 7850,
    author: 'React Figma',
    createdAt: '2023-02-03'
  },
  {
    id: '8',
    name: 'Turborepo',
    description: 'High-performance build system for JavaScript & TypeScript codebases',
    category: 'CLI Tools',
    imageUrl: 'https://images.pexels.com/photos/4792729/pexels-photo-4792729.jpeg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/vercel/turborepo',
    demoUrl: 'https://turbo.build',
    tags: ['Build Tool', 'Monorepo', 'Performance'],
    likes: 654,
    views: 9200,
    author: 'Vercel',
    createdAt: '2023-01-27',
    featured: true
  }
];

export const categories: string[] = [
  'React Tools',
  'VSCode Extensions',
  'APIs',
  'Design Tools',
  'CLI Tools',
  'Developer Utilities',
  'Starter Templates',
  'UI Kits'
];