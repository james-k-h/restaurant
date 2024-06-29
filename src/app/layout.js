import { Inter, Roboto } from 'next/font/google';
import './globals.css';
import siteMetadata from '../utils/metaData';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import { AppProvider } from './components/AppContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata = {
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title, // a default is required when creating a template
  },
  description: siteMetadata.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="max-w-full mx-auto border p-4 bg-tan">
          <AppProvider>
            <Toaster />
            <Header />
            {children}
            <Footer />
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
