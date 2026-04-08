export interface SkillCategory {
  titleKey: string;
  skills: string[];
  color: string;
}

export const skillCategories: SkillCategory[] = [
  {
    titleKey: "about.skillCategories.programming",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "PHP", "C#", "Haskell"],
    color: "blue"
  },
  {
    titleKey: "about.skillCategories.frameworks",
    skills: ["React", "Node.js", "Next.js", "Angular", "jQuery", "Flutter", "Tailwind CSS", "HTML", "CSS"],
    color: "green"
  },
  {
    titleKey: "about.skillCategories.databases",
    skills: ["MySQL", "PostgreSQL"],
    color: "yellow"
  },
  {
    titleKey: "about.skillCategories.tools",
    skills: ["Git", "GitHub", "Linux", "Docker", "Jira", "Trello", "GitHub Actions", "CI/CD", "Firebase"],
    color: "red"
  },
  {
    titleKey: "about.skillCategories.methodologies",
    skills: [
      "Agile", "Scrum", "SDLC", "Design Patterns", "Architecture Microservices", "MVC", "about.skills_data.method_unit_tests", "Refactoring", "Clean Code", 
      "OOP", "REST API", "Windows Server", "about.skills_data.method_network"
    ],
    color: "purple"
  },
  {
    titleKey: "about.skillCategories.soft_skills",
    skills: [
      "about.skills_data.soft_analysis",
      "about.skills_data.soft_team",
      "about.skills_data.soft_adapt",
      "about.skills_data.soft_popularization",
      "about.skills_data.soft_management",
      "about.skills_data.soft_training"
    ],
    color: "cyan"
  }
];
