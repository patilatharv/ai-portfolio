import '../styles/globals.css';
import { Roboto } from 'next/font/google';
import ClientLayout from './clientLayout';
import Analytics from '@/utils/googleAnalytics'

const roboto = Roboto({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://atharv-patil.dev'), // Update with real domain name
  title: 'Atharv | Portfolio',
  description: 'Interactive resume and project showcase',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Atharv | Portfolio',
    description: 'Explore Atharv Patil’s AI powered interactive resume and project showcase.',
    url: 'https://atharv-patil.dev', // Update with real domain name
    siteName: 'Atharv Patil Portfolio',
    images: [
      {
        url: '/images/projectsImages/metadata_website_image.png',
        width: 1200,
        height: 630,
        alt: 'Atharv Portfolio Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atharv | Portfolio',
    description: 'Explore Atharv Patil’s AI powered interactive resume and project showcase.',
    images: ['/images/projectsImages/metadata_website_image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} app-shell`}>
        <Analytics />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
