'use client';
import Link from 'next/link';
import { Phone, Shield } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t, direction } = useLanguage();
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-auto py-8" dir={direction}>
      <div className="max-w-7xl mx-auto px-4">

        {/* 1. Bandeau d'Urgence (Rouge clair) */}
        <div className="w-full bg-red-50 border border-red-100 rounded-2xl p-4 mb-8 flex items-center justify-center text-center">
          <div className="flex flex-col md:flex-row items-center gap-2 text-red-700 font-bold text-lg">
            <Phone size={24} className="animate-pulse" />
            <span>{t.footer.urgency_line}</span>
          </div>
        </div>

        {/* 2. Liens et Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm font-medium">

          {/* Gauche : Confidentialité & À propos */}
          <div className="flex items-center gap-6">
            <Link
              href="/confidentialite"
              className="flex items-center gap-2 hover:text-[#0f4c81] transition-colors"
            >
              <Shield size={16} />
              <span>{t.footer.privacy}</span>
            </Link>

            <span className="hidden md:block text-slate-300">•</span>

            <Link
              href="/a-propos"
              className="hover:text-[#0f4c81] transition-colors"
            >
              {t.footer.about}
            </Link>
          </div>

          {/* Droite : Copyright */}
          <div className="text-center md:text-right">
            {t.footer.copyright}
          </div>

        </div>
      </div>
    </footer>
  );
}