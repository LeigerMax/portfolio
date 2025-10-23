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
  };
  projects: {
    title: string;
    viewProject: string;
    viewCode: string;
    technologies: string;
  };
  experience: {
    title: string;
    education: string;
    present: string;
  };
  contact: {
    title: string;
    subtitle: string;
    sendMessage: string;
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