import { GeneratedProject } from "@/types";

export interface AIProvider {
  generateProjects(profile: any): Promise<GeneratedProject[]>;
  improveIdea(idea: string): Promise<any>;
  chat(messages: any[], context: any): Promise<string>;
}

// Mock Provider for development without keys
export class MockAIProvider implements AIProvider {
  async generateProjects(profile: any): Promise<GeneratedProject[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    return [
      {
        id: "proj-1",
        title: "Campus Connect",
        pitch: "A platform unifying student events and academic resources.",
        problemStatement: "Students miss out on important events due to fragmented communication.",
        whyItMatters: "Community engagement is crucial for student success.",
        solution: "A centralized hub for campus activities and peer mentoring.",
        targetUsers: ["University Students", "Event Organizers"],
        coreFeatures: ["Event Calendar", "Resource Sharing", "Peer Chat"],
        techStack: {
          frontend: ["Next.js", "Tailwind CSS"],
          backend: ["Node.js"],
          database: ["PostgreSQL"],
          ai: [],
          tools: ["Figma"]
        },
        difficulty: "Intermediate",
        estimatedTime: "1 Month",
        scores: {
          innovation: 7,
          feasibility: 90,
          skillCompatibility: 85,
          marketImpact: 80,
          technicalComplexity: 60,
          portfolioValue: 80
        },
        skillMatchReason: "Matches your React background perfectly.",
        futureScalability: ["Cross-university expansion", "Alumni networking"]
      },
      // Adding a second mock project for variety
      {
        id: "proj-2",
        title: "SkillBridge AI",
        pitch: "AI-powered skill gap analyzer for fresh graduates.",
        problemStatement: "Graduates don't know what specific skills they lack for their dream jobs.",
        whyItMatters: "Reduces the friction in early career transitions.",
        solution: "Upload a resume and job description to get a personalized learning path.",
        targetUsers: ["Fresh Graduates", "Job Seekers"],
        coreFeatures: ["Resume Parsing", "Gap Analysis", "Course Recommendations"],
        techStack: {
          frontend: ["Next.js", "Tailwind CSS"],
          backend: ["Python", "FastAPI"],
          database: ["Supabase"],
          ai: ["OpenAI API"],
          tools: ["Docker"]
        },
        difficulty: "Advanced",
        estimatedTime: "2 Months",
        scores: {
          innovation: 9,
          feasibility: 75,
          skillCompatibility: 70,
          marketImpact: 90,
          technicalComplexity: 85,
          portfolioValue: 95
        },
        skillMatchReason: "Pushes you to learn AI integration.",
        futureScalability: ["B2B SaaS for Universities", "Recruiter Dashboard"]
      }
    ];
  }

  async improveIdea(idea: string): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      improvedIdeaName: "Enhanced " + idea.split(' ')[0],
      improvedProblemStatement: "A clearer definition of the problem you mentioned.",
      improvedSolution: "A more robust technical approach.",
      suggestedFeatures: ["Feature A", "Feature B"],
      recommendedTechStack: ["Next.js", "Supabase"],
      innovationOpportunities: ["AI integration", "Real-time sync"],
      riskAnalysis: ["User adoption could be slow"],
      scalabilityStrategy: ["Start with one niche, then expand"]
    };
  }

  async chat(messages: any[], context: any): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "This is a simulated AI response. I understand you're asking about: " + messages[messages.length - 1]?.content;
  }
}

export function getAIProvider(): AIProvider {
  // We can switch this later to OpenAI/Anthropic/Gemini provider based on env vars
  return new MockAIProvider();
}
