'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Loader2, Filter } from 'lucide-react';
import NeedCard from '../../components/features/needs/NeedCard';
import AddNeedModal from '../../components/features/needs/AddNeedModal'; // Import du Modal
import { useLanguage } from '../../context/LanguageContext';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Définition du type de données qui vient du Backend
interface NeedFromAPI {
  id: string;
  title: string;
  description: string;
  category: any;
  urgency: number;
  status: any;
  locationName: string;
  createdAt: string;
  user: {
    fullName: string;
    phone: string | null;
  };
}

export default function NeedsPage() {
  const { t, language } = useLanguage();
  // --- ÉTATS (STATES) ---
  const [searchTerm, setSearchTerm] = useState('');
  const [needs, setNeeds] = useState<NeedFromAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour ouvrir/fermer le modal

  // --- FONCTION POUR CHARGER LES DONNÉES ---
  const fetchNeeds = async () => {
    try {
      setLoading(true);
      // Appel à ton API Backend
      const response = await fetch(`${apiUrl}/api/needs`);

      if (!response.ok) {
        throw new Error('Erreur réseau lors de la récupération des besoins');
      }

      const data = await response.json();
      setNeeds(data);
    } catch (error) {
      console.error("Erreur de chargement:", error);
    } finally {
      setLoading(false);
    }
  };

  // Charger les données dès que la page s'ouvre
  useEffect(() => {
    fetchNeeds();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4">

        {/* --- LE MODAL (Invisible tant que isModalOpen est false) --- */}
        {/* onSuccess={fetchNeeds} permet de recharger la liste après un ajout réussi */}
        <AddNeedModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchNeeds}
        />

        {/* --- EN-TÊTE DE LA PAGE --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{t.needs_page.title}</h1>
            <p className="text-slate-500">
              <span className="font-bold text-amber-600">{needs.length} {t.needs_page.count_needs}</span>
            </p>
          </div>

          {/* Bouton pour ouvrir le Modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-amber-500/20 transition-all active:scale-95"
          >
            <Plus size={20} />
            <span>{t.needs_page.btn_add_need}</span>
          </button>
        </div>

        {/* --- BARRE DE RECHERCHE & FILTRES --- */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 items-center">

          {/* Champ Recherche */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder={t.needs_page.search_placeholder}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Bouton Filtre (Visuel pour l'instant) */}
          <button className="hidden md:flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-all">
            <Filter size={18} />
            <span>{t.needs_page.loading}</span>
          </button>
        </div>

        {/* --- AFFICHAGE : CHARGEMENT OU GRILLE --- */}
        {loading ? (
          // Spinner de chargement
          <div className="flex flex-col justify-center items-center h-64 text-amber-500">
            <Loader2 className="animate-spin mb-4" size={48} />
            <p className="text-slate-500 font-medium">{t.needs_page.loading}</p>
          </div>
        ) : (
          // Grille des cartes
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {needs
              // Filtrage local par titre
              .filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((need) => (
                <NeedCard
                  key={need.id}
                  data={{
                    category: need.category,
                    title: need.title,
                    description: need.description,
                    location: need.locationName,
                    // Formatage simple de la date (ex: 08/02/2026)
                    timeAgo: new Date(need.createdAt).toLocaleDateString(language === 'ar' ? 'ar-MA' : 'fr-MA', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }),
                    urgency: need.urgency as any,
                    status: need.status === 'EN_ATTENTE' ? t.needs_page.status_pending : need.status === 'EN_COURS' ? t.needs_page.status_in_progress : t.needs_page.status_resolved,
                    contactName: need.user?.fullName || 'Anonyme'
                  }}
                />
              ))}
          </div>
        )}

        {/* Message si aucun résultat */}
        {!loading && needs.length > 0 && needs.filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex bg-slate-100 p-4 rounded-full mb-4">
              <Search size={32} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">{t.needs_page.empty_title}</h3>
            <p className="text-slate-500">{t.needs_page.empty_desc}</p>
          </div>
        )}

      </div>
    </div>
  );
}
