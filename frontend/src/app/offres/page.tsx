'use client';

import { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import OfferCard from '../../components/features/offers/OfferCard';

// Données simulées (Mock Data) basées sur ton image
const MOCK_OFFERS = [
  {
    id: 1,
    category: 'Vêtements' as const,
    title: "Couvertures et vêtements chauds",
    description: "20 couvertures et vêtements pour adultes et enfants disponibles immédiatement pour distribution.",
    quantity: "x20",
    location: "Quartier Hassan II",
    timeAgo: "il y a environ 2 heures",
    status: 'Disponible' as const,
    contactName: "Youssef"
  },
  {
    id: 2,
    category: 'Logistique' as const,
    title: "Transport disponible",
    description: "Véhicule 4x4 disponible pour transport de personnes ou de marchandises vers les zones inondées.",
    location: "Centre ville",
    timeAgo: "il y a environ 4 heures",
    status: 'Disponible' as const,
    contactName: "Karim"
  },
  {
    id: 3,
    category: 'Alimentation' as const,
    title: "50 Repas chauds",
    description: "Notre restaurant a préparé 50 repas (tajines) prêts à être distribués ce soir.",
    quantity: "x50",
    location: "Avenue Mohamed V",
    timeAgo: "il y a 30 min",
    status: 'Disponible' as const,
    contactName: "Restaurant Al Baraka"
  },
  {
    id: 4,
    category: 'Logement' as const,
    title: "Chambre pour 3 personnes",
    description: "J'ai une chambre libre chez moi pour accueillir une petite famille pour quelques nuits.",
    location: "Quartier Pam",
    timeAgo: "il y a 1 jour",
    status: 'Disponible' as const,
    contactName: "Fatima Zahra"
  }
];

export default function OffersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* --- 1. En-tête de page --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Offres d'aide</h1>
            <p className="text-slate-500">
              <span className="font-bold text-[#0f4c81]">{MOCK_OFFERS.length} offres disponibles</span> pour aider la communauté
            </p>
          </div>
          
          {/* Bouton Proposer (Bleu foncé) */}
          <button className="flex items-center gap-2 bg-[#0f4c81] hover:bg-blue-900 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-95">
            <Plus size={20} />
            <span>Proposer une offre</span>
          </button>
        </div>

        {/* --- 2. Barre de Recherche & Filtres --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          
          {/* Champ Recherche */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher une offre (ex: transport, repas...)" 
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all outline-none shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Dropdown Filtre */}
          <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-all shadow-sm min-w-[200px]">
            <Filter size={18} />
            <span>Toutes catégories</span>
          </button>
        </div>

        {/* --- 3. Grille des offres --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_OFFERS.filter(o => o.title.toLowerCase().includes(searchTerm.toLowerCase())).map((offer) => (
            <OfferCard key={offer.id} data={offer} />
          ))}
        </div>

        {/* État Vide */}
        {MOCK_OFFERS.filter(o => o.title.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="inline-flex bg-slate-50 p-4 rounded-full mb-4">
              <Search size={32} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Aucune offre trouvée</h3>
            <p className="text-slate-500">Soyez le premier à proposer votre aide !</p>
          </div>
        )}

      </div>
    </div>
  );
}