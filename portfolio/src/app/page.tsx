import { Metadata } from "next";
import HomeClient from "@/components/page-sections/HomeClient";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Maxime Allemeersch | Portfolio - Software Engineer (FR/EN)",
  description: "Portfolio of Maxime Allemeersch, Software Engineer (React, Next.js, Flutter, Angular). Innovative digital experiences. / Découvrez le portfolio de Maxime Allemeersch, expert Web & Mobile.",
  alternates: {
    canonical: "https://maxime-allemeersch.vercel.app",
    languages: {
      "fr-FR": "https://maxime-allemeersch.vercel.app",
      "en-US": "https://maxime-allemeersch.vercel.app",
    },
  },
};

export default function Home() {
  // Préparation du JSON-LD pour les projets
  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": projects.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.descriptionKey, // Note: On pourrait mettre la version traduite si on avait un accès simple ici
        "image": project.images[0] ? `https://maxime-allemeersch.vercel.app${project.images[0]}` : undefined,
        "url": project.links?.live && project.links.live !== "#" ? project.links.live : undefined,
        "author": {
          "@type": "Person",
          "name": "Maxime Allemeersch"
        },
        "keywords": project.technologies.join(", ")
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <HomeClient />
    </>
  );
}