import '../styles/globals.css';
import { Roboto } from 'next/font/google';
import ClientLayout from './clientLayout';

const roboto = Roboto({ subsets: ['latin'] });

export const metadata = {
  title: 'Atharv | Portfolio',
  description: 'Interactive résumé and project showcase',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} app-shell`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
