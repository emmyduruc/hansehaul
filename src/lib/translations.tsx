'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Import translation files
import deMessages from '../messages/de.json';
import enMessages from '../messages/en.json';

type Locale = 'de' | 'en';
type Messages = typeof deMessages;

interface TranslationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const messages: Record<Locale, Messages> = {
  de: deMessages,
  en: enMessages,
};

// Helper function to get nested object values by dot notation
function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('de');

  const t = (key: string): string => {
    const message = getNestedValue(messages[locale], key);
    return typeof message === 'string' ? message : key;
  };

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslations must be used within a TranslationProvider');
  }
  return context;
}
