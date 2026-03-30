export interface SkillCategory {
  title: string;
  skills: string[];
  color: string;
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Langages",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "PHP", "C#", "Haskell"],
    color: "blue"
  },
  {
    title: "Frameworks & Web",
    skills: ["React", "Node.js", "Next.js", "Angular", "jQuery", "Flutter", "Tailwind CSS", "HTML", "CSS"],
    color: "green"
  },
  {
    title: "Bases de données",
    skills: ["MySQL", "PostgreSQL"],
    color: "yellow"
  },
  {
    title: "Outils & Environnements",
    skills: ["Git", "GitHub", "Linux", "Docker", "Jira", "Trello", "GitHub Actions", "CI/CD", "Firebase"],
    color: "red"
  },
  {
    title: "Méthodologies & Systèmes",
    skills: [
      "Agile", "Scrum", "SDLC", "Design Patterns", "Architecture Microservices", "MVC", "Tests unitaires", "Refactoring", "Clean Code", 
      "OOP", "REST API", "Windows Server", "Administration réseau"
    ],
    color: "purple"
  },
  {
    title: "Soft Skills",
    skills: [
      "Analyse et résolution de problèmes complexes",
      "Travail en équipe et solo",
      "Adaptabilité et apprentissage continu",
      "Vulgarisation technique",
      "Gestion de projet et d'équipe",
      "Formation"
    ],
    color: "cyan"
  }
];
