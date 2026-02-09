'use client';
import Link from 'next/link';
import { Heart, AlertTriangle, Gift } from 'lucide-react';

import { useLanguage } from '../../context/LanguageContext';

export default function Hero() {
  const { t, direction } = useLanguage();
  return (
    <section className="relative text-white overflow-hidden py-24 px-4 md:py-36 bg-cover bg-center"
      style={{ backgroundImage: "url('https://th.bing.com/th/id/R.e05a6d0bf78829e87527cb1ed0a8e9ce?rik=lv%2brenlS3fUkNA&pid=ImgRaw&r=0')" }}>

      {/* Overlay dégradé sombre/bleu pour meilleure lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90 z-0"></div>

      {/* Effet de fond subtil */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8">

        {/* Badge "Solidarité Loukkos" */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-lg animate-fade-in-up">
          <Heart size={16} className="text-red-400 fill-red-400" />
          <span className="text-sm font-medium tracking-wide text-white">{t.hero.badge}</span>
        </div>

        {/* Titre Principal */}
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-2 drop-shadow-lg leading-tight">
          {t.hero.title}
        </h1>

        {/* Sous-titre */}
        <p className="text-lg md:text-2xl text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
          {t.hero.subtitle}
        </p>

        {/* Boutons d'Action (CTA) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto">

          {/* Bouton 1: Signaler un besoin (Urgent) */}
          <Link
            href="/besoins"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl hover:shadow-amber-500/30 hover:-translate-y-1 active:scale-95"
          >
            <AlertTriangle size={24} />
            <span className="text-lg">{t.hero.cta_need}</span>
          </Link>

          {/* Bouton 2: Proposer de l'aide */}
          <Link
            href="/offres"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-2xl font-bold transition-all backdrop-blur-md shadow-lg hover:shadow-white/10 hover:-translate-y-1 active:scale-95"
          >
            <Gift size={24} />
            <span className="text-lg">{t.hero.cta_offer}</span>
          </Link>

        </div>
      </div>
    </section>
  );
}