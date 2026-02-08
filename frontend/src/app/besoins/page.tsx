'use client';

import { useState } from 'react';
import { Search, Plus, Filter, SlidersHorizontal } from 'lucide-react';
import NeedCard from '../../components/features/needs/NeedCard';

// Données simulées (Mock Data)
const MOCK_NEEDS = [
  {
    id: 1,
    category: 'Vêtements' as const,
    title: "Besoin urgent de couvertures",
    description: "Famille de 5 personnes sans abri après les inondations. Besoin de couvertures chaudes et manteaux pour enfants.",
    location: "Quartier Al Massira, près de la mosquée",
    timeAgo: "il y a 3 heures",
    urgency: 5 as const,
    status: 'En attente' as const,
    contactName: "Mohammed"
  },
  {
    id: 2,
    category: 'Santé' as const,
    title: "Médicaments pour diabétique (Insuline)",
    description: "Personne âgée diabétique a perdu ses médicaments dans l'inondation. Besoin urgent d'insuline Lantus.",
    location: "Centre ville, rue Hassan II",
    timeAgo: "il y a 5 heures",
    urgency: 5 as const,
    status: 'En cours' as const,
    contactName: "Fatima"
  },
  {
    id: 3,
    category: 'Logement' as const,
    title: "Hébergement pour 2 nuits",
    description: "Couple avec un bébé cherche un toit temporaire le temps que l'eau descende dans notre quartier.",
    location: "Route de Rabat",
    timeAgo: "il y a 1 jour",
    urgency: 4 as const,
    status: 'En attente' as const,
    contactName: "Youssef"
  },
  {
    id: 4,
    category: 'Alimentation' as const,
    title: "Eau potable et pain",
    description: "Nous sommes bloqués au 2ème étage, nous avons besoin d'eau et de nourriture de base.",
    location: "Douar Hmidouch",
    timeAgo: "il y a 30 min",
    urgency: 3 as const,
    status: 'En attente' as const,
    contactName: "Amina"
  }
];

export default function NeedsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* --- 1. En-tête de page --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Besoins signalés</h1>
            <p className="text-slate-500">
              <span className="font-bold text-amber-600">{MOCK_NEEDS.length} besoins</span> urgents recensés à Ksar El Kébir
            </p>
          </div>
          
          <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-amber-500/20 transition-all active:scale-95">
            <Plus size={20} />
            <span>Ajouter un besoin</span>
          </button>
        </div>

        {/* --- 2. Barre de filtres moderne --- */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 items-center">
          
          {/* Recherche */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher (ex: couvertures, médicaments...)" 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filtres Dropdowns (Style visuel) */}
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium hover:border-slate-300 hover:bg-slate-50 transition-all">
              <Filter size={18} />
              <span>Catégories</span>
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium hover:border-slate-300 hover:bg-slate-50 transition-all">
              <SlidersHorizontal size={18} />
              <span>Urgence</span>
            </button>
          </div>
        </div>

        {/* --- 3. Grille des cartes --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_NEEDS.filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase())).map((need) => (
            <NeedCard key={need.id} data={need} />
          ))}
        </div>

        {/* État vide si aucune recherche ne correspond */}
        {MOCK_NEEDS.filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex bg-slate-100 p-4 rounded-full mb-4">
              <Search size={32} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Aucun besoin trouvé</h3>
            <p className="text-slate-500">Essayez de modifier vos termes de recherche.</p>
          </div>
        )}

      </div>
    </div>
  );
}