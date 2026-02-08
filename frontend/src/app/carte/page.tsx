'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Filter, AlertTriangle, HandHeart, Gift, Layers } from 'lucide-react';

// Import dynamique pour éviter l'erreur SSR "window is not defined"
const FullMap = dynamic(() => import('../../components/features/FullMap'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-slate-100 text-slate-500">
      Chargement de la carte interactive...
    </div>
  ),
});

export default function MapPage() {
  // État des filtres
  const [filters, setFilters] = useState({
    showDanger: true,
    showNeeds: true,
    showOffers: true,
  });

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)] flex flex-col md:flex-row overflow-hidden">
      
      {/* --- SIDEBAR / PANNEAU DE CONTRÔLE --- */}
      <aside className="w-full md:w-80 bg-white border-r border-slate-200 z-10 shadow-xl flex flex-col h-auto md:h-full">
        
        <div className="p-5 border-b border-slate-100">
          <h1 className="text-xl font-bold flex items-center gap-2 text-slate-800">
            <Filter className="text-[#0f4c81]" />
            Filtres de la carte
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Sélectionnez les éléments à afficher
          </p>
        </div>

        <div className="p-4 flex flex-col gap-3">
          
          {/* Filtre Danger */}
          <button 
            onClick={() => toggleFilter('showDanger')}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              filters.showDanger 
                ? 'bg-red-50 border-red-200 text-red-700 font-bold shadow-sm' 
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            <div className={`p-2 rounded-full ${filters.showDanger ? 'bg-red-200' : 'bg-slate-100'}`}>
              <AlertTriangle size={18} />
            </div>
            <span>Zones à risque</span>
          </button>

          {/* Filtre Besoins */}
          <button 
            onClick={() => toggleFilter('showNeeds')}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              filters.showNeeds 
                ? 'bg-orange-50 border-orange-200 text-orange-700 font-bold shadow-sm' 
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            <div className={`p-2 rounded-full ${filters.showNeeds ? 'bg-orange-200' : 'bg-slate-100'}`}>
              <HandHeart size={18} />
            </div>
            <span>Besoins signalés</span>
          </button>

          {/* Filtre Offres */}
          <button 
            onClick={() => toggleFilter('showOffers')}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              filters.showOffers 
                ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold shadow-sm' 
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            <div className={`p-2 rounded-full ${filters.showOffers ? 'bg-blue-200' : 'bg-slate-100'}`}>
              <Gift size={18} />
            </div>
            <span>Offres d'aide</span>
          </button>

        </div>

        <div className="mt-auto p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
          <p className="flex items-center gap-2 mb-2">
            <Layers size={14} />
            Légende :
          </p>
          <ul className="space-y-1 ml-1">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 block"></span> Zone inondée
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-400 block"></span> Besoin urgent
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 block"></span> Point d'aide
            </li>
          </ul>
        </div>
      </aside>

      {/* --- CONTENEUR DE LA CARTE --- */}
      <div className="flex-1 relative bg-slate-200 h-[60vh] md:h-full">
        <FullMap filters={filters} />
        
        {/* Badge Flottant "Live" */}
        <div className="absolute top-4 right-4 z-[400] bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-600 shadow-md flex items-center gap-2 border border-white">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Données en temps réel
        </div>
      </div>

    </div>
  );
}