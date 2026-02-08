import CreatePostBox from '../../components/features/community/CreatePostBox';
import { Users, Info } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-slate-100/50 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6">
        
        {/* --- COLONNE GAUCHE (Infos Communauté) --- */}
        <div className="hidden md:block w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Users className="text-[#0f4c81]" />
              Communauté
            </h2>
            <p className="text-slate-500 text-sm mb-4">
              Bienvenue dans l'espace "9asrawa". Partagez des nouvelles, des photos de solidarité ou des informations utiles pour la ville.
            </p>
            <div className="p-3 bg-blue-50 rounded-xl text-blue-800 text-sm font-medium flex items-start gap-2">
              <Info size={16} className="mt-0.5 shrink-0" />
              <span>Restez respectueux et vérifiez vos informations avant de publier.</span>
            </div>
          </div>
        </div>

        {/* --- COLONNE CENTRALE (Le Flux) --- */}
        <div className="flex-1 max-w-2xl">
          
          {/* 1. LA BOÎTE DE CRÉATION DE POST (Celle que tu voulais) */}
          <CreatePostBox />

          {/* 2. Exemple de Post Existant (Juste pour la démo visuelle) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">A</div>
              <div>
                <h3 className="font-bold text-slate-900">Ahmed El Kasri</h3>
                <span className="text-xs text-slate-400">Il y a 2 heures</span>
              </div>
            </div>
            <p className="text-slate-700 mb-3">
              L'eau commence à descendre près du vieux pont. Merci aux bénévoles qui ont distribué de l'eau ce matin ! 🙏❤️ #Ksar_Solidaire
            </p>
            <div className="h-64 bg-slate-200 rounded-xl w-full mb-3 flex items-center justify-center text-slate-400">
              [Image du pont]
            </div>
          </div>

        </div>

        {/* --- COLONNE DROITE (Trending / Vide pour l'instant) --- */}
        <div className="hidden lg:block w-72 flex-shrink-0">
           {/* Espace pour les sujets tendances ou les numéros d'urgence */}
        </div>

      </div>
    </div>
  );
}