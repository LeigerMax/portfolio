export interface Certification {
  titleKey: string;
  issuer: string;
  date: string;
  descriptionKey?: string;
  link?: string;
  isImportant?: boolean;
}

export const certifications: Certification[] = [
  // Red Hat & Unity
  {
    titleKey: "Red Hat OpenShift I: Containers & Kubernetes (DO180)",
    issuer: "Red Hat",
    date: "04/2021",
    descriptionKey: "certs_data.do180_desc",
    link: "/docs/certificats/Certificate%20of%20Attendance%20(DO180-4.5).pdf",
    isImportant: true
  },
  {
    titleKey: "Unity Essentials Pathway",
    issuer: "Unity Technologies",
    date: "03/2025",
    descriptionKey: "certs_data.unity_desc",
    link: "https://www.credly.com/badges/41d71567-ade6-426a-bdce-d9e2a7f8ddf5",
    isImportant: false
  },

  // Google Cloud
  {
    titleKey: "Set Up an App Dev Environment on Google Cloud Skill Badge",
    issuer: "Google Cloud",
    date: "04/2026",
    link: "https://www.credly.com/badges/bb9b1f03-c3f3-44b8-bfd7-bf12157530cc"
  },
  {
    titleKey: "Prompt Design in Vertex AI Skill Badge",
    issuer: "Google Cloud",
    date: "04/2026",
    link: "https://www.credly.com/badges/0232f369-aa15-4bf7-a5c8-3392dfc98cd9"
  },
  {
    titleKey: "The Basics of Google Cloud Compute Skill Badge",
    issuer: "Google Cloud",
    date: "04/2026",
    link: "https://www.credly.com/badges/95de0f59-53d2-4e87-8319-4853c6df7f7b"
  },
  {
    titleKey: "Create Your First Gemini Enterprise Application",
    issuer: "Google Cloud",
    date: "04/2026",
    link: "https://www.credly.com/badges/c7ac106f-84c2-456e-bcd6-fcd4f4caa474"
  },
  {
    titleKey: "Analyze Images with the Cloud Vision API Skill Badge",
    issuer: "Google Cloud",
    date: "04/2026",
    link: "https://www.credly.com/badges/93a7c21b-ccff-4cd5-a1d2-097c32d5cc69"
  },
  {
    titleKey: "Get Started with Google Workspace Tools Skill Badge",
    issuer: "Google Cloud",
    date: "04/2026",
    link: "https://www.credly.com/badges/f8255175-ffaa-4b19-8d77-bad60c201670"
  },

  // Appcues
  {
    titleKey: "Scaled User Engagement",
    issuer: "Appcues",
    date: "04/2026",
    link: "https://www.credly.com/badges/1cc1bcc5-a937-4386-8f5f-af2fd5a0483b"
  },
  {
    titleKey: "User Onboarding 101",
    issuer: "Appcues",
    date: "04/2026",
    link: "https://www.credly.com/badges/4bc2f5fb-5cc4-405b-ac79-44985931cf5d"
  },
  {
    titleKey: "Value-First Onboarding",
    issuer: "Appcues",
    date: "04/2026",
    link: "https://www.credly.com/badges/80cbbd77-d983-4d08-8445-e34d560e0546"
  },

  // Adobe Education
  {
    titleKey: "30 min Lightning Learning | Generative AI in the Classroom",
    issuer: "Adobe Education",
    date: "04/2026",
    link: "https://www.credly.com/badges/404913b8-681c-45e7-b880-ae634fb95a97"
  },

  // Technofutur TIC
  {
    titleKey: "certs_data.css_title",
    issuer: "Technofutur TIC",
    date: "04/2019",
    descriptionKey: "certs_data.css_desc",
    link: "/docs/certificats/2019-04-04_4.2453CSS_Allemeersch_Maxime_Attestation.pdf"
  },
  {
    titleKey: "certs_data.html_title",
    issuer: "Technofutur TIC",
    date: "01/2019",
    descriptionKey: "certs_data.html_desc",
    link: "/docs/certificats/2019-01-29_4.2559HTML5_Allemeersch_Maxime_Attestation.pdf"
  },

  // Skillshop Google
  {
    titleKey: "certs_data.google_title",
    issuer: "Skillshop Google",
    date: "2024",
    link: "https://skillshop.exceedlms.com/student/collection/650376-become-searchable-online"
  },

  // OpenClassrooms
  {
    titleKey: "certs_data.oc_html_title",
    issuer: "OpenClassrooms",
    date: "08/2015"
  },
  {
    titleKey: "certs_data.oc_java_title",
    issuer: "OpenClassrooms",
    date: "03/2020"
  },
  {
    titleKey: "certs_data.oc_eclipse_title",
    issuer: "OpenClassrooms",
    date: "04/2020"
  },
  {
    titleKey: "certs_data.oc_arduino_title",
    issuer: "OpenClassrooms",
    date: "04/2020"
  },
  {
    titleKey: "certs_data.oc_risks_title",
    issuer: "OpenClassrooms",
    date: "05/2020"
  },
  {
    titleKey: "certs_data.oc_manage_title",
    issuer: "OpenClassrooms",
    date: "02/2021"
  },
  {
    titleKey: "Introduction à jQuery",
    issuer: "OpenClassrooms",
    date: "03/2022"
  },
  {
    titleKey: "certs_data.oc_angular_title",
    issuer: "OpenClassrooms",
    date: "11/2025"
  },
  {
    titleKey: "certs_data.oc_spring_title",
    issuer: "OpenClassrooms",
    date: "11/2025"
  },
  {
    titleKey: "certs_data.oc_http_title",
    issuer: "OpenClassrooms",
    date: "11/2025"
  }
];
