import { faker } from '@faker-js/faker';

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  year: number;
  capacity: number;
  fuelType: 'electric' | 'hybrid' | 'diesel';
  transmission: 'automatic' | 'manual';
  features: string[];
  images: string[];
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  description: string;
  specifications: {
    length: number;
    width: number;
    height: number;
    weight: number;
    engine: string;
    power: string;
    range: number;
  };
  availability: boolean;
  location: string;
  pickupAddress: string;
}

export interface InsuranceOption {
  id: string;
  name: string;
  description: string;
  dailyRate: number;
  coverage: string[];
}

export interface DriverOption {
  id: string;
  name: string;
  description: string;
  hourlyRate: number;
  dailyRate: number;
}

export interface HelperOption {
  id: string;
  name: string;
  description: string;
  hourlyRate: number;
  dailyRate: number;
  maxPeople: number;
}

export interface Booking {
  id: string;
  vehicleId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: Date;
  endDate: Date;
  pickupLocation: string;
  returnLocation: string;
  totalHours: number;
  totalDays: number;
  basePrice: number;
  insurancePrice: number;
  driverPrice: number;
  helperPrice: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  insuranceOption?: InsuranceOption;
  driverOption?: DriverOption;
  helperOption?: HelperOption;
  createdAt: Date;
}

export interface District {
  id: string;
  name: string;
  description: string;
  image: string;
  vanCount: number;
}

class MockService {
  private vehicles: Vehicle[] = [];
  private insuranceOptions: InsuranceOption[] = [];
  private driverOptions: DriverOption[] = [];
  private helperOptions: HelperOption[] = [];
  private districts: District[] = [];

  constructor() {
    this.generateData();
  }

  private generateData() {
    // Generate insurance options
    this.insuranceOptions = [
      {
        id: 'basic',
        name: 'Basic Insurance',
        description: 'Standard coverage for minor damages',
        dailyRate: 15,
        coverage: ['Minor scratches', 'Basic liability', 'Theft protection']
      },
      {
        id: 'premium',
        name: 'Premium Insurance',
        description: 'Comprehensive coverage for all damages',
        dailyRate: 25,
        coverage: ['Full damage coverage', 'Liability insurance', 'Theft protection', 'Roadside assistance']
      },
      {
        id: 'luxury',
        name: 'Luxury Insurance',
        description: 'Premium coverage with zero deductible',
        dailyRate: 35,
        coverage: ['Zero deductible', 'Full coverage', 'Premium roadside assistance', 'Replacement vehicle']
      }
    ];

    // Generate driver options
    this.driverOptions = [
      {
        id: 'professional',
        name: 'Professional Driver',
        description: 'Experienced driver for safe transportation',
        hourlyRate: 25,
        dailyRate: 200
      },
      {
        id: 'premium',
        name: 'Premium Driver',
        description: 'Professional driver with luxury vehicle experience',
        hourlyRate: 35,
        dailyRate: 280
      }
    ];

    // Generate helper options
    this.helperOptions = [
      {
        id: 'basic-helper',
        name: 'Basic Helper',
        description: 'One person to assist with loading/unloading',
        hourlyRate: 15,
        dailyRate: 120,
        maxPeople: 1
      },
      {
        id: 'team-helper',
        name: 'Helper Team',
        description: 'Two people to assist with moving',
        hourlyRate: 25,
        dailyRate: 200,
        maxPeople: 2
      },
      {
        id: 'premium-team',
        name: 'Premium Team',
        description: 'Three people for complex moves',
        hourlyRate: 35,
        dailyRate: 280,
        maxPeople: 3
      }
    ];

    // Generate Hamburg districts
    this.districts = [
      {
        id: 'altstadt',
        name: 'Altstadt',
        description: 'Historic city center with premium van access',
        image: '/images/districts/altstadt.jpg',
        vanCount: 8
      },
      {
        id: 'neustadt',
        name: 'Neustadt',
        description: 'Modern district with excellent van availability',
        image: '/images/districts/neustadt.jpg',
        vanCount: 12
      },
      {
        id: 'st-pauli',
        name: 'St. Pauli',
        description: 'Vibrant district with flexible van options',
        image: '/images/districts/st-pauli.jpg',
        vanCount: 6
      },
      {
        id: 'altona',
        name: 'Altona',
        description: 'Residential area with reliable van service',
        image: '/images/districts/altona.jpg',
        vanCount: 10
      },
      {
        id: 'eimsbuettel',
        name: 'Eimsbüttel',
        description: 'Family-friendly district with spacious vans',
        image: '/images/districts/eimsbuettel.jpg',
        vanCount: 7
      }
    ];

    // Generate vehicles
    const vanModels = [
      'Mercedes Sprinter',
      'Volkswagen Crafter',
      'Ford Transit',
      'Fiat Ducato',
      'Peugeot Boxer',
      'Renault Master',
      'Iveco Daily',
      'Opel Movano'
    ];

    const vanNames = [
      'Premium Cargo Elite',
      'Luxury Transport Pro',
      'Executive Van Deluxe',
      'Premium Hauler Plus',
      'Luxury Cargo Master',
      'Executive Transport Elite',
      'Premium Van Supreme',
      'Luxury Hauler Pro'
    ];

    for (let i = 0; i < 20; i++) {
          const model = faker.helpers.arrayElement(vanModels);
    const name = faker.helpers.arrayElement(vanNames);
    const fuelType = faker.helpers.arrayElement(['electric', 'hybrid', 'diesel']) as 'electric' | 'hybrid' | 'diesel';
    const transmission = faker.helpers.arrayElement(['automatic', 'manual']) as 'automatic' | 'manual';
      
      this.vehicles.push({
              id: faker.string.uuid(),
      name: `${name} ${faker.number.int({ min: 2020, max: 2024 })}`,
      model,
      year: faker.number.int({ min: 2020, max: 2024 }),
      capacity: faker.number.int({ min: 3, max: 9 }),
        fuelType,
        transmission,
        features: this.generateFeatures(),
        images: this.generateImages(),
        hourlyRate: faker.number.int({ min: 25, max: 45 }),
        dailyRate: faker.number.int({ min: 150, max: 300 }),
        weeklyRate: faker.number.int({ min: 800, max: 1500 }),
        description: faker.lorem.paragraph(),
        specifications: {
          length: faker.number.float({ min: 5, max: 7, precision: 0.1 }),
          width: faker.number.float({ min: 2, max: 2.5, precision: 0.1 }),
          height: faker.number.float({ min: 2.5, max: 3.5, precision: 0.1 }),
          weight: faker.number.int({ min: 2000, max: 3500 }),
          engine: `${faker.number.float({ min: 2.0, max: 3.0, precision: 0.1 })}L ${fuelType}`,
          power: `${faker.number.int({ min: 120, max: 200 })} kW`,
          range: fuelType === 'electric' ? faker.number.int({ min: 300, max: 500 }) : faker.number.int({ min: 600, max: 1000 })
        },
        availability: faker.datatype.boolean(),
        location: 'Hamburg',
        pickupAddress: 'Olewish 4, 22177 Hamburg'
      });
    }
  }

  private generateFeatures(): string[] {
    const allFeatures = [
      'Climate Control',
      'Bluetooth Audio',
      'GPS Navigation',
      'Backup Camera',
      'Cruise Control',
      'Electric Windows',
      'Central Locking',
      'ABS Brakes',
      'ESP System',
      'Air Conditioning',
      'Premium Sound System',
      'LED Lighting',
      'Power Steering',
      'Traction Control',
      'Hill Start Assist'
    ];
    
    return faker.helpers.arrayElements(allFeatures, faker.number.int({ min: 5, max: 10 }));
  }

  private generateImages(): string[] {
    const imageCount = faker.number.int({ min: 3, max: 6 });
    const images = [];
    
    for (let i = 0; i < imageCount; i++) {
      images.push(`https://picsum.photos/800/600?random=${faker.number.int({ min: 1, max: 1000 })}`);
    }
    
    return images;
  }

  // Public methods
  getVehicles(): Vehicle[] {
    return this.vehicles;
  }

  getVehicleById(id: string): Vehicle | undefined {
    return this.vehicles.find(vehicle => vehicle.id === id);
  }

  getAvailableVehicles(): Vehicle[] {
    return this.vehicles.filter(vehicle => vehicle.availability);
  }

  getInsuranceOptions(): InsuranceOption[] {
    return this.insuranceOptions;
  }

  getDriverOptions(): DriverOption[] {
    return this.driverOptions;
  }

  getHelperOptions(): HelperOption[] {
    return this.helperOptions;
  }

  getDistricts(): District[] {
    return this.districts;
  }

  getDistrictById(id: string): District | undefined {
    return this.districts.find(district => district.id === id);
  }

  calculateBookingPrice(
    vehicleId: string,
    startDate: Date,
    endDate: Date,
    insuranceOptionId?: string,
    driverOptionId?: string,
    helperOptionId?: string
  ): {
    basePrice: number;
    insurancePrice: number;
    driverPrice: number;
    helperPrice: number;
    totalPrice: number;
    totalHours: number;
    totalDays: number;
  } {
    const vehicle = this.getVehicleById(vehicleId);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    const hoursDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    const daysDiff = Math.ceil(hoursDiff / 24);
    
    const totalHours = Math.ceil(hoursDiff);
    const totalDays = daysDiff;

    // Base price calculation
    let basePrice = 0;
    if (totalHours <= 24) {
      basePrice = vehicle.hourlyRate * totalHours;
    } else {
      const dailyRate = Math.min(vehicle.dailyRate, vehicle.hourlyRate * 8); // Daily cap
      basePrice = dailyRate * totalDays;
    }

    // Insurance price
    const insuranceOption = insuranceOptionId 
      ? this.insuranceOptions.find(opt => opt.id === insuranceOptionId)
      : undefined;
    const insurancePrice = insuranceOption ? insuranceOption.dailyRate * totalDays : 0;

    // Driver price
    const driverOption = driverOptionId
      ? this.driverOptions.find(opt => opt.id === driverOptionId)
      : undefined;
    const driverPrice = driverOption ? driverOption.dailyRate * totalDays : 0;

    // Helper price
    const helperOption = helperOptionId
      ? this.helperOptions.find(opt => opt.id === helperOptionId)
      : undefined;
    const helperPrice = helperOption ? helperOption.dailyRate * totalDays : 0;

    const totalPrice = basePrice + insurancePrice + driverPrice + helperPrice;

    return {
      basePrice,
      insurancePrice,
      driverPrice,
      helperPrice,
      totalPrice,
      totalHours,
      totalDays
    };
  }

  createBooking(bookingData: Omit<Booking, 'id' | 'createdAt'>): Booking {
    const booking: Booking = {
      ...bookingData,
              id: faker.string.uuid(),
      createdAt: new Date()
    };
    
    return booking;
  }
}

// Export singleton instance
export const mockService = new MockService();
