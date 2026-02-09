'use client';

import dynamic from 'next/dynamic';
import { ArrowRight, Map as MapIcon } from 'lucide-react';
import Link from 'next/link';

import { useLanguage } from '../../context/LanguageContext';

// Composant de chargement extrait pour utiliser les hooks correctement
const MapLoading = () => {
  const { t } = useLanguage();
  return (
    <div className="h-96 w-full flex items-center justify-center bg-slate-100 rounded-b-2xl text-slate-400">
      {t.home.loading_map}
    </div>
  );
};

// Import Dynamique de la carte (Désactive le rendu serveur pour ce composant)
const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: MapLoading
});

export default function FloodMapSection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">

      {/* Header de la section (comme sur ton image) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
            <MapIcon className="text-[#0f4c81]" />
            {t.home.map_title}
          </h2>
          <p className="text-slate-500 mt-1">
            {t.home.map_subtitle}
          </p>
        </div>

        <Link
          href="/carte"
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm group"
        >
          <span>{t.home.view_map}</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Cadre de la carte */}
      <div className="w-full h-[450px] bg-white border border-slate-200 rounded-3xl shadow-lg relative z-10 overflow-hidden">
        <Map />
      </div>

    </section>
  );
}