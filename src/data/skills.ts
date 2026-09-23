export interface Skill {
  name: string;
  level: 'Advanced' | 'Proficient' | 'Learning';
  experience: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    description: 'Core programming languages utilized for robust software engineering, scalable architectures, and algorithm implementation.',
    skills: [
      { name: 'TypeScript', level: 'Advanced', experience: 'Strict Type-Safety, Generics & Modern ESM' },
      { name: 'JavaScript', level: 'Advanced', experience: 'ES6+, Async/Await, Event Loop & Web APIs' },
      { name: 'Python', level: 'Advanced', experience: 'Data Structures, Scripting & Backend Logic' },
      { name: 'Java', level: 'Proficient', experience: 'Object-Oriented Programming & JVM Ecosystem' },
      { name: 'SQL', level: 'Advanced', experience: 'Complex Queries, Indexing & Joins' },
      { name: 'Golang', level: 'Proficient', experience: 'Concurrency, Goroutines & Microservices' },
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Crafting responsive, high-performance web applications with modular components, dynamic state, and cinematic motion.',
    skills: [
      { name: 'React.js', level: 'Advanced', experience: 'Hooks, Lifecycle, Virtual DOM & Performance' },
      { name: 'HTML', level: 'Advanced', experience: 'Semantic HTML5, Accessibility & Structure' },
      { name: 'CSS', level: 'Advanced', experience: 'Modern Layouts, Flexbox, Grid & Animations' },
      { name: 'Tailwind CSS', level: 'Advanced', experience: 'Utility-First Systems & Responsive Tokens' },
      { name: 'Responsive Design', level: 'Advanced', experience: 'Mobile-First Layouts & Fluid Breakpoints' },
      { name: 'React Router', level: 'Advanced', experience: 'Client-Side Routing, Dynamic Routes & Loaders' },
      { name: 'Context API', level: 'Advanced', experience: 'Global State Management & Prop Drilling Elimination' },
      { name: 'Framer Motion', level: 'Proficient', experience: 'Physics Animations, Gestures & Layout Transitions' },
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'Server-side architectures, RESTful API engineering, secure authentication, and resilient middleware systems.',
    skills: [
      { name: 'Node.js', level: 'Advanced', experience: 'Event-Driven Runtime & Non-Blocking I/O' },
      { name: 'Express.js', level: 'Advanced', experience: 'Middleware Pipelines, Routing & REST Services' },
      { name: 'REST APIs', level: 'Advanced', experience: 'Endpoint Architecture, CRUD & HTTP Semantics' },
      { name: 'API Design', level: 'Advanced', experience: 'Contract Design, Versioning & Idempotency' },
      { name: 'JWT Authentication', level: 'Advanced', experience: 'Token Verification, Refresh Strategies & Guards' },
      { name: 'Middleware', level: 'Advanced', experience: 'CORS, Logging, Rate Limiting & Validation' },
      { name: 'Error Handling', level: 'Advanced', experience: 'Global Interceptors & Custom Exception Handlers' },
    ]
  },
  {
    id: 'databases',
    title: 'Databases',
    description: 'Relational and document storage solutions, efficient database schema modeling, and high-performance querying.',
    skills: [
      { name: 'MongoDB', level: 'Advanced', experience: 'Document Modeling, Aggregation & BSON' },
      { name: 'PostgreSQL', level: 'Proficient', experience: 'Relational Modeling, Indexing & ACID Compliance' },
      { name: 'Firestore', level: 'Advanced', experience: 'Real-time Listeners, Collections & Cloud Rules' },
      { name: 'Database Schema Design', level: 'Advanced', experience: 'Entity Relations, Normalization & Query Speed' },
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI/ML',
    description: 'Generative models, LLM APIs, and data science computation libraries.',
    skills: [
      { name: 'Generative AI', level: 'Advanced', experience: 'Prompt Architecture & LLM Orchestration' },
      { name: 'Gemini API', level: 'Advanced', experience: 'Multimodal Processing & Streaming Responses' },
      { name: 'Scikit-learn', level: 'Proficient', experience: 'Supervised Learning, Regressions & Classifiers' },
      { name: 'Pandas', level: 'Advanced', experience: 'Data Manipulation, Series & DataFrame Wrangling' },
      { name: 'NumPy', level: 'Advanced', experience: 'Vectorized Operations & Multi-Dimensional Arrays' },
    ]
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'Version control platforms, deployment infrastructure, and continuous integration workflows.',
    skills: [
      { name: 'Git', level: 'Advanced', experience: 'Branch Management, Cherry-pick & Merge Strategies' },
      { name: 'GitHub', level: 'Advanced', experience: 'Pull Requests, Code Review & Actions CI/CD' },
      { name: 'Vercel', level: 'Advanced', experience: 'Edge Deployments, Serverless & Domains' },
      { name: 'Render', level: 'Advanced', experience: 'Cloud Web Services, Background Jobs & SSL' },
      { name: 'Netlify', level: 'Advanced', experience: 'Static Hosting, Redirect Rules & CDN Caching' },
    ]
  },
  {
    id: 'learning',
    title: 'Learning',
    description: 'Theoretical computing foundations and advanced engineering disciplines currently being mastered.',
    skills: [
      { name: 'Machine Learning', level: 'Learning', experience: 'Statistical Learning Theory & Optimization' },
      { name: 'Deep Learning', level: 'Learning', experience: 'Neural Networks, Backprop & Architecture Design' },
      { name: 'System Design', level: 'Learning', experience: 'Distributed Architecture, Caching & Scalability' },
      { name: 'Operating System', level: 'Learning', experience: 'Process Scheduling, Concurrency & Virtual Memory' },
      { name: 'Computer Vision', level: 'Learning', experience: 'CNNs, Image Classification & Feature Extraction' },
    ]
  }
];
