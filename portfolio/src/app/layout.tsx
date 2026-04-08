import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { I18nProvider } from "@/components/I18nProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://maxleiger.dev"),
  title: "Maxime Allemeersch | Software Engineer & Expert Web Fullstack",
  description: "Découvrez le portfolio de Maxime Allemeersch, Software Engineer spécialisé en React, Next.js et Flutter. Créateur d'expériences numériques innovantes et performantes.",
  keywords: ["Software Engineer", "Développeur Fullstack", "React", "Next.js", "Flutter", "TypeScript", "Portfolio", "Maxime Allemeersch", "LeigerMax", "Web Development"],
  authors: [{ name: "Maxime Allemeersch" }],
  creator: "Maxime Allemeersch",
  publisher: "Maxime Allemeersch",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Maxime Allemeersch | Software Engineer & Expert Web Fullstack",
    description: "Portfolio expert de Maxime Allemeersch, Software Engineer passionné par les expériences web innovantes.",
    url: "https://maxleiger.dev",
    siteName: "Maxime Allemeersch Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maxime Allemeersch - Software Engineer Portfolio",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxime Allemeersch | Software Engineer & Expert Web Fullstack",
    description: "Portfolio expert de Maxime Allemeersch, Software Engineer passionné par les expériences web innovantes.",
    creator: "@maxleiger",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00ffff" },
    { media: "(prefers-color-scheme: dark)", color: "#00ffff" },
  ],
  category: "technology",
  verification: {
    google: "YU5YsIOQO2UfGISi4ma0b3vPniagXxM1MVfbGr5Cnnc",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Maxime Allemeersch",
  "jobTitle": "Software Engineer",
  "url": "https://maxleiger.dev",
  "sameAs": [
    "https://github.com/LeigerMax",
    "https://www.linkedin.com/in/maxime-allemeersch/"
  ],
  "knowsAbout": [
    "Web Development",
    "Software Engineering",
    "React",
    "Next.js",
    "Flutter",
    "TypeScript",
    "Tailwind CSS",
    "Firebase",
    "Architecture logicielle"
  ],
  "description": "Portfolio de Maxime Allemeersch, Software Engineer spécialisé dans le développement d'applications web et mobiles innovantes."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark scroll-smooth snap-y snap-proximity">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="msapplication-TileColor" content="#00ffff" />
        <meta name="theme-color" content="#00ffff" />
      </head>
      <body className="antialiased crt-effect font-mono">
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HMMKGTKC0H"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-HMMKGTKC0H');
          `}
        </Script>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
