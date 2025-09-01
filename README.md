# HanseHaul Vans - Premium Van Rental Website

A premium Tesla-like van rental website built with Next.js, featuring a modern design, internationalization, and comprehensive booking system.

## 🚀 Features

- **Tesla-like Design**: Modern, premium UI with dark theme and smooth animations
- **Internationalization**: German (default) and English support with next-intl
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Vehicle Fleet**: Comprehensive van listings with detailed specifications
- **Booking System**: Multi-step booking process with insurance, driver, and helper options
- **Location Restriction**: Hamburg-only service with pickup at Olewish 4
- **Mock Data**: Faker.js integration for realistic test data
- **Animations**: Framer Motion for smooth, engaging interactions

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router) + React + TypeScript
- **Styling**: Tailwind CSS + Montserrat Font
- **Animations**: Framer Motion
- **Internationalization**: next-intl
- **Icons**: Lucide React
- **Mock Data**: Faker.js
- **UI Components**: Headless UI + Heroicons

## 🎨 Design System

### Colors
- **Primary**: #0E6FFF (Blue)
- **Secondary**: #C8A962 (Gold)
- **Background**: #0C0F14 (Dark)
- **Background Secondary**: #121723 (Darker)
- **Text**: #F6F7F9 (Light)
- **Text Secondary**: #A0A3A9 (Gray)

### Typography
- **Font**: Montserrat (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Locale-based layout
│   │   ├── page.tsx            # Home page
│   │   ├── fleet/
│   │   │   ├── page.tsx        # Fleet listing
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Vehicle detail
│   │   ├── rentals/
│   │   │   └── page.tsx        # Hamburg districts
│   │   ├── prices/
│   │   │   └── page.tsx        # Pricing information
│   │   ├── faq/
│   │   │   └── page.tsx        # FAQ page
│   │   └── contact/
│   │       └── page.tsx        # Contact page
│   ├── globals.css             # Global styles
│   └── page.tsx                # Root redirect
├── components/
│   └── layout/
│       └── MainLayout.tsx      # Main layout component
├── lib/
│   └── mock.service.ts         # Mock data service
├── messages/
│   ├── de.json                 # German translations
│   └── en.json                 # English translations
├── i18n.ts                     # Internationalization config
└── middleware.ts               # Locale middleware
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.17.0 or higher
- Yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hansehaul
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Run the development server**
   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

## 🌍 Internationalization

The app supports German (default) and English languages:

- **German**: `/de` (default)
- **English**: `/en`

### Adding New Languages

1. Create a new translation file in `src/messages/[locale].json`
2. Add the locale to the `locales` array in `src/i18n.ts` and `src/middleware.ts`
3. Update the language selector in `MainLayout.tsx`

## 📱 Pages Overview

### Home Page (`/`)
- Hero section with Tesla-like design
- Feature highlights
- Fleet preview
- Call-to-action sections

### Fleet (`/fleet`)
- Vehicle grid with filtering
- Search functionality
- Fuel type and transmission filters
- Vehicle cards with pricing

### Vehicle Detail (`/fleet/[id]`)
- Image gallery with navigation
- Detailed specifications
- Feature list
- Booking form with multi-step process

### Rentals (`/rentals`)
- Hamburg districts overview
- Service information
- Pickup location details

### Prices (`/prices`)
- Pricing tiers (Standard, Premium, Luxury)
- Additional services pricing
- Insurance, driver, and helper options
- Booking conditions

### FAQ (`/faq`)
- Expandable questions and answers
- Contact section

### Contact (`/contact`)
- Contact form
- Company information
- Location details

## 🎯 Key Features

### Booking System
- **Step 1**: Date and time selection
- **Step 2**: Additional options (insurance, driver, helper)
- **Step 3**: Contact information
- **Step 4**: Booking summary and confirmation

### Location Restriction
- Service only available in Hamburg
- Central pickup location: Olewish 4, 22177 Hamburg
- Error handling for non-Hamburg locations

### Insurance Options
- Basic Insurance (€15/day)
- Premium Insurance (€25/day)
- Luxury Insurance (€35/day)

### Driver Services
- Professional Driver (€200/day)
- Premium Driver (€280/day)

### Helper Services
- Basic Helper (€120/day)
- Helper Team (€200/day)
- Premium Team (€280/day)

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#0E6FFF',
    dark: '#0C5CE6',
    light: '#3B8AFF',
  },
  // ... other colors
}
```

### Animations
Customize animations in `tailwind.config.ts`:

```typescript
animation: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'slide-up': 'slideUp 0.5s ease-out',
  // ... other animations
}
```

## 📊 Mock Data

The app uses Faker.js to generate realistic test data:

- **Vehicles**: 20 different vans with varying specifications
- **Insurance Options**: 3 tiers with different coverage levels
- **Driver Options**: 2 professional driver services
- **Helper Options**: 3 helper team configurations
- **Districts**: 5 Hamburg districts with van counts

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:

```bash
yarn build
yarn start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email info@hansehaul-vans.de or create an issue in the repository.

---

**HanseHaul Vans** - Premium van rental service in Hamburg
