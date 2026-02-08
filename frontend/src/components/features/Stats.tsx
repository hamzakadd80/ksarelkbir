import { HandHeart, Gift, ShieldCheck } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      icon: HandHeart,
      value: "127",
      label: "Besoins signalés",
      color: "text-amber-500", // Orange pour l'urgence
    },
    {
      icon: Gift,
      value: "89",
      label: "Offres d'aide",
      color: "text-[#0f4c81]", // Bleu pour la confiance
    },
    {
      icon: ShieldCheck,
      value: "45",
      label: "Personnes en sécurité",
      color: "text-emerald-600", // Vert pour la sécurité
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 relative z-20">
      {/* -mt-10 : Fait remonter les cartes sur la bannière bleue (effet moderne)
         md:-mt-16 : Remonte encore plus sur grand écran
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-10 md:-mt-16">
        
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300"
            >
              {/* Icône */}
              <div className="mb-4">
                <Icon size={48} className={stat.color} strokeWidth={1.5} />
              </div>

              {/* Chiffre */}
              <span className="text-4xl font-extrabold text-slate-800 mb-2 tracking-tight">
                {stat.value}
              </span>

              {/* Libellé */}
              <span className="text-slate-500 font-medium text-lg">
                {stat.label}
              </span>
            </div>
          );
        })}

      </div>
    </section>
  );
}