'use client';

import { useTranslations } from '@/lib/translations';
import { motion } from 'framer-motion';
import { MapPin, Car, Clock, Phone } from 'lucide-react';
import Link from 'next/link';
import { mockService } from '@/lib/mock.service';

export default function RentalsPage() {
  const { t } = useTranslations();
  const districts = mockService.getDistricts();

  const services = [
    {
      icon: Car,
      title: t('rentals.services.van.title'),
      description: t('rentals.services.van.description'),
      color: 'text-primary',
    },
    {
      icon: Clock,
      title: t('rentals.services.delivery.title'),
      description: t('rentals.services.delivery.description'),
      color: 'text-accent-success',
    },
    {
      icon: Phone,
      title: t('rentals.services.support.title'),
      description: t('rentals.services.support.description'),
      color: 'text-secondary',
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
            <h1 className="text-4xl sm:text-5xl font-bold text-text mb-6">
              {t('rentals.title')}
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              {t('rentals.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-background-secondary rounded-lg p-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-background-tertiary rounded-full mb-6">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-text mb-4">
              {t('rentals.location.title')}
            </h2>
            <p className="text-text-secondary mb-4">
              {t('rentals.location.address')}
            </p>
            <p className="text-text-secondary">
              {t('rentals.location.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
              {t('rentals.districts.title')}
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              {t('rentals.districts.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {districts.map((district, index) => (
              <motion.div
                key={district.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-background-secondary rounded-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-text">{district.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Car className="w-5 h-5 text-primary" />
                    <span className="text-sm text-text-secondary">{district.vanCount} Vans</span>
                  </div>
                </div>
                <p className="text-text-secondary mb-4">{district.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">
                    {t('rentals.districts.deliveryTime')}: {district.deliveryTime}
                  </span>
                  <Link
                    href={`/rentals/${district.id}`}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
                  >
                    {t('rentals.districts.viewVans')}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
              {t('rentals.services.title')}
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              {t('rentals.services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-background rounded-lg p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-background-tertiary rounded-full mb-4">
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-text mb-3">{service.title}</h3>
                <p className="text-text-secondary">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-6">
              {t('rentals.cta.title')}
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              {t('rentals.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/fleet"
                className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                {t('rentals.cta.browseFleet')}
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-background-secondary text-text font-semibold rounded-lg hover:bg-background-tertiary transition-colors"
              >
                {t('rentals.cta.contactUs')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
