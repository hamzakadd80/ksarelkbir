import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/features/Header";
import Footer from "../components/layout/Footer";
import { LanguageProvider } from "../context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Un titre plus descriptif aide Google
  title: "Ksar Entraide - Ksar El Kebir | منصة التضامن بالقصر الكبير",
  description: "Plateforme de solidarité et d'entraide pour les habitants de Ksar El Kebir. Rejoignez notre communauté pour aider ou recevoir de l'aide.",

  // Mots-clés pour les moteurs de recherche secondaires
  keywords: ["Ksar El Kebir", "Maroc", "Entraide", "Solidarité", "القصر الكبير", "تضامن", "مساعدة"],

  // Configuration pour le partage sur WhatsApp, Facebook, etc.
  openGraph: {
    title: "Ksar Entraide - منصة التضامن",
    description: "Plateforme de solidarité pour les citoyens de Ksar El Kebir",
    url: 'https://ksarelkbir.vercel.app',
    siteName: 'Ksar Entraide',
    locale: 'ar_MA', // Indique que le contenu est en arabe pour le Maroc
    type: 'website',
  },

  // La vérification que vous 
  verification: {
    google: "YiV0wPYhs5S_aYEfjaZh-8ulj2CrT704uzoeEUzuEzE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
