'use client';

import { useState } from 'react';
import { useTranslations } from '@/lib/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MessageCircle, Phone, Mail, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  const { t } = useTranslations();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems = [
    {
      question: t('faq.questions.location.question'),
      answer: t('faq.questions.location.answer'),
    },
    {
      question: t('faq.questions.insurance.question'),
      answer: t('faq.questions.insurance.answer'),
    },
    {
      question: t('faq.questions.driver.question'),
      answer: t('faq.questions.driver.answer'),
    },
    {
      question: t('faq.questions.moving.question'),
      answer: t('faq.questions.moving.answer'),
    },
    {
      question: t('faq.questions.cancellation.question'),
      answer: t('faq.questions.cancellation.answer'),
    },
    {
      question: t('faq.questions.delivery.question'),
      answer: t('faq.questions.delivery.answer'),
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const contactMethods = [
    {
      icon: Phone,
      title: t('faq.contact.phone.title'),
      description: t('faq.contact.phone.description'),
      action: t('faq.contact.phone.action'),
      href: 'tel:+494012345678',
      color: 'text-accent',
    },
    {
      icon: Mail,
      title: t('faq.contact.email.title'),
      description: t('faq.contact.email.description'),
      action: t('faq.contact.email.action'),
      href: 'mailto:info@hansehaul.de',
      color: 'text-accent',
    },
    {
      icon: MessageCircle,
      title: t('faq.contact.chat.title'),
      description: t('faq.contact.chat.description'),
      action: t('faq.contact.chat.action'),
      href: '/contact',
      color: 'text-accent',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6">
              <HelpCircle className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-text mb-6">
              {t('faq.title')}
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background-secondary rounded-2xl overflow-hidden border border-background-tertiary/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-background-tertiary/50 transition-all duration-300 group"
                >
                  <span className="text-lg font-semibold text-text group-hover:text-accent transition-colors">
                    {item.question}
                  </span>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-accent font-medium">
                      {openItems.includes(index) ? 'Hide' : 'Show'}
                    </span>
                    {openItems.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-accent transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-text-secondary group-hover:text-accent transition-all duration-300" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {openItems.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-background-tertiary/30"
                    >
                      <div className="px-8 py-6 bg-background/50">
                        <p className="text-text-secondary leading-relaxed text-base">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
              {t('faq.contact.title')}
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              {t('faq.contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-background rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-background-tertiary/50 hover:border-accent/30"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6">
                  <method.icon className={`w-10 h-10 ${method.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-text mb-3">{method.title}</h3>
                <p className="text-text-secondary mb-6 leading-relaxed">{method.description}</p>
                                  <a
                    href={method.href}
                    className="inline-flex items-center px-6 py-3 bg-text text-background rounded-lg hover:bg-text-secondary transition-all duration-300 font-medium hover:shadow-lg"
                  >
                    {method.action}
                  </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Help */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-6">
              {t('faq.help.title')}
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              {t('faq.help.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-text text-background font-semibold rounded-lg hover:bg-text-secondary transition-all duration-300 hover:shadow-lg"
              >
                {t('faq.help.contactButton')}
              </Link>
              <Link
                href="/transporters"
                className="px-8 py-4 bg-background-secondary text-text font-semibold rounded-lg hover:bg-background-tertiary transition-all duration-300 border border-background-tertiary hover:border-accent/30"
              >
                {t('faq.help.browseButton')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
