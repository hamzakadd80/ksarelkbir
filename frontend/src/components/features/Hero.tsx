'use client';
import Link from 'next/link';
import { Heart, AlertTriangle, Gift } from 'lucide-react';

import { useLanguage } from '../../context/LanguageContext';

export default function Hero() {
  const { t, direction } = useLanguage();
  return (
    <section className="relative text-white overflow-hidden py-20 px-4 md:py-32 bg-cover bg-center"
      style={{ backgroundImage: "url('https://th.bing.com/th/id/R.e05a6d0bf78829e87527cb1ed0a8e9ce?rik=lv%2brenlS3fUkNA&pid=ImgRaw&r=0')" }}>

      {/* Effet de fond subtil (Optionnel - pour donner de la profondeur) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">

        {/* Badge "Solidarité Loukkos" */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm shadow-sm animate-fade-in-up">
          <Heart size={16} className="text-red-300 fill-red-300" />
          <span className="text-sm font-medium tracking-wide">{t.hero.badge}</span>
        </div>

        {/* Titre Principal */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2 drop-shadow-sm">
          {t.hero.title}
        </h1>

        {/* Sous-titre */}
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* Boutons d'Action (CTA) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">

          {/* Bouton 1: Signaler un besoin (Urgent) */}
          <Link
            href="/besoins/nouveau"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-amber-500/20 active:scale-95"
          >
            <AlertTriangle size={20} />
            <span>{t.hero.cta_need}</span>
          </Link>

          {/* Bouton 2: Proposer de l'aide */}
          <Link
            href="/offres/nouveau"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white border border-white/10 px-8 py-3.5 rounded-xl font-bold transition-all backdrop-blur-sm active:scale-95"
          >
            <Gift size={20} />
            <span>{t.hero.cta_offer}</span>
          </Link>

        </div>
      </div>
    </section>
  );
}