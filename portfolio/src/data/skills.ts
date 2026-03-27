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
    skills: ["React", "Node.js", "Next.js", "Angular", "jQuery", "Flutter", "HTML", "CSS"],
    color: "green"
  },
  {
    title: "Bases de données",
    skills: ["MySQL", "PostgreSQL"],
    color: "yellow"
  },
  {
    title: "Outils & Environnements",
    skills: ["Git", "GitHub", "Linux", "Docker", "Jira", "WordPress"],
    color: "red"
  },
  {
    title: "Méthodologies & Systèmes",
    skills: [
      "Agile", "Scrum", "OOP", "REST API", "Tailwind CSS",
      "Windows Server", "Administration réseau", "Packet Tracer"
    ],
    color: "purple"
  }
];
