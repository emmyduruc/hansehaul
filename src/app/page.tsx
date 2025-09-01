'use client';

import { useTranslations } from '@/lib/translations';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Calendar, Car, MapPin, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const { t } = useTranslations();

  const howItWorksSteps = [
    {
      icon: Calendar,
      title: t('home.howItWorks.step1.title'),
      description: t('home.howItWorks.step1.description'),
      step: "01"
    },
    {
      icon: Car,
      title: t('home.howItWorks.step2.title'),
      description: t('home.howItWorks.step2.description'),
      step: "02"
    },
    {
      icon: MapPin,
      title: t('home.howItWorks.step3.title'),
      description: t('home.howItWorks.step3.description'),
      step: "03"
    },
    {
      icon: CheckCircle,
      title: t('home.howItWorks.step4.title'),
      description: t('home.howItWorks.step4.description'),
      step: "04"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Hero Section - Tesla Style */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
                  {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://grechrv.com/wp-content/uploads/2023/10/lusso-top.png"
              alt="Premium Mercedes Van Fleet"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        
        {/* Content - Tesla Style */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl sm:text-7xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-white mb-16 max-w-4xl mx-auto font-light leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            
            {/* Tesla Style Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/transporters"
                  className="inline-flex items-center px-12 py-4 bg-text text-background font-medium rounded-none text-lg hover:bg-text-secondary transition-colors duration-300"
                >
                  {t('home.hero.cta')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/transporters"
                  className="inline-flex items-center px-12 py-4 bg-transparent text-text border-2 border-text rounded-none text-lg hover:bg-text hover:text-background transition-all duration-300"
                >
                  {t('home.hero.secondaryCta')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section - Premium Tesla Style */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-6">
              {t('home.howItWorks.title')}
            </h2>
            <p className="text-xl lg:text-2xl text-text-secondary max-w-4xl mx-auto font-light">
              {t('home.howItWorks.subtitle')}
            </p>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative text-center group"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center text-lg font-bold z-10">
                  {step.step}
                </div>
                
                {/* Icon Container */}
                <div className="relative bg-background-secondary rounded-2xl p-8 pt-16 mb-6 group-hover:shadow-xl transition-all duration-300 min-h-[280px] flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6">
                      <step.icon className="w-10 h-10 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-text mb-4">{step.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Connecting Line (except for last item) */}
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/30 transform -translate-y-1/2 z-0" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Tesla Style CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/transporters"
              className="inline-flex items-center px-12 py-4 bg-text text-background font-medium rounded-none text-lg hover:bg-text-secondary transition-colors duration-300"
            >
              {t('home.howItWorks.cta')}
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Tesla Style CTA Section */}
      <section className="py-24 bg-background-secondary">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-8">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl lg:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto font-light">
              {t('home.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/transporters"
                className="inline-flex items-center px-12 py-4 bg-text text-background font-medium rounded-none text-lg hover:bg-text-secondary transition-colors duration-300"
              >
                {t('home.cta.primaryButton')}
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-12 py-4 bg-transparent text-text border-2 border-text rounded-none text-lg hover:bg-text hover:text-background transition-all duration-300"
              >
                {t('home.cta.secondaryButton')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
