'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ar } from '../locales/ar';
import { fr } from '../locales/fr';

type Language = 'ar' | 'fr';
type Translations = typeof ar;

interface LanguageContextType {
    language: Language;
    direction: 'rtl' | 'ltr';
    t: Translations;
    toggleLanguage: () => void;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    // Default to Arabic as requested
    const [language, setLanguageState] = useState<Language>('ar');

    useEffect(() => {
        // Check localStorage on mount
        const savedLang = localStorage.getItem('app-language') as Language;
        if (savedLang && (savedLang === 'ar' || savedLang === 'fr')) {
            setLanguageState(savedLang);
        } else {
            // If no preference, ensure Arabic is default
            setLanguageState('ar');
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('app-language', lang);

        // Update HTML dir attribute for global directionality
        const dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.dir = dir;
        document.documentElement.lang = lang;
    };

    const toggleLanguage = () => {
        setLanguage(language === 'ar' ? 'fr' : 'ar');
    };

    const translations = language === 'ar' ? ar : fr;
    const direction = language === 'ar' ? 'rtl' : 'ltr';

    // Ensure dir is set on initial load/change
    useEffect(() => {
        document.documentElement.dir = direction;
        document.documentElement.lang = language;
    }, [direction, language]);

    return (
        <LanguageContext.Provider value={{ language, direction, t: translations, toggleLanguage, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
