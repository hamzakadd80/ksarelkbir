import { MapPin, Clock, Phone, Shirt, Truck, Home, Baby, Box, MoreHorizontal } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

interface OfferProps {
  id: string;
  category: 'Vêtements' | 'Logistique' | 'Logement' | 'Alimentation' | 'Autre';
  title: string;
  description: string;
  quantity?: string;
  location: string;
  timeAgo: string;
  status: string;
  contactName: string;
  contactPhone?: string | null;
}

export default function OfferCard({ data }: { data: OfferProps }) {
  const { t } = useLanguage();

  const getCategoryIcon = (category: string) => {
    if (category.includes('Vêtements') || category === 'VETEMENTS') return <Shirt size={16} />;
    if (category.includes('Santé') || category === 'SANTE') return <Truck size={16} />; // Using Truck for logistics/health transfer if pill not available, or keep Pill if imported
    if (category.includes('Logement') || category === 'LOGEMENT') return <Home size={16} />;
    if (category.includes('Alimentation') || category === 'ALIMENTATION') return <Baby size={16} />; // Baby icon for food/sustenance or Box
    return <Box size={16} />;
  };

  const getTranslatedCategory = (cat: string) => {
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

      {/* En-tête */}
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
            {getCategoryIcon(data.category)}
            {getTranslatedCategory(data.category)}
          </span>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-100">
            {data.status}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
          {data.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
          {data.description}
        </p>

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

      {/* Pied de carte */}
      <div className="p-4 border-t border-slate-50 bg-slate-50/50 group-hover:bg-white transition-colors">
        <button className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-xl shadow-md shadow-sky-500/20 transition-all active:scale-95">
          <Phone size={18} />
          <span>{t.needs_page.contact_btn} {data.contactName}</span>
        </button>
      </div>
    </div>
  );
}