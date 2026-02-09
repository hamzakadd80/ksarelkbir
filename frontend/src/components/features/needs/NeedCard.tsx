import { MapPin, Clock, AlertTriangle, Phone, User, Shirt, Pill, Home, Baby, MoreHorizontal } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

// Type pour les props (facultatif mais bonne pratique)
interface NeedProps {
  category: 'Vêtements' | 'Santé' | 'Logement' | 'Alimentation' | 'Autre';
  title: string;
  description: string;
  location: string;
  timeAgo: string;
  urgency: 1 | 2 | 3 | 4 | 5;
  status: string; // Changed to string to accept translated status
  contactName: string;
}

// Fonction utilitaire pour l'icône de catégorie
const getCategoryIcon = (category: string) => {
  // Mapping categories to match translations if needed or use keys
  // Assuming category is one of the keys or values. 
  // Ideally, the backend should send keys (VETEMENTS) and we translate them. 
  // But if it sends values ("Vêtements"), we might need to handle mapped icons carefully.
  // For now, let's assume category matches the icon logic
  if (category.includes('Vêtements') || category === 'VETEMENTS') return <Shirt size={16} />;
  if (category.includes('Santé') || category === 'SANTE') return <Pill size={16} />;
  if (category.includes('Logement') || category === 'LOGEMENT') return <Home size={16} />;
  if (category.includes('Alimentation') || category === 'ALIMENTATION') return <Baby size={16} />;
  return <MoreHorizontal size={16} />;
};

export default function NeedCard({ data }: { data: NeedProps }) {
  const { t } = useLanguage();

  const getTranslatedCategory = (cat: string) => {
    // Basic mapping if backend sends english keys, otherwise display as is
    if (cat === 'VETEMENTS') return t.categories.VETEMENTS;
    if (cat === 'SANTE') return t.categories.SANTE;
    if (cat === 'LOGEMENT') return t.categories.LOGEMENT;
    if (cat === 'ALIMENTATION') return t.categories.ALIMENTATION;
    if (cat === 'LOGISTIQUE') return t.categories.LOGISTIQUE;
    if (cat === 'AUTRE') return t.categories.AUTRE;
    return cat;
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden">

      {/* --- En-tête de la carte --- */}
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-3">
          {/* Badge Catégorie */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
            {getCategoryIcon(data.category)}
            {getTranslatedCategory(data.category)}
          </span>

          {/* Badge Statut */}
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${data.status.includes('attente') || data.status === t.needs_page.status_pending ? 'bg-orange-50 text-orange-600 border-orange-100' :
              data.status.includes('cours') || data.status === t.needs_page.status_in_progress ? 'bg-blue-50 text-blue-600 border-blue-100' :
                'bg-green-50 text-green-600 border-green-100'
            }`}>
            {data.status}
          </span>
        </div>

        {/* Titre & Description */}
        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
          {data.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
          {data.description}
        </p>

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
          {/* Niveau d'urgence */}
          <div className="flex items-center gap-2 text-red-600 font-medium">
            <AlertTriangle size={16} className="shrink-0" />
            <span>{t.needs_page.urgency} : {data.urgency}/5</span>
          </div>
        </div>
      </div>

      {/* --- Pied de carte (Bouton Action) --- */}
      <div className="p-4 border-t border-slate-50 bg-slate-50/50 group-hover:bg-white transition-colors">
        <button className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl shadow-md shadow-amber-500/20 transition-all active:scale-95">
          <Phone size={18} />
          <span>{t.needs_page.contact_btn} {data.contactName}</span>
        </button>
      </div>
    </div>
  );
}
