'use client';

import { useState } from 'react';
import { useTranslations } from '@/lib/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { t, locale, setLocale } = useTranslations();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const navigation = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.transporters'), href: '/transporters' },
    { name: t('navigation.book'), href: '/book' },
    { name: t('navigation.faq'), href: '/faq' },
    { name: t('navigation.contact'), href: '/contact' },
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/de' || pathname === '/en';
    }
    return pathname.includes(href);
  };

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-text"
              >
                HanseHaul
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    isActiveRoute(item.href)
                      ? 'text-text'
                      : 'text-text-secondary hover:text-text'
                  }`}
                >
                  {item.name}
                  {isActiveRoute(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-text"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Language Selector */}
            <div className="hidden md:relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text transition-colors"
              >
                <span>{locale.toUpperCase()}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-32 bg-background-secondary border border-background-tertiary rounded-lg shadow-lg"
                  >
                    <button
                      onClick={() => {
                        setLocale('de');
                        setIsLanguageOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                        locale === 'de' 
                          ? 'text-text bg-background-tertiary' 
                          : 'text-text-secondary hover:text-text hover:bg-background-tertiary'
                      }`}
                    >
                      Deutsch
                    </button>
                    <button
                      onClick={() => {
                        setLocale('en');
                        setIsLanguageOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                        locale === 'en' 
                          ? 'text-text bg-background-tertiary' 
                          : 'text-text-secondary hover:text-text hover:bg-background-tertiary'
                      }`}
                    >
                      English
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background-secondary border-t border-background-tertiary"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors ${
                      isActiveRoute(item.href)
                        ? 'text-primary bg-background-tertiary'
                        : 'text-text-secondary hover:text-text hover:bg-background-tertiary'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t border-background-tertiary pt-2 mt-2">
                  <button
                    onClick={() => {
                      setLocale('de');
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors ${
                      locale === 'de' 
                        ? 'text-text bg-background-tertiary' 
                        : 'text-text-secondary hover:text-text hover:bg-background-tertiary'
                    }`}
                  >
                    Deutsch
                  </button>
                  <button
                    onClick={() => {
                      setLocale('en');
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors ${
                      locale === 'en' 
                        ? 'text-text bg-background-tertiary' 
                        : 'text-text-secondary hover:text-text hover:bg-background-tertiary'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-background-secondary border-t border-background-tertiary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold text-text mb-4">HanseHaul Vans</h3>
              <p className="text-text-secondary mb-4">
                Premium van rental service in Hamburg. Experience luxury and comfort with our Tesla-like fleet.
              </p>
              <div className="text-text-secondary">
                <p>Olewish 4, 22177 Hamburg</p>
                <p>+49 40 123 456 789</p>
                <p>info@hansehaul-vans.de</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-text mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-text-secondary hover:text-text transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-text mb-4">Services</h4>
              <ul className="space-y-2 text-text-secondary">
                <li>Van Rental</li>
                <li>Driver Service</li>
                <li>Moving Help</li>
                <li>Insurance</li>
                <li>24/7 Support</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background-tertiary mt-8 pt-8 text-center text-text-secondary">
            <p>&copy; 2024 HanseHaul Vans. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
