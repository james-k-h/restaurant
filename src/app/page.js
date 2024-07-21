import Hero from './components/layout/Hero';
import HomeMenu from './components/layout/HomeMenu';
import SectionHeaders from './components/layout/header/SectionHeaders';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mt-24 mx-auto px-12 py-4 ">
        <Hero />
        <HomeMenu />
        <section className="text-center my-16 " id="about">
          <SectionHeaders subHeader="Our Story" mainHeader="About Us" />
          <div className="max-w-2xl mx-auto text-gray mt-4 flex flex-col gap-4">
            <p>Placeholder description text</p>
            <p>Placeholder 2 description text</p>
            <p>Placeholder 3 description text</p>
          </div>
        </section>
        <section className="text-center my-8" id="contact">
          <SectionHeaders
            subHeader="We would love to hear from you"
            mainHeader="Contact Us"
          />
          <div className="mt-8">
            <Link
              className="text-4xl underline text-gray hover:font-semibold"
              href={'tel:+46738123123'}
            >
              +46 738 123 123
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
