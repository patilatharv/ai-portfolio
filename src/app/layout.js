import '../styles/globals.css';
import Sidebar from '../components/Sidebar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Atharv | Portfolio',
  description: 'Interactive résumé and project showcase',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} app-shell`}>
        <Sidebar />
        <main className="main-panel">
          {children}
        </main>
      </body>
    </html>
  );
}
