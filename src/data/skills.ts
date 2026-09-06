export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: {
    name: string;
    level: 'Advanced' | 'Proficient' | 'Exploring';
    experience: string;
    iconName: string;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Foundation models, multimodal pipelines, classical ML ensembles, and autonomous agent systems.',
    skills: [
      { name: 'LLM Orchestration & APIs', level: 'Advanced', experience: 'Gemini 1.5, LLaMA 3.3, Groq LPUs', iconName: 'Brain' },
      { name: 'PyTorch & Deep Learning', level: 'Proficient', experience: 'CNNs, Disease Detection, Vision Models', iconName: 'Cpu' },
      { name: 'Scikit-learn & XGBoost', level: 'Advanced', experience: 'Ensemble Learning, Churn Prediction', iconName: 'LineChart' },
      { name: 'Model Explainability (SHAP)', level: 'Proficient', experience: 'Feature Importance & Interpretability', iconName: 'Sparkles' },
      { name: 'Autonomous Multi-Agents', level: 'Proficient', experience: 'LangChain, Swarm Consensus, Task Decomposition', iconName: 'Bot' },
      { name: 'Information Retrieval & TF-IDF', level: 'Advanced', experience: 'Vector Cosine Similarity & Ranking', iconName: 'Search' },
    ]
  },
  {
    id: 'frontend',
    title: 'Modern Frontend Architecture',
    description: 'Crafting responsive, high-performance web applications with cinematic motion and design systems.',
    skills: [
      { name: 'React 18 / 19 & Next.js 14', level: 'Advanced', experience: 'Hooks, Server Components, State Architecture', iconName: 'Layout' },
      { name: 'TypeScript', level: 'Advanced', experience: 'Strict Type-Safety, Generics, Complex Interfaces', iconName: 'FileCode' },
      { name: 'Tailwind CSS & Modern CSS', level: 'Advanced', experience: 'Design Tokens, Glassmorphism, Micro-interactions', iconName: 'Palette' },
      { name: 'Framer Motion & Three.js', level: 'Proficient', experience: 'Scroll Triggers, 3D Canvas, Physics Animations', iconName: 'Layers' },
      { name: 'Vite & Build Tooling', level: 'Advanced', experience: 'HMR, Bundle Optimization, Turborepo', iconName: 'Zap' },
    ]
  },
  {
    id: 'backend-systems',
    title: 'Backend & Distributed Systems',
    description: 'High-throughput APIs, asynchronous microservices, blockchain smart contracts, and real-time streaming.',
    skills: [
      { name: 'Python & FastAPI', level: 'Advanced', experience: 'Async Endpoints, Pydantic, ML Inference Serving', iconName: 'Server' },
      { name: 'Node.js & Express / NestJS', level: 'Advanced', experience: 'REST APIs, Middleware, RBAC Architecture', iconName: 'Terminal' },
      { name: 'Web3 & Solidity', level: 'Proficient', experience: 'Polygon Smart Contracts, Hardhat, Traceability', iconName: 'Boxes' },
      { name: 'IoT Telemetry & MQTT', level: 'Proficient', experience: 'Realtime Sensor Ingestion, Pub/Sub Brokers', iconName: 'Radio' },
      { name: 'Authentication & Security', level: 'Advanced', experience: 'Firebase Auth, JWT, Bcrypt, Session Guarding', iconName: 'Shield' },
    ]
  },
  {
    id: 'data-devops',
    title: 'Data, Databases & DevOps',
    description: 'Relational & document databases, schema migrations, containerization, and automated deployments.',
    skills: [
      { name: 'PostgreSQL & Neon DB', level: 'Advanced', experience: 'Relational Modeling, Indexing, Connection Pooling', iconName: 'Database' },
      { name: 'MongoDB & Cloud Firestore', level: 'Advanced', experience: 'Document Schemas, Aggregations, Real-time Sync', iconName: 'HardDrive' },
      { name: 'Prisma ORM & Alembic', level: 'Advanced', experience: 'Type-safe Queries, Automated Migrations', iconName: 'GitMerge' },
      { name: 'Pandas & NumPy', level: 'Advanced', experience: 'Data Cleaning, Vectorization, Feature Engineering', iconName: 'BarChart2' },
      { name: 'Docker & Git / GitHub', level: 'Advanced', experience: 'Containerization, Monorepos, CI/CD Workflows', iconName: 'Container' },
    ]
  }
];
