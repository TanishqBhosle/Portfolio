export interface Project {
  id: string;
  title: string;
  repoName: string;
  tagline: string;
  category: 'AI / System Architecture' | 'Web3 / Distributed' | 'Machine Learning' | 'Autonomous Agents' | 'Full-Stack';
  description: string;
  longDescription: string;
  technologies: string[];
  metrics?: { label: string; value: string }[];
  architectureHighlights: string[];
  liveUrl?: string | null;
  githubUrl: string;
  featured: boolean;
  accentColor: string;
  bgGradient: string;
}

export const projects: Project[] = [
  {
    id: 'shield-ai',
    title: 'Shield AI 1.0 (Aegis AI)',
    repoName: 'Sheild-Ai-1.0',
    tagline: 'Production-Grade Multimodal Content Moderation Platform',
    category: 'AI / System Architecture',
    description: 'Enterprise multimodal moderation engine classifying text, image, audio, and video violations with Gemini 1.5 Flash and a fast regex fallback engine.',
    longDescription: 'Shield AI (codenamed Aegis) is a comprehensive content safety platform engineered to automate multi-tiered content moderation. Featuring a 3-panel architecture (End-user submission, Moderator review queue, and Administrator oversight), it couples Google Gemini 1.5 Flash with deterministic pattern matching for high-throughput violation detection, automated escalation, and auditable audit trails.',
    technologies: ['React 18', 'Vite', 'Node.js', 'Express', 'Google Gemini 1.5 Flash', 'Firebase Auth', 'Cloud Firestore', 'JWT', 'Tailwind CSS'],
    metrics: [
      { label: 'Modality Support', value: 'Text, Image, Audio, Video' },
      { label: 'Architecture', value: '3-Tier RBAC Panels' },
      { label: 'Safety Engine', value: 'LLM + Regex Dual-Layer' }
    ],
    architectureHighlights: [
      'Gemini 1.5 Flash API integration for context-aware multimodal toxicity analysis',
      'Deterministic regex fallback engine for instantaneous zero-latency filtering',
      'Role-based Access Control (User, Moderator, Admin) powered by Firebase & JWT',
      'Interactive audit dashboard with violation severity scoring and review queues'
    ],
    liveUrl: 'https://sheild-ai-1-0.vercel.app/',
    githubUrl: 'https://github.com/TanishqBhosle/Sheild-Ai-1.0',
    featured: true,
    accentColor: '#ef4444',
    bgGradient: 'from-red-950/40 via-zinc-950/60 to-black'
  },
  {
    id: 'honeychain',
    title: 'HoneyChain',
    repoName: 'HoneyChain',
    tagline: 'Blockchain-Verified Honey Supply Chain & Deep Learning IoT Platform',
    category: 'Web3 / Distributed',
    description: 'Monorepo supply chain tracking honey from hive to consumer with Polygon smart contracts, IoT MQTT telemetry, and PyTorch bee health diagnostics.',
    longDescription: 'HoneyChain eliminates honey counterfeiting and promotes apiary health through an end-to-end decentralized tracking pipeline. Managed in a Turborepo architecture, it synchronizes real-time hive sensor telemetry over MQTT, diagnoses colony pathogens via deep learning computer vision, and mints immutable batch records onto Polygon smart contracts accessible via consumer QR code scans.',
    technologies: ['Next.js 14', 'NestJS', 'Solidity', 'Hardhat', 'Polygon', 'FastAPI', 'PyTorch', 'Docker', 'MQTT', 'Turborepo', 'Prisma'],
    metrics: [
      { label: 'Smart Contracts', value: 'Polygon POS' },
      { label: 'Colony Health', value: 'PyTorch Vision' },
      { label: 'Sensor Ingestion', value: 'Realtime MQTT' }
    ],
    architectureHighlights: [
      'Polygon smart contracts for immutable batch verification, harvest timestamps, and purity grades',
      'PyTorch convolutional model for apiary hive pathogen and disease detection',
      'High-throughput MQTT broker for sensor telemetry (temperature, humidity, acoustic activity)',
      'Consumer-facing QR verification portal delivering instant proof-of-authenticity'
    ],
    liveUrl: 'https://honey-chain-web-dvhb.vercel.app/',
    githubUrl: 'https://github.com/TanishqBhosle/HoneyChain',
    featured: true,
    accentColor: '#f59e0b',
    bgGradient: 'from-amber-950/40 via-zinc-950/60 to-black'
  },
  {
    id: 'telcoretain',
    title: 'TelcoRetain',
    repoName: 'TelcoRetain',
    tagline: 'AI-Powered Telecom Churn Prediction & Retention Decision Engine',
    category: 'Machine Learning',
    description: 'Ensemble machine learning platform combining XGBoost, Logistic Regression, and SHAP explainability across 22 comprehensive analytical interfaces.',
    longDescription: 'TelcoRetain empowers telecommunication providers to detect and mitigate customer churn before it occurs. Built with an ensemble architecture comparing Logistic Regression and XGBoost models, it computes individualized SHAP feature importance vectors to explain exactly why a subscriber is at risk and generates tailored retention campaign actions.',
    technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL (Neon)', 'XGBoost', 'SHAP', 'Scikit-learn', 'Recharts', 'Framer Motion', 'Alembic'],
    metrics: [
      { label: 'ML Ensemble', value: 'XGBoost + Logistic Reg' },
      { label: 'Explainability', value: 'SHAP Values' },
      { label: 'Interface Suite', value: '22 Analytical Views' }
    ],
    architectureHighlights: [
      'Dual-model ensemble scoring for robust generalization across subscription tenures',
      'Individual & global SHAP explainability charts displaying key churn drivers',
      'FastAPI backend with automated Alembic database migrations on PostgreSQL',
      'Automated retention campaign recommender with predicted ROI calculations'
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/TanishqBhosle/TelcoRetain',
    featured: true,
    accentColor: '#06b6d4',
    bgGradient: 'from-cyan-950/40 via-zinc-950/60 to-black'
  },
  {
    id: 'skinsolve',
    title: 'SkinSolve',
    repoName: 'SkinSolve',
    tagline: 'Multi-Objective Constraint Skincare Recommendation Engine',
    category: 'Machine Learning',
    description: 'Dermatological matchmaking engine using TF-IDF cosine similarity and multi-constraint optimization over 1,000+ ingredient formulations.',
    longDescription: 'SkinSolve addresses the complex, high-risk problem of skincare compatibility through mathematical constraint satisfaction. Rather than generic heuristic matching, it maps user skin types, sensitivities, and budget boundaries against high-dimensional TF-IDF vectors of active chemical compounds to deliver verified, non-comedogenic product pairings.',
    technologies: ['React 18', 'Vite', 'TypeScript', 'FastAPI', 'Pydantic', 'Scikit-learn', 'TF-IDF', 'Pandas', 'NumPy', 'Tailwind CSS'],
    metrics: [
      { label: 'Dataset Scope', value: '1,000+ Formulations' },
      { label: 'Algorithm', value: 'TF-IDF Cosine Similarity' },
      { label: 'Constraint Engine', value: 'Allergen & Budget Solvers' }
    ],
    architectureHighlights: [
      'Multi-dimensional cosine similarity matching against chemical ingredient vectors',
      'Strict allergen suppression logic to prevent adverse ingredient interactions',
      'FastAPI service with strict Pydantic schemas for sub-50ms inference times',
      'Interactive visual breakdown of active ingredients with scientific efficacy notes'
    ],
    liveUrl: 'https://skin-solve.vercel.app/',
    githubUrl: 'https://github.com/TanishqBhosle/SkinSolve',
    featured: true,
    accentColor: '#10b981',
    bgGradient: 'from-emerald-950/40 via-zinc-950/60 to-black'
  },
  {
    id: 'voice-agent-sarthi',
    title: 'Voice Agent Sarthi',
    repoName: 'Voice-Agent-Sarthi',
    tagline: 'Ultra-Low Latency Voice Assistant Powered by Groq & LLaMA 3.3 70B',
    category: 'AI / System Architecture',
    description: 'Hands-free voice assistant engineered for rapid task orchestration, combining browser Web Speech API with Groq-accelerated LLaMA 3.3 70B reasoning.',
    longDescription: 'Voice Agent Sarthi provides a seamless, conversational voice interface for daily productivity and task management. By offloading inference to Groq LPU hardware running LLaMA 3.3 70B, it achieves near-conversational latency for natural language command parsing, to-do extraction, and automated task scheduling.',
    technologies: ['Node.js', 'Express', 'Groq SDK', 'LLaMA 3.3 70B', 'Web Speech API', 'JavaScript', 'HTML5/CSS3'],
    metrics: [
      { label: 'LLM Model', value: 'LLaMA 3.3 70B' },
      { label: 'Inference Engine', value: 'Groq LPU Hardware' },
      { label: 'Interface', value: 'Bidirectional Voice' }
    ],
    architectureHighlights: [
      'Groq-accelerated LLaMA 3.3 70B inference for immediate natural language intent resolution',
      'Native Web Speech API integration for continuous zero-plugin voice recognition',
      'Stateful in-memory and persistent storage for multi-turn task planning',
      'Low-overhead Express server optimized for rapid token streaming'
    ],
    liveUrl: 'https://voice-agent-sarthi.vercel.app/',
    githubUrl: 'https://github.com/TanishqBhosle/Voice-Agent-Sarthi',
    featured: false,
    accentColor: '#8b5cf6',
    bgGradient: 'from-purple-950/40 via-zinc-950/60 to-black'
  },
  {
    id: 'growise',
    title: 'GroWise Financial Platform',
    repoName: 'Group-15-Financial-DashBoard-',
    tagline: 'Full-Stack Personal Finance & Investment Analytics Dashboard',
    category: 'Full-Stack',
    description: 'Comprehensive financial health suite tracking expenses, recurring subscriptions, and investment allocations with dynamic Recharts visualizations.',
    longDescription: 'GroWise is an intuitive financial intelligence platform designed to give users actionable clarity over their capital. Featuring secure JWT authentication and RESTful Node/Express microservices, it categorizes transactions automatically, calculates monthly savings velocities, and forecasts portfolio trajectories.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Recharts', 'Tailwind CSS', 'Framer Motion'],
    metrics: [
      { label: 'Analytics', value: 'Realtime Recharts' },
      { label: 'Security', value: 'JWT & Bcrypt Hashing' },
      { label: 'Database', value: 'MongoDB Atlas' }
    ],
    architectureHighlights: [
      'Interactive financial charting supporting multi-currency and asset class distribution',
      'Automated recurring transaction detection and spending velocity calculations',
      'Secure token-based authentication with bcrypt password encryption',
      'Responsive dark/light architectural design with smooth Framer Motion transitions'
    ],
    liveUrl: 'https://group-15-financial-dash-board-eight.vercel.app/login',
    githubUrl: 'https://github.com/TanishqBhosle/Group-15-Financial-DashBoard-',
    featured: false,
    accentColor: '#3b82f6',
    bgGradient: 'from-blue-950/40 via-zinc-950/60 to-black'
  },
  {
    id: 'chitramaya',
    title: 'ChitraMaya',
    repoName: 'ChitraMaya-Advance-Movie-Reccom-',
    tagline: 'Intelligent Film Discovery & Content-Based Recommendation System',
    category: 'Full-Stack',
    description: 'Modern movie discovery experience leveraging the TMDB API, dynamic genre correlation algorithms, and rich personalized watchlist curation.',
    longDescription: 'ChitraMaya reimagines cinema browsing through fluid aesthetic design and smart discovery algorithms. Integrating directly with TMDB, it generates custom movie suggestions by matching narrative tropes, director filmographies, and thematic similarity scores.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'TMDB API', 'Tailwind CSS', 'Framer Motion'],
    metrics: [
      { label: 'Catalog Source', value: 'TMDB Global API' },
      { label: 'Discovery', value: 'Content-Based Vector' },
      { label: 'State', value: 'Persistent Watchlists' }
    ],
    architectureHighlights: [
      'Direct synchronization with TMDB REST endpoints for real-time box office and rating metadata',
      'Genre affinity and keyword correlation engine for tailored recommendations',
      'Smooth client-side routing and optimized media lazy-loading for fast page loads',
      'Curated collections and bookmarking system for cinema aficionados'
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/TanishqBhosle/ChitraMaya-Advance-Movie-Reccom-',
    featured: false,
    accentColor: '#ec4899',
    bgGradient: 'from-pink-950/40 via-zinc-950/60 to-black'
  },
  {
    id: 'multi-agent-smartplaner',
    title: 'Multi-Agent SmartPlaner',
    repoName: 'multi-agent-smartplaner',
    tagline: 'Autonomous Collaborative Multi-Agent Scheduling & Execution Engine',
    category: 'Autonomous Agents',
    description: 'Distributed Python agent system coordinating multiple specialized LLM agents for goal decomposition, resource optimization, and autonomous conflict resolution.',
    longDescription: 'SmartPlaner explores the frontier of autonomous agent swarms. By dividing high-level goals among specialized personas (Researcher Agent, Time-Optimization Agent, and Feasibility Evaluator), the system orchestrates iterative multi-step plans with built-in consensus and constraint verification.',
    technologies: ['Python', 'Multi-Agent Framework', 'LangChain', 'Prompt Engineering', 'AsyncIO'],
    metrics: [
      { label: 'Agent Roles', value: 'Research, Plan, Audit' },
      { label: 'Architecture', value: 'Asynchronous Swarm' },
      { label: 'Execution', value: 'Consensus Resolution' }
    ],
    architectureHighlights: [
      'Decomposition of ambiguous objectives into serialized, verifiable execution steps',
      'Peer review loop where the Evaluator agent critiques and refines proposed schedules',
      'AsyncIO-driven parallel processing for low-latency multi-agent communication',
      'Modular agent tool interfaces for future calendar and API integration'
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/TanishqBhosle/multi-agent-smartplaner',
    featured: false,
    accentColor: '#14b8a6',
    bgGradient: 'from-teal-950/40 via-zinc-950/60 to-black'
  }
];
