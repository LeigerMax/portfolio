import { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Love4You",
    featured: true,
    description: "Love4You est une application mobile innovante conçue pour dynamiser la vie de couple à travers une expérience ludique et interactive. Basée sur un système de gamification poussé, elle propose divers modules de jeux (quiz, défis, jeux de rôles) et des quêtes quotidiennes pour encourager l'engagement et la rétention.\n\nPoints clés :\n• Conception & Design : Rédaction du cahier des charges (PRD), prototypage interactif sous Figma et définition de la roadmap produit.\n• Écosystème Connecté : Développement d'une application Flutter et d'un site vitrine Next.js.\n• Gamification & Fidélisation : Mise en place de modules de jeu variés et de mécaniques de rétention (Daily Quests, Streaks).\n• Marketing & Tests : Stratégie de présence sur les réseaux sociaux, création d'assets visuels (Canva) et validation via Firebase (Test Lab, Remote Config).",
    technologies: ["Flutter", "Firebase", "Next.js", "TypeScript", "Figma", "Canva", "Notion", "CI/CD"],
    images: ["/images/projects/love4you.jpg"],
    links: { github: "#", live: "https://love4you.vercel.app/" }
  },
  {
    title: "DiscoverPicture",
    description: "DiscoverPicture transforme le partage de photos en une chasse au trésor numérique interactive. Plutôt que d'envoyer de simples fichiers, créez des albums où chaque souvenir est verrouillé derrière un QR code secret. Une expérience ludique, sécurisée et entièrement locale pour redécouvrir vos moments précieux.\n\nPoints clés :\n• Concept de Chasse au Trésor : Système de déverrouillage de photos par scan de QR codes uniques.\n• Confidentialité Totale : Architecture 100% locale, aucune donnée n'est envoyée ou stockée sur le cloud.\n• Sécurité Native : Protection intégrée contre les captures d'écran pour préserver l'intimité des souvenirs.\n• Mode Hors-ligne : Fonctionnement complet sans connexion internet pour le scan et la visualisation.\n• UI Material Design 3 : Interface moderne et intuitive utilisant les derniers standards de design de Google.",
    technologies: ["Flutter", "Dart", "Material Design 3", "QR Code API", "Local Storage", "Security"],
    images: ["/images/projects/discoverpicture.png"],
    links: { github: "https://github.com/LeigerMax/DiscoverPicture", live: "https://leigermax.github.io/discoverpicture-website/" }
  },
  {
    title: "Motion-Party",
    description: "Jeu interactif pour seniors utilisant la caméra du PC pour transformer le corps en manette.",
    technologies: ["Computer Vision", "Interactivité", "UX Senior", "C#", "Unity", "Python", "MediaPipe"],
    images: ["/images/projects/motion-party.png"],
    video: "https://www.youtube.com/watch?v=tMnubdURroY",
    links: { github: "https://github.com/LeigerMax/Motion-Party", live: "https://www.youtube.com/watch?v=tMnubdURroY" }
  },
  {
    title: "Aura English",
    description: "Aura English est une application mobile moderne et intelligente dédiée à l'apprentissage de l'anglais. Elle combine la puissance de l'IA (Google Gemini) avec des méthodes d'apprentissage éprouvées comme la Répétition Espacée (Spaced Repetition) via l'algorithme SM-2.\n\nPoints clés :\n• Génération par IA : Création automatique de question et correction via l'API Gemini.\n• Système de Révision (SRS) : Algorithme SM-2 pour planifier les révisions au moment idéal.\n• Contenu Riche : Plus de 20 decks intégrés couvrant les niveaux CEFR de A1 à C2.\n• Partage & Communauté : Import/Export de decks en JSON et partage simplifié par codes QR.\n• Mode Hors-ligne : Architecture offline-first avec stockage local SQLite et mises à jour OTA.",
    technologies: ["React Native", "TypeScript", "NativeWind", "SQLite", "Next.js", "Tailwind CSS", "Google Gemini"],
    images: ["/images/projects/aura-english.jpg"],
    links: { github: "https://github.com/LeigerMax/Aura-English", live: "https://aura-english.vercel.app/" }
  },
  {
    title: "Discord Bot Nexus",
    description: "Nexus est un bot multifonction conçu pour dynamiser les interactions entre les membres d'un serveur Discord. Alliant divertissement et outils d'administration, il se distingue par une architecture robuste orientée DevOps.\n\nPoints clés :\n• Engagement Communautaire : Plus de 30 commandes de jeux (roulette russe, dés, pendu, bataille navale, oxo) et un système de malédiction poussé pour renforcer l'interaction.\n• Infrastructure & Keep-Alive : Serveur Express.js intégré pour assurer un maintien en ligne 24/7 sur des plateformes comme Render ou Replit.\n• Qualité du Code : Utilisation de Jest pour les tests unitaires et ESLint pour l'analyse statique, garantissant une grande stabilité.\n• CI/CD : Automatisation complète des tests et du linting via GitHub Actions.",
    technologies: ["Python", "Render", "Express.js", "Jest", "ESLint", "GitHub Actions", "Infrastructure & DevOps"],
    images: ["/images/projects/nexus1.jpg", "/images/projects/nexus2.jpg", "/images/projects/nexus3.jpg"],
    links: { github: "https://github.com/LeigerMax/Discord_Bot", live: "#" }
  },
  {
    title: "Belle Ariane",
    description: "Boutique en ligne spécialisée dans les bijoux (activité cessée en janvier 2023). Le projet incluait la définition complète de la charte graphique et du Moodboard, la conception du site e-commerce, l'optimisation SEO, ainsi que la photographie des produits et le montage visuel.",
    technologies: ["WordPress", "Photoshop", "E-commerce", "Photographie", "Notion", "SEO", "Design Graphique"],
    images: ["/images/projects/belleariane1.jpg", "/images/projects/belleariane2.jpg", "/images/projects/belleariane3.jpg"],
    links: { github: "#", live: "#" }
  },
  {
    title: "Phantom Posture",
    description: "Application mobile non intrusive conçue pour aider les utilisateurs à corriger et maintenir une posture saine au quotidien. Système de notifications intelligentes avec rappels discrets et validation de posture sans ouvrir l'application. Entièrement personnalisable (fréquence et horaires) pour s'adapter à votre routine.",
    technologies: ["Flutter", "Dart", "Local Notifications", "Background Tasks"],
    images: ["/images/projects/phantom-posture.jpg"],
    links: { github: "https://github.com/LeigerMax/Phantom-Posture", live: "#" }
  },
  {
    title: "GEQ - Game Experience Questionnaire Online",
    description: "Application web complète pour administrer et calculer le Game Experience Questionnaire (GEQ) en français et en anglais. Cet outil est conçu pour faciliter la recherche académique et industrielle en automatisant le traitement des données.\n\nPoints clés :\n• Calcul Automatisé : Implémentation de la méthode de scoring officielle développée par l'Université de technologie d'Eindhoven.\n• Bilingue & Accessible : Interface moderne entièrement localisée (FR/EN) pour une utilisation internationale.\n• Standard de Recherche : Outil standardisé utilisé pour évaluer scientifiquement l'expérience utilisateur (UX) dans les jeux vidéo.\n• Simplicité d'Usage : Permet une collecte rapide des réponses sans nécessiter de traitement manuel post-formulaire.",
    technologies: ["HTML5", "CSS3", "JavaScript", "UX Research", "Data Scoring"],
    images: ["/images/projects/geq-online.jpg"],
    links: {
      github: "https://github.com/LeigerMax/The-Game-Experience-Questionnaire-Online",
      live: "https://leigermax.github.io/The-Game-Experience-Questionnaire-Online/"
    }
  },
  {
    title: "Les Grignotons (Refonte)",
    description: "Refonte d'un site d'élevage familial. Modernisation complète de l'interface tout en conservant une navigation familière pour la cliente, peu à l'aise avec les technologies.\n\nPoints clés :\n• Modernisation : Transition d'un design obsolète vers une stack moderne (Next.js, Tailwind CSS) tout en respectant les habitudes de navigation de l'utilisateur.\n• Simplicité : Mise en place d'un dashboard Sanity sur-mesure, simplifié à l'extremement pour une gestion de contenu intuitive par la cliente.\n• Accessibilité : Respect strict des règles de design et d'accessibilité du Service Public Wallon (SPW).\n• Performances : Site optimisé en performance et SEO, assurant une présence web efficace pour un élevage local.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity", "Vercel", "Angular"],
    images: ["/images/projects/les-grignotons-1.jpg", "/images/projects/les-grignotons-2.jpg"],
    links: { github: "https://github.com/LeigerMax/Les-Grignotons", live: "https://les-grignotons-elevage.vercel.app/" }
  },
  {
    title: "Go4Success",
    description: "Développée durant mes études à l'UNamur, Go4Success est une plateforme d'ateliers d'aide à la réussite destinée au campus de l'UCL. Conçue pour être multiplateforme (Android, iOS, Web) et open source, elle répond à des exigences strictes de maintenabilité, de sécurité et de disponibilité pour faciliter sa reprise par de futurs développeurs.\n\nPoints clés :\n• Architecture Multiplateforme : Développement d'une solution unique accessible sur mobile et web.\n• Méthodologie & DevOps : Utilisation de Docker pour l'orchestration et mise en place de workflows Agile/DevOps.\n• Sécurité & API : Authentification sécurisée via JWT et communication via une API REST robuste (Django REST Framework).\n• Performance Frontend : Gestion d'état et requêtage optimisé avec React Native et TanStack.",
    technologies: ["React Native", "Django", "Django REST Framework", "Docker", "TanStack", "JWT", "Agile", "DevOps"],
    images: ["/images/projects/go4success.jpg"],
    links: { github: "https://github.com/LeigerMax/Go4Success", live: "#" }
  },
  {
    title: "Interfaces incarnées et augmentées - Kinect Kata",
    description: "Système de validation de position basé sur l'angle pour le KATA dans l'art martial de l'aïkido. Les angles des os du haut du corps des KATA prédéfinis sont enregistrés dans une liste. Le système utilise les capteurs Kinect pour estimer les coordonnées des articulations du corps et calculer l'angle des os. Si les angles correspondent à la position testée, celle-ci est validée.\n\nPoints clés :\n• Kinect SDK 2.0 : Utilisation intensive du SDK pour le suivi squelettique en temps réel.\n• Validation Biométrique : Algorithme de calcul d'angles pour valider la justesse des mouvements d'aïkido.\n• Optimisation : Travail sur la reconnaissance malgré les vêtements amples typiques des arts martiaux.",
    technologies: ["C#", "XML", "Kinect SDK 2.0"],
    images: ["/images/projects/kinect-kata.png"],
    links: {
      github: "https://github.com/LeigerMax/UNAMUR-INFOM435-Projet_Kinect_Kata",
      live: "#",
      pdf: "/docs/kinect-kata-research.pdf"
    }
  },
  {
    title: "E-Anacarde",
    description: "Projet universitaire d'envergure destiné au marché de l'anacarde au Bénin, permettant la traçabilité complète des noix de cajou de la récolte à la vente. La plateforme gère deux systèmes de transaction : achat direct et enchères, tout en offrant des outils de gestion avancés pour les coopératives et les stocks.\n\nPoints clés :\n• Gestion Complète : Modules dédiés aux champs, stocks, sacs, coopératives et vente (market).\n• Dashboard Admin : Tableau de bord poussé pour une gestion globale du système et des utilisateurs.\n• Analyse Rigoureuse : Conception basée sur des cas d'utilisation, diagrammes de séquence et d'activité avec documentation API complète.\n• Internationalisation : Support multilingue et design responsive adapté aux contraintes locales.\n• Stack Moderne : Architecture robuste avec Spring Boot, Angular et PostgreSQL, orchestrée par Docker.",
    technologies: ["Spring Boot", "Angular", "PostgreSQL", "Docker", "UML", "Agile", "Internationalisation", "Keycloak "],
    images: ["/images/projects/e-anacarde1.jpg", "/images/projects/e-anacarde2.png", "/images/projects/e-anacarde3.jpg", "/images/projects/e-anacarde4.jpg"],
    links: { github: "https://github.com/LeigerMax/E-Anacarde", live: "#" }
  },
];
