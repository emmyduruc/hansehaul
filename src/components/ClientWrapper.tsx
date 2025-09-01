'use client';

import { ReactNode } from 'react';
import { TranslationProvider } from '@/lib/translations';

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <TranslationProvider>
      {children}
    </TranslationProvider>
  );
}
