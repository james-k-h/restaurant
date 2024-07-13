'use client';
import MenuItem from './menu/MenuItem';
import SectionHeaders from './header/SectionHeaders';
import { useEffect, useState } from 'react';

const HomeMenu = () => {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch('/api/menu-items').then((res) => {
      res.json().then((menuItems) => {
        setBestSellers(menuItems.slice(-3));
      });
    });
  }, []);

  return (
    <section className="py-16">
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={'Check Out'}
          mainHeader={'Our Best Sellers'}
        />
      </div>
      <div className="grid lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 gap-4 ">
        {bestSellers?.length > 0 &&
          bestSellers.map((item, i) => <MenuItem {...item} key={i} />)}
      </div>
    </section>
  );
};
export default HomeMenu;
