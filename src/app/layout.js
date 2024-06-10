import { Inter, Roboto } from 'next/font/google';
import './globals.css';
import siteMetadata from '../utils/metaData';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';

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
        <main className="max-w-4xl mx-auto border p-4 bg-tan">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
