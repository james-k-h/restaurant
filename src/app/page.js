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
            <p>Serving the neighbourhood since 1990.</p>
            <p>
              Bayview Eatery opened on Thanksgiving Day 1990. Chef / Owner John
              Doe began baking pies and selling them to restaurants and his
              neighbors out of a small kitchen at the corner of Bayview and
              Fleming St. in Leaside.{' '}
            </p>
            <p>
              Today, Toronto’s beloved restaurant celebrates 24 years of
              classic, made from scratch Canadian cooking.
            </p>
          </div>
        </section>
        <section className="text-center my-8" id="contact">
          <SectionHeaders
            subHeader="We would love to hear from you"
            mainHeader="Contact Us"
          />
          <div className="mt-8">
            <p className="text-gray font-semibold">57 Bayview Avenue </p>
            <p className="text-gray font-semibold">
              Monday - Friday, Open from 10:00 - 22:00{' '}
            </p>
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
