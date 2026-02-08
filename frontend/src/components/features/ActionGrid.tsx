import Link from 'next/link';
import { HandHeart, Gift, Users, Map as MapIcon } from 'lucide-react';

const actions = [
  {
    title: "Besoins",
    description: "Consultez les besoins urgents des sinistrés",
    icon: HandHeart,
    href: "/besoins",
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "group-hover:border-amber-200",
    shadow: "group-hover:shadow-amber-100"
  },
  {
    title: "Offres",
    description: "Proposez votre aide ou des dons",
    icon: Gift,
    href: "/offres",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-200",
    shadow: "group-hover:shadow-blue-100"
  },
  {
    title: "Personnes",
    description: "Recherchez ou signalez des personnes",
    icon: Users,
    href: "/personnes",
    color: "text-rose-500",
    bg: "bg-rose-50",
    border: "group-hover:border-rose-200",
    shadow: "group-hover:shadow-rose-100"
  },
  {
    title: "Carte",
    description: "Visualisez les zones et points d'aide",
    icon: MapIcon,
    href: "/carte",
    color: "text-sky-500",
    bg: "bg-sky-50",
    border: "group-hover:border-sky-200",
    shadow: "group-hover:shadow-sky-100"
  }
];

export default function ActionGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <Link 
              key={index} 
              href={action.href}
              className={`
                group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col items-center text-center
                ${action.border} ${action.shadow}
              `}
            >
              {/* Cercle de l'icône */}
              <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${action.bg} ${action.color}`}>
                <Icon size={32} strokeWidth={2} />
              </div>

              {/* Titre */}
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900">
                {action.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 leading-relaxed text-sm">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}