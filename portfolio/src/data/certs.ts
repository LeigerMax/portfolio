export interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export const certifications: Certification[] = [
  {
    title: "Red Hat OpenShift I: Containers & Kubernetes (DO180)",
    issuer: "Red Hat",
    date: "avril 2021",
    description: "Formation approfondie sur les conteneurs et l'orchestration avec Kubernetes."
  },
  {
    title: "Unity Essentials Pathway",
    issuer: "Unity Technologies",
    date: "mars 2025",
    description: "Parcours complet pour les créateurs débutants avec Unity et la création de contenu en temps réel."
  },
  {
    title: "Initiation aux feuilles de style en cascade (CSS)",
    issuer: "Technofutur TIC",
    date: "avril 2019",
    description: "Formation complète sur les bases du CSS et les techniques de mise en page web moderne."
  },
  {
    title: "Initiation au langage HTML 5",
    issuer: "Technofutur TIC",
    date: "janvier 2019",
    description: "Formation aux fondamentaux du HTML5 et aux nouvelles fonctionnalités du web moderne."
  }
];

export interface ExtraCertification {
  title: string;
  issuer: string;
  date: string;
}

export const extraCertifications: ExtraCertification[] = [
  {
    title: "Aidez les utilisateurs à trouver votre entreprise en ligne",
    issuer: "Skillshop Google",
    date: "2024"
  },
  {
    title: "Créez votre site web avec HTML5 et CSS3",
    issuer: "OpenClassrooms",
    date: "25 août 2015"
  },
  {
    title: "Apprenez à programmer en Java",
    issuer: "OpenClassrooms",
    date: "24 mars 2020"
  },
  {
    title: "Installez votre environnement de développement Java avec Eclipse",
    issuer: "OpenClassrooms",
    date: "5 avril 2020"
  },
  {
    title: "Programmez vos premiers montages avec Arduino",
    issuer: "OpenClassrooms",
    date: "30 avril 2020"
  },
  {
    title: "Analysez et gérez des risques SI",
    issuer: "OpenClassrooms",
    date: "9 mai 2020"
  },
  {
    title: "Gérez votre projet informatique facilement",
    issuer: "OpenClassrooms",
    date: "25 février 2021"
  },
  {
    title: "Introduction à jQuery",
    issuer: "OpenClassrooms",
    date: "17 mars 2022"
  },
  {
    title: "Débutez avec Angular",
    issuer: "OpenClassrooms",
    date: "17 novembre 2025"
  },
  {
    title: "Créez une application Java avec Spring Boot",
    issuer: "OpenClassrooms",
    date: "15 novembre 2025"
  },
  {
    title: "Communiquez avec un serveur HTTP grâce à Angular",
    issuer: "OpenClassrooms",
    date: "18 novembre 2025"
  }
];
