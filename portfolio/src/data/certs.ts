export interface Certification {
  titleKey: string;
  issuer: string;
  dateKey: string;
  descriptionKey: string;
}

export const certifications: Certification[] = [
  {
    titleKey: "Red Hat OpenShift I: Containers & Kubernetes (DO180)",
    issuer: "Red Hat",
    dateKey: "certs_data.do180_date",
    descriptionKey: "certs_data.do180_desc"
  },
  {
    titleKey: "Unity Essentials Pathway",
    issuer: "Unity Technologies",
    dateKey: "certs_data.unity_date",
    descriptionKey: "certs_data.unity_desc"
  },
  {
    titleKey: "certs_data.css_title",
    issuer: "Technofutur TIC",
    dateKey: "certs_data.css_date",
    descriptionKey: "certs_data.css_desc"
  },
  {
    titleKey: "certs_data.html_title",
    issuer: "Technofutur TIC",
    dateKey: "certs_data.html_date",
    descriptionKey: "certs_data.html_desc"
  }
];

export interface ExtraCertification {
  titleKey: string;
  issuer: string;
  date: string;
}

export const extraCertifications: ExtraCertification[] = [
  {
    titleKey: "certs_data.google_title",
    issuer: "Skillshop Google",
    date: "2024"
  },
  {
    titleKey: "certs_data.oc_html_title",
    issuer: "OpenClassrooms",
    date: "25 août 2015"
  },
  {
    titleKey: "certs_data.oc_java_title",
    issuer: "OpenClassrooms",
    date: "24 mars 2020"
  },
  {
    titleKey: "certs_data.oc_eclipse_title",
    issuer: "OpenClassrooms",
    date: "5 avril 2020"
  },
  {
    titleKey: "certs_data.oc_arduino_title",
    issuer: "OpenClassrooms",
    date: "30 avril 2020"
  },
  {
    titleKey: "certs_data.oc_risks_title",
    issuer: "OpenClassrooms",
    date: "9 mai 2020"
  },
  {
    titleKey: "certs_data.oc_manage_title",
    issuer: "OpenClassrooms",
    date: "25 février 2021"
  },
  {
    titleKey: "Introduction à jQuery",
    issuer: "OpenClassrooms",
    date: "17 mars 2022"
  },
  {
    titleKey: "certs_data.oc_angular_title",
    issuer: "OpenClassrooms",
    date: "17 novembre 2025"
  },
  {
    titleKey: "certs_data.oc_spring_title",
    issuer: "OpenClassrooms",
    date: "15 novembre 2025"
  },
  {
    titleKey: "certs_data.oc_http_title",
    issuer: "OpenClassrooms",
    date: "18 novembre 2025"
  }
];
