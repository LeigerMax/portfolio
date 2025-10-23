// Types for the retro portfolio

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  description?: string;
  credentialUrl?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  avatar: string;
  bio: string;
  skills: string[];
  philosophy: string;
}

// Language support
export type Language = 'fr' | 'en';

export interface TranslationContent {
  nav: {
    hero: string;
    about: string;
    projects: string;
    experience: string;
    certificates: string;
    contact: string;
  };
  hero: {
    greeting: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    title: string;
    skills: string;
    philosophy: string;
    whoAmI: string;
    skillCategories: {
      programming: string;
      frameworks: string;
      databases: string;
      tools: string;
      systems: string;
      methodologies: string;
    };
    stats: {
      projects: string;
      coffee: string;
      lines: string;
      experience: string;
    };
  };
  projects: {
    title: string;
    viewProject: string;
    viewCode: string;
    technologies: string;
    featured: string;
    other: string;
    subtitle: string;
    ctaText: string;
    ctaSubtext: string;
    demoText: string;
    codeText: string;
    liveIndicator: string;
    openSourceIndicator: string;
  };
  experience: {
    title: string;
    education: string;
    present: string;
    stats: {
      experienceYears: string;
      coffeeLabel: string;
      projectsLabel: string;
      technologiesLabel: string;
    };
  };
  certificates: {
    title: string;
    subtitle: string;
    certified: string;
    stats: {
      certificates: string;
      organizations: string;
      experienceYears: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    sendMessage: string;
    stayConnected: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      placeholder: string;
      send: string;
      successMessage: string;
    };
    methods: {
      emailDesc: string;
      linkedinDesc: string;
    };
  };
  common: {
    language: string;
    french: string;
    english: string;
  };
}

export interface Translations {
  fr: TranslationContent;
  en: TranslationContent;
}

// Animation and UI types
export interface Section {
  id: string;
  title: string;
  component: React.ComponentType;
  zoomTarget: {
    x: number;
    y: number;
    scale: number;
  };
}

export interface RetroTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neon: string;
    background: string;
    surface: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
}