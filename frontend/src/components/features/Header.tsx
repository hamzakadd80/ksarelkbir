'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import {
  Home,
  Map as MapIcon,
  HeartHandshake,
  Gift,
  Users,
  Globe,
  LogIn,
  AlertTriangle,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

// Moved inside component to use translations or passed as props

export default function Header() {
  const { t, language, toggleLanguage, direction } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NAV_ITEMS = [
    { label: t.header.home, href: '/', icon: Home },
    { label: t.header.map, href: '/carte', icon: MapIcon },
    { label: t.header.community, href: '/kasrawa', icon: Users },
    { label: t.header.needs, href: '/besoins', icon: HeartHandshake },
    { label: t.header.offers, href: '/offres', icon: Gift },
  ];
  const [scrolled, setScrolled] = useState(false);

  // Détection du scroll pour ajouter une ombre
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu au changement de page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* --- BANDEAU D'URGENCE --- */}
      {/* Séparé du header sticky pour qu'il puisse disparaître au scroll si on veut, 
          ou rester au dessus. Ici on le laisse au dessus du sticky. */}
      <div className="bg-red-600 text-white py-2 px-4 flex justify-center items-center gap-3 text-xs md:text-sm font-bold text-center relative z-[60]" dir={direction}>
        <span className="animate-pulse bg-white/20 p-1 rounded-full">
          <AlertTriangle className="h-4 w-4" />
        </span>
        <span>{t.header.emergency}</span>
      </div>

      <header
        className={`
          sticky top-0 z-50 w-full transition-all duration-300 font-sans
          ${scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-md border-b border-slate-200/50'
            : 'bg-white border-b border-slate-100'
          }
        `}
        dir={direction}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* 1. LOGO (Amélioré) */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="bg-[#0f4c81] text-white h-10 w-10 md:h-11 md:w-11 rounded-xl flex items-center justify-center font-bold text-xl relative shadow-sm transition-transform group-hover:scale-105 duration-300">
                  K
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-slate-900 tracking-tight">{t.header.brand_line1}</span>
                <span className="text-lg font-bold text-[#0f4c81]">{t.header.brand_line2}</span>
              </div>
            </Link>

            {/* 2. NAVIGATION DESKTOP (Style Moderne) */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-50/50 p-1.5 rounded-full border border-slate-100">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                      ${isActive
                        ? 'bg-white text-[#0f4c81] shadow-sm ring-1 ring-slate-200'
                        : 'text-slate-500 hover:text-[#0f4c81] hover:bg-white/60'
                      }
                    `}
                  >
                    <Icon size={18} className={isActive ? "stroke-[2.5px]" : "stroke-[2px]"} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* 3. ACTIONS (Langue + Connexion) */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium"
              >
                <Globe size={18} />
                <span>{language === 'ar' ? 'Français' : 'العربية'}</span>
              </button>

              <Link
                href="/login"
                className="bg-[#0f4c81] hover:bg-blue-800 text-white pl-5 pr-4 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-all shadow-sm hover:shadow-blue-900/20 hover:shadow-lg active:scale-95"
              >
                <span>{t.header.login}</span>
                <div className="bg-white/20 rounded-full p-1">
                  <LogIn size={14} />
                </div>
              </Link>
            </div>

            {/* 4. BOUTON MENU MOBILE */}
            <button
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* --- MENU MOBILE (OVERLAY MODERNE) --- */}
      <div
        className={`
          fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
        dir={direction}
      >
        {/* Fond sombre flouté */}
        <div
          className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Panneau latéral */}
        <div className={`
          absolute top-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl flex flex-col pt-24 px-6 gap-6 transition-transform duration-300 ease-out
          ${direction === 'rtl'
            ? (isMenuOpen ? 'left-0 translate-x-0' : 'left-0 -translate-x-full')
            : (isMenuOpen ? 'right-0 translate-x-0' : 'right-0 translate-x-full')}
        `}>

          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center justify-between p-4 rounded-2xl transition-all
                    ${isActive
                      ? 'bg-blue-50 text-[#0f4c81] font-bold ring-1 ring-blue-100'
                      : 'text-slate-600 font-medium hover:bg-slate-50'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <Icon size={22} />
                    <span className="text-lg">{item.label}</span>
                  </div>
                  {isActive && (direction === 'rtl' ? <ChevronRight size={18} className="rotate-180" /> : <ChevronRight size={18} />)}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto mb-8 flex flex-col gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center gap-2 w-full py-3 border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-colors"
            >
              <Globe size={20} />
              <span>{language === 'ar' ? 'Changer la langue (Français)' : 'تغيير اللغة (العربية)'}</span>
            </button>

            <Link
              href="/login"
              className="flex items-center justify-center gap-3 w-full py-4 bg-[#0f4c81] text-white rounded-xl font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
            >
              <span>{t.header.login_signup}</span>
              <LogIn size={20} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}