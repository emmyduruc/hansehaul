import type { Metadata } from 'next';
import ClientWrapper from '@/components/ClientWrapper';
import MainLayout from '@/components/layout/MainLayout';
import './globals.css';

export const metadata: Metadata = {
  title: 'HanseHaul Vans - Premium Van Rental in Hamburg',
  description: 'Experience luxury and comfort with our Tesla-like van fleet in Hamburg. Premium van rental service with electric and hybrid options.',
  keywords: 'van rental, hamburg, premium, electric, hybrid, luxury, transport',
  authors: [{ name: 'HanseHaul Vans' }],
  openGraph: {
    title: 'HanseHaul Vans - Premium Van Rental in Hamburg',
    description: 'Experience luxury and comfort with our Tesla-like van fleet in Hamburg.',
    type: 'website',
    locale: 'de_DE',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <ClientWrapper>
          <MainLayout>
            {children}
          </MainLayout>
        </ClientWrapper>
      </body>
    </html>
  );
}
