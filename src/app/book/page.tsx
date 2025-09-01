'use client';

import { useTranslations } from '@/lib/translations';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, Calendar, MapPin, Users, Shield, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function BookPage() {
  const { t } = useTranslations();
  const searchParams = useSearchParams();
  const [selectedVan, setSelectedVan] = useState('sprinter');
  const [selectedDuration, setSelectedDuration] = useState('daily');
  const [selectedInsurance, setSelectedInsurance] = useState('basic');
  const [selectedDriver, setSelectedDriver] = useState(false);
  const [selectedHelpers, setSelectedHelpers] = useState(0);
  const [carouselState, setCarouselState] = useState(0);

  const updateCarousel = (newIndex: number) => {
    setCarouselState(newIndex);
  };

  // Handle URL parameter for preselected van
  useEffect(() => {
    const vanParam = searchParams.get('van');
    if (vanParam && ['sprinter', 'vito', 'vclass'].includes(vanParam)) {
      setSelectedVan(vanParam);
    }
  }, [searchParams]);

  const vans = [
    {
      id: 'sprinter',
      name: 'Mercedes Sprinter',
      model: 'Premium Van',
      images: [
        'https://megamobil-wohnmobile.de/wp-content/uploads/11-9.webp',
        'https://picsum.photos/1200/800?random=201',
        'https://picsum.photos/1200/800?random=202',
        'https://picsum.photos/1200/800?random=203'
      ],
      price: '€85',
      period: '/h',
      features: ['Electric', '9 Seats', 'Premium Interior', 'Panoramic Roof'],
      specs: {
        range: '400 km',
        capacity: '9 passengers',
        power: '150 kW',
        features: ['Climate Control', 'Premium Audio', 'Navigation', 'Parking Sensors']
      }
    },
    {
      id: 'vito',
      name: 'Mercedes Vito',
      model: 'Luxury Van',
      images: [
        'https://picsum.photos/1200/800?random=102',
        'https://picsum.photos/1200/800?random=204',
        'https://picsum.photos/1200/800?random=205',
        'https://picsum.photos/1200/800?random=206'
      ],
      price: '€95',
      period: '/h',
      features: ['Hybrid', '8 Seats', 'Panoramic Roof', 'Massage Seats'],
      specs: {
        range: '600 km',
        capacity: '8 passengers',
        power: '120 kW',
        features: ['Heated Seats', 'Premium Audio', '360° Camera', 'Adaptive Cruise']
      }
    },
    {
      id: 'vclass',
      name: 'Mercedes V-Class',
      model: 'Executive Van',
      images: [
        'https://picsum.photos/1200/800?random=103',
        'https://picsum.photos/1200/800?random=207',
        'https://picsum.photos/1200/800?random=208',
        'https://picsum.photos/1200/800?random=209'
      ],
      price: '€120',
      period: '/h',
      features: ['Electric', '7 Seats', 'Massage Seats', 'Executive Interior'],
      specs: {
        range: '450 km',
        capacity: '7 passengers',
        power: '180 kW',
        features: ['Executive Seats', 'Premium Audio', 'Ambient Lighting', 'Wireless Charging']
      }
    }
  ];

  const durationOptions = [
    { id: 'hourly', label: t('book.duration.hourly'), price: t('book.duration.hourlyPrice'), description: t('book.duration.hourlyDescription') },
    { id: 'daily', label: t('book.duration.daily'), price: t('book.duration.dailyPrice'), description: t('book.duration.dailyDescription') },
    { id: 'weekly', label: t('book.duration.weekly'), price: t('book.duration.weeklyPrice'), description: t('book.duration.weeklyDescription') }
  ];

  const insuranceOptions = [
    { id: 'basic', label: t('book.insurance.basic.label'), price: t('book.insurance.basic.price'), period: t('book.insurance.basic.period'), description: t('book.insurance.basic.description') },
    { id: 'premium', label: t('book.insurance.premium.label'), price: t('book.insurance.premium.price'), period: t('book.insurance.premium.period'), description: t('book.insurance.premium.description') },
    { id: 'full', label: t('book.insurance.full.label'), price: t('book.insurance.full.price'), period: t('book.insurance.full.period'), description: t('book.insurance.full.description') }
  ];

  const selectedVanData = vans.find(van => van.id === selectedVan);
  const selectedDurationData = durationOptions.find(d => d.id === selectedDuration);
  const selectedInsuranceData = insuranceOptions.find(i => i.id === selectedInsurance);

  // Calculate total price
  const basePrice = selectedVanData ? parseInt(selectedVanData.price.replace('€', '')) : 85;
  const durationMultiplier = selectedDuration === 'hourly' ? 1 : selectedDuration === 'daily' ? 24 : 168;
  const insuranceCost = selectedInsuranceData ? parseInt(selectedInsuranceData.price.replace('€', '')) : 15;
  const driverCost = selectedDriver ? 25 : 0;
  const helpersCost = selectedHelpers * 10;
  
  const totalPrice = (basePrice * durationMultiplier) + insuranceCost + driverCost + helpersCost;

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Header - Tesla Style */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text mb-6">
              {t('book.title')}
            </h1>
            <p className="text-xl lg:text-2xl text-text-secondary max-w-4xl mx-auto font-light">
              {t('book.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Configuration - Tesla Style */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Side - Van Display */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="sticky top-8"
              >
                <div className="relative h-96 lg:h-[500px] overflow-hidden bg-background-secondary rounded-lg">
                  {/* Carousel Images */}
                  <div className="relative w-full h-full">
                    {selectedVanData?.images.map((image, imageIndex) => (
                      <motion.div
                        key={imageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: imageIndex === carouselState ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        className={`absolute inset-0 ${imageIndex === carouselState ? 'z-10' : 'z-0'}`}
                      >
                        <Image
                          src={image}
                          alt={`${selectedVanData?.name} - Image ${imageIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Carousel Navigation */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4 z-20">
                    <button
                      onClick={() => {
                        const currentIndex = carouselState;
                        const prevIndex = currentIndex <= 0 ? (selectedVanData?.images.length || 1) - 1 : currentIndex - 1;
                        updateCarousel(prevIndex);
                      }}
                      className="w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-text hover:bg-background transition-all duration-300 hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => {
                        const currentIndex = carouselState;
                        const nextIndex = currentIndex >= (selectedVanData?.images.length || 1) - 1 ? 0 : currentIndex + 1;
                        updateCarousel(nextIndex);
                      }}
                      className="w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-text hover:bg-background transition-all duration-300 hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {selectedVanData?.images.map((_, imageIndex) => (
                      <button
                        key={imageIndex}
                        onClick={() => updateCarousel(imageIndex)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          imageIndex === carouselState ? 'bg-accent' : 'bg-background/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Van Specs */}
                <div className="mt-8 bg-background-secondary p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-text mb-4">{selectedVanData?.name}</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-text">{selectedVanData?.specs.range}</div>
                      <div className="text-sm text-text-secondary">{t('book.specs.range')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-text">{selectedVanData?.specs.capacity}</div>
                      <div className="text-sm text-text-secondary">{t('book.specs.capacity')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-text">{selectedVanData?.specs.power}</div>
                      <div className="text-sm text-text-secondary">{t('book.specs.power')}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedVanData?.specs.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-background-tertiary text-text-secondary text-sm rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Configuration Panel */}
            <div className="space-y-8">
              {/* Van Selection */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="bg-background-secondary p-6 rounded-lg"
              >
                <h3 className="text-2xl font-bold text-text mb-6">{t('book.vanSelection.title')}</h3>
                <div className="space-y-4">
                  {vans.map((van) => (
                    <label
                      key={van.id}
                      className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedVan === van.id
                          ? 'border-text bg-background-tertiary'
                          : 'border-background-tertiary hover:border-text'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <input
                          type="radio"
                          name="van"
                          value={van.id}
                          checked={selectedVan === van.id}
                          onChange={(e) => setSelectedVan(e.target.value)}
                          className="w-5 h-5 text-accent"
                        />
                        <div>
                          <div className="font-semibold text-text">{van.name}</div>
                          <div className="text-text-secondary">{van.model}</div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {van.features.map((feature, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-background-tertiary text-text-secondary text-xs rounded"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-text">{van.price}</div>
                        <div className="text-sm text-text-secondary">{van.period}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Duration Selection */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-background-secondary p-6 rounded-lg"
              >
                <h3 className="text-2xl font-bold text-text mb-6">{t('book.duration.title')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {durationOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedDuration === option.id
                          ? 'border-text bg-background-tertiary'
                          : 'border-background-tertiary hover:border-text'
                      }`}
                    >
                      <input
                        type="radio"
                        name="duration"
                        value={option.id}
                        checked={selectedDuration === option.id}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                        className="w-5 h-5 text-accent mb-3"
                      />
                      <div className="text-center">
                        <div className="font-semibold text-text">{option.label}</div>
                        <div className="text-lg font-bold text-accent mt-1">{option.price}</div>
                        <div className="text-sm text-text-secondary mt-1">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Insurance Selection */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-background-secondary p-6 rounded-lg"
              >
                <h3 className="text-2xl font-bold text-text mb-6">{t('book.insurance.title')}</h3>
                <div className="space-y-4">
                  {insuranceOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedInsurance === option.id
                          ? 'border-text bg-background-tertiary'
                          : 'border-background-tertiary hover:border-text'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <input
                          type="radio"
                          name="insurance"
                          value={option.id}
                          checked={selectedInsurance === option.id}
                          onChange={(e) => setSelectedInsurance(e.target.value)}
                          className="w-5 h-5 text-accent"
                        />
                        <div>
                          <div className="font-semibold text-text">{option.label}</div>
                          <div className="text-text-secondary">{option.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-text">{option.price}</div>
                        <div className="text-sm text-text-secondary">{option.period}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Additional Services */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-background-secondary p-6 rounded-lg"
              >
                <h3 className="text-2xl font-bold text-text mb-6">{t('book.services.title')}</h3>
                
                {/* Driver Service */}
                <div className="flex items-center justify-between p-4 border border-background-tertiary rounded-lg mb-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedDriver}
                      onChange={(e) => setSelectedDriver(e.target.checked)}
                      className="w-5 h-5 text-accent"
                    />
                    <div>
                      <div className="font-semibold text-text">{t('book.services.driver.title')}</div>
                      <div className="text-text-secondary">{t('book.services.driver.description')}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-text">{t('book.services.driver.price')}</div>
                    <div className="text-sm text-text-secondary">{t('book.services.driver.period')}</div>
                  </div>
                </div>

                {/* Moving Helpers */}
                <div className="p-4 border border-background-tertiary rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-semibold text-text">{t('book.services.helper.title')}</div>
                      <div className="text-text-secondary">{t('book.services.helper.description')}</div>
                    </div>
                    <div className="text-right">
                                          <div className="text-xl font-bold text-text">{t('book.services.helper.price')}</div>
                    <div className="text-sm text-text-secondary">{t('book.services.helper.period')}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setSelectedHelpers(Math.max(0, selectedHelpers - 1))}
                      className="w-8 h-8 bg-background-tertiary text-text rounded flex items-center justify-center hover:bg-text hover:text-background transition-colors"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold text-text min-w-[2rem] text-center">
                      {selectedHelpers}
                    </span>
                    <button
                      onClick={() => setSelectedHelpers(selectedHelpers + 1)}
                      className="w-8 h-8 bg-background-tertiary text-text rounded flex items-center justify-center hover:bg-text hover:text-background transition-colors"
                    >
                      +
                    </button>
                    <span className="text-text-secondary ml-2">{t('book.services.helper.label')}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Footer - Tesla Style */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-background-tertiary z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div>
                <div className="text-2xl font-bold text-text">
                  €{totalPrice}
                  <span className="text-lg font-normal text-text-secondary ml-2">
                    {selectedDuration === 'hourly' ? '/hour' : selectedDuration === 'daily' ? '/day' : '/week'}
                  </span>
                </div>
                <div className="text-sm text-text-secondary">{t('book.summary.totalDescription')}</div>
              </div>
              
              {/* Pickup Location */}
              <div className="flex items-center space-x-2 text-text-secondary">
                <MapPin className="w-5 h-5" />
                <span>{t('book.pickup.address')}</span>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button className="px-12 py-4 bg-accent text-background font-semibold rounded-none text-lg hover:bg-accent/90 transition-colors duration-300">
                {t('book.summary.confirm')}
                <ArrowRight className="ml-2 w-5 h-5 inline" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom spacing for fixed footer */}
      <div className="h-32"></div>
    </div>
  );
}
