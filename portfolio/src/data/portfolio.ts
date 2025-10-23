import { Project, Experience, Education, ContactInfo, PersonalInfo } from '@/types';

export const personalInfo: PersonalInfo = {
  name: "Maxime Allemeersch",
  title: "Software Engineer",
  avatar: "/photo.webp", // À remplacer par votre vraie image
  bio: "Développeur logiciel junior passionné et polyvalent, formé en software engineering. À l’aise en front-end comme en back-end, j’ai acquis de solides compétences en Java, Python, JavaScript, TypeScript et PHP. Curieux et rapide à apprendre, je sais m’adapter à de nouvelles technologies et je possède un bon sens de l’organisation et une aisance relationnelle, ce qui me permet de travailler efficacement en équipe.",
  skills: [
    "Java", "Python", "JavaScript", "TypeScript", "C#", "PHP", "ProLog", "Haskell",
    "HTML", "CSS", "React", "Next.js", "Node.js", "jQuery", "Flutter",
    "WordPress", "Tailwind CSS", "Docker", "Git", "PostgreSQL", "MySQL",
    "Linux", "Windows", "Windows Server", "Packet Tracer",
    "Agile", "Scrum", "REST API"
  ],
  philosophy: "La curiosité est la clé de l'innovation et de l'apprentissage continu."
};

export const projects: Project[] = [
  {
    id: "discoverpicture-website",
    title: "DiscoverPicture",
    description: "Application web de partage d'albums photo sur le principe d'une chasse au trésor. Les utilisateurs scannent des QR codes pour débloquer des photos et découvrir des contenus de manière ludique et interactive.",
    technologies: ["Flutter"],
    image: "/projects/discoverpicture.png",
    liveUrl: "https://leigermax.github.io/discoverpicture-website/",
    githubUrl: "https://github.com/LeigerMax/DiscoverPicture",
    featured: true
  },
  {
    id: "love4you-app",
    title: "Love4You",
    description: "Application mobile pour couples permettant de partager moments, messages et défis interactifs. Projet en cours de développement avec une approche full stack et mobile.",
    technologies: ["Flutter"],
    image: "/projects/love4you.jpg", // à remplacer par un screenshot
    liveUrl: "", // à remplir lorsqu'elle sera en ligne
    githubUrl: "https://github.com/LeigerMax/Love4You-Flutter",
    featured: true
   },
   {
    id: "go4success-platform",
    title: "Go4Success",
    description: "Projet universitaire : Développement d'une plateforme conviviale et efficace, facilitant l'accès aux différentes ressources et ateliers d'aide à la réussite pour les étudiants.",
    technologies: ["TypeScript", "Python"],
    image: "/projects/go4success.jpg", // à remplacer par une capture si disponible
    liveUrl: "", // à remplir si déployé
    githubUrl: "https://github.com/denisdetry/Go4Success",
    featured: false
   },
   {
    id: "motion-party-game",
    title: "Motion-Party",
    description: "Jeu interactif destiné aux seniors, où les joueurs utilisent leur corps comme manette grâce à la caméra pour participer à une série de mini-jeux sur le thème des colonies de vacances.",
    technologies: ["C#", "Unity", "Python", "MediaPipe"],
    image: "/projects/motion-party.png", // à remplacer par une capture du jeu
    liveUrl: "https://www.youtube.com/watch?v=tMnubdURroY", // à remplir si déployé ou disponible en démo
    githubUrl: "https://github.com/LeigerMax/Motion-Party", // à remplacer si différent
    featured: true
   },
   {
    id: "belle-ariane",
    title: "Belle Ariane",
    description: "Création d'un site web e-commerce nommé 'Belle Ariane', boutique en ligne de bijoux, développé avec WordPress. Gestion complète de la photographie et du montage via Photoshop.",
    technologies: ["WordPress", "HTML", "CSS", "Photoshop"],
    image: "/projects/belle-ariane.jpg", // à remplacer par une capture du site
    liveUrl: "https://belleariane.com/", // site hors ligne actuellement
    githubUrl: "", // pas de GitHub pour ce projet
    featured: false
   }



];

export const experiences: Experience[] = [
  {
    id: "stage-it",
    company: "Zone NAGE",
    position: "Stagiaire IT",
    startDate: "2022-02",
    endDate: "2022-05",
    description: "Webisation du module rapport pompiers et ambulance du logiciel IEmergencyAdministration. Renforcement des compétences en développement web php.",
    technologies: ["PHP","C#"]
  },
  {
    id: "solidaris",
    company: "Solidaris Mutualité",
    position: "Étudiant Encodeur",
    startDate: "2021-07",
    endDate: "2022-08",
    description: "Gestion des remboursements des allocations complémentaires. Faire preuve de professionnalisme et de polyvalence.",
    technologies: []  
  },
  {
    id: "benevole",
    company: "Saint Vincent de Paul",
    position: "Bénévole",
    startDate: "2021-07",
    endDate: "2025-12",
    description: "Distribution alimentaire aux personnes démunies. Faire preuve de respect et d'empathie à l'égard de la partie aide.",
    technologies: []  
  },
    {
    id: "agc",
    company: "AGC",
    position: "Inventoriste & Magasinier étudiant",
    startDate: "2018-06",
    endDate: "2019-08",
    description: "Réception des colis, vérification des stocks et distribution d'équipements aux ouvriers. Sens des responsabilités et capacité à m'organiser.",
    technologies: []  
  },

];

export const education: Education[] = [
{
    id: "master60-sciences-informatiques",
    institution: "Université de Namur",
    degree: "Master 60 en Sciences Informatiques",
    startDate: "2024-10",
    endDate: "2025-08",
    description: "Programme avancé en développement logiciel et ingénierie logicielle, renforçant les compétences en architecture, sécurité et technologies émergentes.",
  },
  {
    id: "master2-software-engineer",
    institution: "Université de Namur",
    degree: "Master 2 (M2), Software Engineer",
    startDate: "2022-09",
    endDate: "2024-09",
    description: "Compétences approfondies en conception, développement, maintenance et évolution de logiciels. Cours sur méthodes de développement logiciel, architectures logicielles, gestion de projet, sécurité et projets pratiques.",
  },
  {
    id: "btech-informatique",
    institution: "Haute École de Namur-Liège-Luxembourg (Hénallux)",
    degree: "Bachelor of Technology - Technologie informatique",
    startDate: "2018-09",
    endDate: "2022-06",
    description: "Formation couvrant programmation, administration réseau et systèmes, conception de sites web, bases de données, sécurité, virtualisation et projets pratiques.",
  },
  {
    id: "cess-sjb",
    institution: "Saint Jean Baptiste Tamines",
    degree: "CESS Technique Informatique",
    startDate: "2012-09",
    endDate: "2018-06",
    description: "Etudes secondaires techniques axées sur l'informatique, incluant la programmation.",
  }
];

export const contactInfo: ContactInfo = {
  email: "max.allemeersch@gmail.com",
  phone: "",
  linkedin: "https://www.linkedin.com/in/maxime-allemeersch/",
  github: "https://github.com/LeigerMax",
  twitter: "" // à remplir si tu souhaites
};
