'use client';

import { useTranslations } from '@/lib/translations';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Zap, Users, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TransportersPage() {
  const { t } = useTranslations();
  const router = useRouter();
  const [carouselStates, setCarouselStates] = useState<{ [key: string]: number }>({});

  const updateCarousel = (transporterId: string, newIndex: number) => {
    setCarouselStates(prev => ({
      ...prev,
      [transporterId]: newIndex
    }));
  };

  const transporters = [
    {
      id: 'sprinter',
      name: 'Mercedes Sprinter',
      model: 'Premium Van',
      tagline: 'The Ultimate Electric Van Experience',
      images: [
        'https://megamobil-wohnmobile.de/wp-content/uploads/11-9.webp',
        'https://picsum.photos/1200/800?random=201',
        'https://picsum.photos/1200/800?random=202',
        'https://picsum.photos/1200/800?random=203'
      ],
      price: '€85',
      period: '/h',
      rating: 4.9,
      reviews: 127,
      features: ['Electric', '9 Seats', 'Premium Interior', 'Panoramic Roof'],
      specs: {
        range: '400 km',
        capacity: '9 passengers',
        power: '150 kW',
        acceleration: '0-100 km/h in 8.5s',
        topSpeed: '160 km/h'
      },
      highlights: [
        'Zero emissions electric powertrain',
        'Premium leather interior with massage seats',
        'Advanced driver assistance systems',
        'Panoramic glass roof with ambient lighting'
      ]
    },
    {
      id: 'vito',
      name: 'Mercedes Vito',
      model: 'Luxury Van',
      tagline: 'Luxury Meets Performance',
      images: [
        'https://picsum.photos/1200/800?random=102',
        'https://picsum.photos/1200/800?random=204',
        'https://picsum.photos/1200/800?random=205',
        'https://picsum.photos/1200/800?random=206'
      ],
      price: '€95',
      period: '/h',
      rating: 4.8,
      reviews: 89,
      features: ['Hybrid', '8 Seats', 'Panoramic Roof', 'Massage Seats'],
      specs: {
        range: '600 km',
        capacity: '8 passengers',
        power: '120 kW',
        acceleration: '0-100 km/h in 9.2s',
        topSpeed: '180 km/h'
      },
      highlights: [
        'Hybrid powertrain for efficiency',
        'Executive seating with massage function',
        '360° camera system',
        'Adaptive cruise control'
      ]
    },
    {
      id: 'vclass',
      name: 'Mercedes V-Class',
      model: 'Executive Van',
      tagline: 'Executive Transportation Redefined',
      images: [
        'https://picsum.photos/1200/800?random=103',
        'https://picsum.photos/1200/800?random=207',
        'https://picsum.photos/1200/800?random=208',
        'https://picsum.photos/1200/800?random=209'
      ],
      price: '€120',
      period: '/h',
      rating: 5.0,
      reviews: 156,
      features: ['Electric', '7 Seats', 'Massage Seats', 'Executive Interior'],
      specs: {
        range: '450 km',
        capacity: '7 passengers',
        power: '180 kW',
        acceleration: '0-100 km/h in 7.8s',
        topSpeed: '200 km/h'
      },
      highlights: [
        'Pure electric performance',
        'Executive lounge seating',
        'Ambient mood lighting',
        'Wireless charging throughout'
      ]
    }
  ];

  const handleVanSelect = (vanId: string) => {
    router.push(`/book?van=${vanId}`);
  };

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Hero Section - Tesla Style */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://img.sixt.com/1200/67260173-58b5-4895-8f43-9d800bd063cc.jpg"
            alt="Premium Mercedes Van Fleet"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight">
              {t('transporters.hero.title')}
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-white mb-12 max-w-4xl mx-auto font-light leading-relaxed">
              {t('transporters.hero.subtitle')}
            </p>
            
            {/* Tesla Style CTA */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => document.getElementById('transporters-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-12 py-4 bg-text text-background font-medium rounded-none text-lg hover:bg-text-secondary transition-colors duration-300"
              >
                {t('transporters.hero.cta')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Transporters Grid - Tesla Style */}
      <section id="transporters-grid" className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-6">
              {t('transporters.grid.title')}
            </h2>
            <p className="text-xl lg:text-2xl text-text-secondary max-w-4xl mx-auto font-light">
              {t('transporters.grid.subtitle')}
            </p>
          </motion.div>

          <div className="space-y-32">
            {transporters.map((transporter, index) => (
              <motion.div
                key={transporter.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Image Section */}
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden rounded-2xl bg-background-secondary"
                  >
                    <div className="relative h-96 lg:h-[600px] overflow-hidden">
                      {/* Carousel Images */}
                      <div className="relative w-full h-full">
                        {transporter.images.map((image, imageIndex) => (
                          <motion.div
                            key={imageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: imageIndex === (carouselStates[transporter.id] || 0) ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                            className={`absolute inset-0 ${imageIndex === (carouselStates[transporter.id] || 0) ? 'z-10' : 'z-0'}`}
                          >
                            <Image
                              src={image}
                              alt={`${transporter.name} - Image ${imageIndex + 1}`}
                              fill
                              className="object-cover"
                            />
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Rating Badge */}
                      <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2 z-20">
                        <Star className="w-5 h-5 text-accent fill-current" />
                        <span className="font-semibold text-text">{transporter.rating}</span>
                        <span className="text-sm text-text-secondary">({transporter.reviews})</span>
                      </div>

                      {/* Carousel Navigation */}
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4 z-20">
                        <button
                          onClick={() => {
                            const currentIndex = carouselStates[transporter.id] || 0;
                            const prevIndex = currentIndex <= 0 ? transporter.images.length - 1 : currentIndex - 1;
                            updateCarousel(transporter.id, prevIndex);
                          }}
                          className="w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-text hover:bg-background transition-all duration-300 hover:scale-110"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => {
                            const currentIndex = carouselStates[transporter.id] || 0;
                            const nextIndex = currentIndex >= transporter.images.length - 1 ? 0 : currentIndex + 1;
                            updateCarousel(transporter.id, nextIndex);
                          }}
                          className="w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-text hover:bg-background transition-all duration-300 hover:scale-110"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </div>

                      {/* Image Indicators */}
                      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                        {transporter.images.map((_, imageIndex) => (
                          <button
                            key={imageIndex}
                            onClick={() => updateCarousel(transporter.id, imageIndex)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              imageIndex === (carouselStates[transporter.id] || 0) ? 'bg-accent' : 'bg-background/60'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 1 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="mb-6">
                      <h3 className="text-4xl sm:text-5xl font-bold text-text mb-4">
                        {transporter.name}
                      </h3>
                      <p className="text-xl text-text-secondary mb-2">{transporter.model}</p>
                      <p className="text-lg text-accent font-medium">{transporter.tagline}</p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="text-center p-4 bg-background-secondary rounded-lg">
                        <div className="text-2xl font-bold text-text">{transporter.specs.range}</div>
                        <div className="text-sm text-text-secondary">{t('transporters.specs.range')}</div>
                      </div>
                      <div className="text-center p-4 bg-background-secondary rounded-lg">
                        <div className="text-2xl font-bold text-text">{transporter.specs.capacity}</div>
                        <div className="text-sm text-text-secondary">{t('transporters.specs.capacity')}</div>
                      </div>
                      <div className="text-center p-4 bg-background-secondary rounded-lg">
                        <div className="text-2xl font-bold text-text">{transporter.specs.power}</div>
                        <div className="text-sm text-text-secondary">{t('transporters.specs.power')}</div>
                      </div>
                      <div className="text-center p-4 bg-background-secondary rounded-lg">
                        <div className="text-2xl font-bold text-text">{transporter.specs.acceleration}</div>
                        <div className="text-sm text-text-secondary">{t('transporters.specs.acceleration')}</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-text mb-4">{t('transporters.sections.keyFeatures')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {transporter.features.map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="px-3 py-1 bg-background-tertiary text-text-secondary text-sm rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-text mb-4">{t('transporters.sections.highlights')}</h4>
                      <ul className="space-y-2">
                        {transporter.highlights.map((highlight, highlightIndex) => (
                          <li key={highlightIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-text-secondary">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={() => handleVanSelect(transporter.id)}
                        className="w-full px-8 py-4 bg-text text-background font-semibold rounded-none text-lg hover:bg-text-secondary transition-colors duration-300"
                      >
                        {t('transporters.cta.bookVan')}
                        <ArrowRight className="ml-2 w-5 h-5 inline" />
                      </button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tesla Style CTA Section */}
      <section className="py-32 bg-background-secondary">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-8">
              {t('transporters.footer.title')}
            </h2>
            <p className="text-xl lg:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto font-light">
              {t('transporters.footer.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/book"
                className="inline-flex items-center px-12 py-4 bg-text text-background font-medium rounded-none text-lg hover:bg-text-secondary transition-colors duration-300"
              >
                {t('transporters.cta.bookNow')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-12 py-4 bg-transparent text-text border-2 border-text rounded-none text-lg hover:bg-text hover:text-background transition-all duration-300"
              >
                {t('transporters.cta.contactUs')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
