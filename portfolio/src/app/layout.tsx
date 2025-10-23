import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/hooks/useLanguage";

export const metadata: Metadata = {
  title: "Maxime Allemeersch | Software Engineer Portfolio",
  description: "Portfolio rétro-futuriste de Maxime Allemeersch, Software Engineer passionné par les expériences web innovantes et le design années 80.",
  keywords: ["Software Engineer", "Developer", "React", "Next.js", "TypeScript", "Portfolio", "Retro", "80s"],
  authors: [{ name: "Maxime Allemeersch" }],
  creator: "Maxime Allemeersch",
  publisher: "Maxime Allemeersch",
  openGraph: {
    title: "Maxime Allemeersch | Software Engineer Portfolio",
    description: "Portfolio rétro-futuriste de Maxime Allemeersch, Software Engineer passionné par les expériences web innovantes.",
    url: "https://maxleiger.dev",
    siteName: "Maxime Allemeersch Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maxime Allemeersch Portfolio",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxime Allemeersch | Software Engineer Portfolio",
    description: "Portfolio rétro-futuriste de Maxime Allemeersch, Software Engineer passionné par les expériences web innovantes.",
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
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00ffff" },
    { media: "(prefers-color-scheme: dark)", color: "#00ffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#00ffff" />
        <meta name="theme-color" content="#00ffff" />
      </head>
      <body className="antialiased crt-effect font-mono">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
