export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string;
  academic_domain: string | null;
  experience_level: ExperienceLevel | null;
  skills: string[];
  interests: string[];
  preferred_technologies: string[];
  created_at: string;
  updated_at: string;
}

export interface GeneratedProject {
  id: string;
  title: string;
  pitch: string;
  problemStatement: string;
  whyItMatters: string;
  solution: string;
  targetUsers: string[];
  coreFeatures: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    ai: string[];
    tools: string[];
  };
  difficulty: string;
  estimatedTime: string;
  scores: {
    innovation: number;
    feasibility: number;
    skillCompatibility: number;
    marketImpact: number;
    technicalComplexity: number;
    portfolioValue: number;
  };
  skillMatchReason: string;
  futureScalability: string[];
}

export interface ProjectTask {
  id: string;
  project_id: string;
  phase: string;
  title: string;
  description: string;
  priority: 'Must Have' | 'Should Have' | 'Nice to Have';
  estimated_duration: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  created_at: string;
  updated_at: string;
}

export type MentorMode = 'Idea Mentor' | 'Technical Mentor' | 'Debugging Mentor' | 'Architecture Mentor' | 'Startup Mentor';

export interface MentorMessage {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
}
