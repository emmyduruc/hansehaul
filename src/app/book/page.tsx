'use client';

import { useTranslations } from '@/lib/translations';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, Calendar, MapPin, Users, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function BookPage() {
  const { t } = useTranslations();
  const [selectedVan, setSelectedVan] = useState('sprinter');
  const [selectedDuration, setSelectedDuration] = useState('daily');
  const [selectedInsurance, setSelectedInsurance] = useState('basic');
  const [selectedDriver, setSelectedDriver] = useState(false);
  const [selectedHelpers, setSelectedHelpers] = useState(0);

  const vans = [
    {
      id: 'sprinter',
      name: 'Mercedes Sprinter',
      model: 'Premium Van',
      image: 'https://megamobil-wohnmobile.de/wp-content/uploads/11-9.webp',
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
      image: 'https://picsum.photos/1200/800?random=102',
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
      image: 'https://picsum.photos/1200/800?random=103',
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
    { id: 'hourly', label: 'Hourly', price: '€85-120', description: 'Flexible hourly rental' },
    { id: 'daily', label: 'Daily', price: '€450-600', description: '24-hour rental period' },
    { id: 'weekly', label: 'Weekly', price: '€2,800-3,500', description: '7-day rental period' }
  ];

  const insuranceOptions = [
    { id: 'basic', label: 'Basic Coverage', price: '€15', period: '/day', description: 'Standard protection for your rental' },
    { id: 'premium', label: 'Premium Coverage', price: '€25', period: '/day', description: 'Comprehensive protection with roadside assistance' },
    { id: 'full', label: 'Full Coverage', price: '€35', period: '/day', description: 'Maximum protection including personal items' }
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
              Book Your Premium Van
            </h1>
            <p className="text-xl lg:text-2xl text-text-secondary max-w-4xl mx-auto font-light">
              Configure and book your Mercedes van with premium options
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
                  <Image
                    src={selectedVanData?.image || ''}
                    alt={selectedVanData?.name || 'Premium Van'}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Van Specs */}
                <div className="mt-8 bg-background-secondary p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-text mb-4">{selectedVanData?.name}</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-text">{selectedVanData?.specs.range}</div>
                      <div className="text-sm text-text-secondary">Range</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-text">{selectedVanData?.specs.capacity}</div>
                      <div className="text-sm text-text-secondary">Capacity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-text">{selectedVanData?.specs.power}</div>
                      <div className="text-sm text-text-secondary">Power</div>
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
                <h3 className="text-2xl font-bold text-text mb-6">Select Your Van</h3>
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
                <h3 className="text-2xl font-bold text-text mb-6">Rental Duration</h3>
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
                <h3 className="text-2xl font-bold text-text mb-6">Insurance Options</h3>
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
                <h3 className="text-2xl font-bold text-text mb-6">Additional Services</h3>
                
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
                      <div className="font-semibold text-text">Professional Driver</div>
                      <div className="text-text-secondary">Licensed driver for your convenience</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-text">€25</div>
                    <div className="text-sm text-text-secondary">/hour</div>
                  </div>
                </div>

                {/* Moving Helpers */}
                <div className="p-4 border border-background-tertiary rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-semibold text-text">Moving Helpers</div>
                      <div className="text-text-secondary">Additional assistance for moving tasks</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-text">€10</div>
                      <div className="text-sm text-text-secondary">/person/hour</div>
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
                    <span className="text-text-secondary ml-2">helpers</span>
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
                <div className="text-sm text-text-secondary">Total price with selected options</div>
              </div>
              
              {/* Pickup Location */}
              <div className="flex items-center space-x-2 text-text-secondary">
                <MapPin className="w-5 h-5" />
                <span>Olewish 4, 22177 Hamburg</span>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button className="px-12 py-4 bg-accent text-background font-semibold rounded-none text-lg hover:bg-accent/90 transition-colors duration-300">
                Book Now
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
