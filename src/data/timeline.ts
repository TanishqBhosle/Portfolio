export interface TimelineEvent {
  year: string;
  period: string;
  title: string;
  category: 'Education' | 'AI / Systems' | 'Full-Stack' | 'Machine Learning' | 'Distributed Systems';
  location: string;
  description: string;
  highlights: string[];
  badge: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: '2024 — 2028',
    period: 'Current Pursuit',
    title: 'B.Tech in Computer Science (AI/ML Specialization)',
    category: 'Education',
    location: 'Polaris School of Technology, Bengaluru',
    description: 'Admitted into Polaris School of Technology for intensive 4-year undergraduate study in CS & Engineering with dedicated specialization in Artificial Intelligence and Machine Learning.',
    highlights: [
      'Focus areas: Deep Learning, System Architecture, Mathematical Foundations of ML, Distributed Computing',
      'Active developer with 36+ GitHub repositories and active participation in engineering cohorts',
      'Maintaining rigorous algorithmic problem-solving practice on LeetCode'
    ],
    badge: 'Academics & Specialization'
  },
  {
    year: '2025',
    period: 'Enterprise Systems',
    title: 'Architecting HoneyChain & TelcoRetain',
    category: 'Distributed Systems',
    location: 'Bengaluru, India',
    description: 'Scaled into enterprise-grade system design combining distributed Web3 protocols, IoT sensor telemetry, and predictive machine learning ensembles.',
    highlights: [
      'Engineered HoneyChain: Polygon smart contracts, MQTT hive telemetry, and PyTorch pathogen diagnostics',
      'Built TelcoRetain: XGBoost + Logistic Regression ensemble with SHAP explainability spanning 22 screens',
      'Implemented Turborepo monorepo architecture and robust FastAPI microservices'
    ],
    badge: 'Enterprise Architecture'
  },
  {
    year: '2025',
    period: 'Applied AI & Moderation',
    title: 'Building Shield AI & SkinSolve',
    category: 'AI / Systems',
    location: 'Bengaluru, India',
    description: 'Engineered high-consequence AI systems focusing on safety, multimodal verification, and mathematical constraint satisfaction.',
    highlights: [
      'Launched Shield AI 1.0 (Aegis): 3-panel multimodal content moderation with Gemini 1.5 Flash and regex fallback',
      'Developed SkinSolve: Multi-objective constraint solver using TF-IDF cosine similarity for dermatological matching',
      'Achieved sub-50ms inference response times using FastAPI and Pydantic optimizations'
    ],
    badge: 'AI Safety & Solvers'
  },
  {
    year: '2024 — 2025',
    period: 'Autonomous Agents & Voice',
    title: 'Autonomous Multi-Agent & Voice AI',
    category: 'AI / Systems',
    location: 'Bengaluru, India',
    description: 'Pioneered low-latency voice computing and multi-agent coordination frameworks.',
    highlights: [
      'Engineered Voice Agent Sarthi: Sub-second voice synthesis and to-do reasoning with Groq LPU & LLaMA 3.3 70B',
      'Created Multi-Agent SmartPlaner: Asynchronous agent swarms with peer consensus and schedule optimization',
      'Explored bidirectional audio streaming with browser Web Speech APIs'
    ],
    badge: 'Agentic AI & Voice'
  },
  {
    year: '2024',
    period: 'Foundations',
    title: 'Full-Stack System Engineering',
    category: 'Full-Stack',
    location: 'Bengaluru, India',
    description: 'Built core full-stack competencies developing production web applications with React, Node.js, Express, and MongoDB.',
    highlights: [
      'Developed GroWise: Personal finance platform with real-time Recharts and JWT authentication',
      'Built ChitraMaya: Intelligent movie recommendation platform with TMDB catalog integration',
      'Established strong foundation in modern JavaScript, TypeScript, and component architectures'
    ],
    badge: 'Full-Stack Roots'
  }
];
