'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Loader2, HeartHandshake } from 'lucide-react';
import AddOfferModal from '../../components/features/offers/AddOfferModal';
import OfferCard from '../../components/features/offers/OfferCard';

// Type correspondant à ton API Offres
interface OfferFromAPI {
  id: string;
  title: string;
  description: string;
  category: string;
  locationName: string;
  createdAt: string;
  contactName?: string;
  contactPhone?: string;
  user?: {
    fullName: string;
    phone: string | null;
  };
}

export default function OffersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [offers, setOffers] = useState<OfferFromAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Charger les offres depuis le Backend
  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/offers');
      
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error("Erreur de chargement:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* MODAL D'AJOUT */}
        <AddOfferModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchOffers} 
        />

        {/* EN-TÊTE (Thème Bleu) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Offres disponibles</h1>
            <p className="text-slate-500">
              <span className="font-bold text-sky-600">{offers.length} propositions</span> d'aide recensées
            </p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-sky-500/20 transition-all active:scale-95"
          >
            <HeartHandshake size={20} />
            <span>Proposer de l'aide</span>
          </button>
        </div>

        {/* BARRE DE RECHERCHE */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher une offre (ex: repas, transport...)" 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500/20 focus:bg-white transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* GRILLE D'AFFICHAGE */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 text-sky-600">
            <Loader2 className="animate-spin mb-4" size={48} />
            <p className="text-slate-500 font-medium">Recherche des offres en cours...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers
              .filter(o => o.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((offer) => (
                <OfferCard 
                  key={offer.id} 
                  data={{
                    id: offer.id,
                    title: offer.title,
                    description: offer.description,
                    category: offer.category,
                    location: offer.locationName,
                    timeAgo: new Date(offer.createdAt).toLocaleDateString('fr-MA', { day: 'numeric', month: 'short' }),
                    // Logique pour afficher le nom (Inscrit OU Anonyme)
                    contactName: offer.user?.fullName || offer.contactName || 'Anonyme',
                    contactPhone: offer.user?.phone || offer.contactPhone
                  }} 
                />
            ))}
          </div>
        )}

        {/* Message vide */}
        {!loading && offers.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex bg-slate-100 p-4 rounded-full mb-4">
              <HeartHandshake size={32} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Aucune offre pour le moment</h3>
            <p className="text-slate-500">Soyez le premier à proposer votre aide !</p>
          </div>
        )}

      </div>
    </div>
  );
}