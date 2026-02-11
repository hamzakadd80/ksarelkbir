'use client';

import { useState, useEffect } from 'react';
import { Heart, Activity } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function SplashWrapper({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        // Simuler un temps de chargement pour l'animation (2.5 secondes)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Écran de Splash */}
            <div
                className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center transition-opacity duration-700 ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="relative flex flex-col items-center">

                    {/* Logo Animé */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
                        <div className="bg-gradient-to-tr from-sky-500 to-blue-600 p-6 rounded-full shadow-xl relative z-10 animate-bounce-slow">
                            <Heart size={48} className="text-white fill-white" />
                        </div>
                    </div>

                    {/* Titre et Sous-titre */}
                    <h1 className="text-3xl font-bold text-slate-900 mb-2 animate-fade-in-up">
                        Ksar <span className="text-sky-600">Entraide</span>
                    </h1>
                    <p className="text-slate-500 text-sm tracking-widest uppercase animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        Solidarité Loukkos
                    </p>

                    {/* Indicateur de chargement */}
                    <div className="mt-8 flex gap-2">
                        <div className="w-2 h-2 bg-sky-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-sky-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-sky-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>

                </div>
            </div>

            {/* Contenu Principal */}
            <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                {children}
            </div>
        </>
    );
}
