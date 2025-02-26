'use client';
import { useEffect, useState } from 'react';
import SectionHeaders from '../components/layout/header/SectionHeaders';
import MenuItem from '../components/layout/menu/MenuItem';

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/categories').then((res) => {
      res.json().then((categories) => setCategories(categories));
    });
    fetch('/api/menu-items').then((res) => {
      res.json().then((menuItems) => setMenuItems(menuItems));
    });
  }, []);

  return (
    <section className="mt-8 ">
      {categories?.length > 0 &&
        categories.map((c, i) => (
          <div key={i}>
            <div className="text-center">
              <SectionHeaders mainHeader={c.name} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 mb-12">
              {menuItems
                .filter((item) => item.category === c._id)
                .map((item, i) => (
                  <MenuItem {...item} key={i} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
};
export default MenuPage;
