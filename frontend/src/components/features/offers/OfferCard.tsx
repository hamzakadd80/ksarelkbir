import { MapPin, Clock, Phone, Shirt, Truck, Home, Baby, Box, MoreHorizontal } from 'lucide-react';

interface OfferProps {
  category: 'Vêtements' | 'Logistique' | 'Logement' | 'Alimentation' | 'Autre';
  title: string;
  description: string;
  quantity?: string; // Ex: "x20"
  location: string;
  timeAgo: string;
  status: 'Disponible' | 'Réservé' | 'Distribué';
  contactName: string;
}

// Fonction pour récupérer l'icône et la couleur du badge catégorie
const getCategoryStyle = (category: string) => {
  switch (category) {
    case 'Vêtements': 
      return { icon: <Shirt size={16} />, style: 'bg-pink-50 text-pink-600 border-pink-100' };
    case 'Logistique': 
      return { icon: <Truck size={16} />, style: 'bg-purple-50 text-purple-600 border-purple-100' };
    case 'Logement': 
      return { icon: <Home size={16} />, style: 'bg-blue-50 text-blue-600 border-blue-100' };
    case 'Alimentation': 
      return { icon: <Baby size={16} />, style: 'bg-green-50 text-green-600 border-green-100' };
    default: 
      return { icon: <Box size={16} />, style: 'bg-slate-50 text-slate-600 border-slate-100' };
  }
};

export default function OfferCard({ data }: { data: OfferProps }) {
  const catInfo = getCategoryStyle(data.category);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden">
      
      {/* --- En-tête de la carte --- */}
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          {/* Icône principale (visuelle) */}
          <div className="h-10 w-10 rounded-full bg-blue-50 text-[#0f4c81] flex items-center justify-center">
            {catInfo.icon}
          </div>
          
          {/* Badge Statut */}
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
            {data.status}
          </span>
        </div>

        {/* Titre & Description */}
        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
          {data.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
          {data.description}
        </p>

        {/* Badges Catégorie & Quantité */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${catInfo.style}`}>
            {catInfo.icon}
            {data.category}
          </span>
          {data.quantity && (
            <span className="text-sm font-medium text-slate-500">
              {data.quantity}
            </span>
          )}
        </div>

        {/* Infos contextuelles */}
        <div className="space-y-2 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-slate-400 shrink-0" />
            <span className="truncate">{data.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-slate-400 shrink-0" />
            <span>{data.timeAgo}</span>
          </div>
        </div>
      </div>

      {/* --- Pied de carte (Bouton Action Bleu) --- */}
      <div className="p-4 border-t border-slate-50">
        <button className="w-full flex items-center justify-center gap-2 bg-[#0f4c81] hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl shadow-md shadow-blue-900/20 transition-all active:scale-95">
          <Phone size={18} />
          <span>{data.contactName}</span>
        </button>
      </div>
    </div>
  );
}