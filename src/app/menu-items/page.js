'use client';

import Link from 'next/link';
import Tabs from '../components/layout/header/Tabs';
import { useProfile } from '../hooks/GetProfile';
import Right from '../components/icons/Right';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const MenuItemsPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();
  useEffect(() => {
    fetch('/api/menu-items').then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return 'Loading user information.';
  }

  if (!data.admin) {
    return 'Not an Administrator';
  }

  return (
    <section className="flex min-h-screen flex-col mt-8 ">
      <Tabs isAdmin={true} />
      <div className="mt-8 max-w-md flex mx-auto">
        <Link className="button flex " href="/menu-items/new">
          <span>Create New Menu Item</span>
          <Right />
        </Link>
      </div>
      <div>
        <div className="container mt-12 mx-auto px-12 py-4">
          <h2 className="text-sm text-lightBlack mt-4">Edit Menu Item: </h2>

          <div className="grid grid-cols-3 gap-2 justify-center ">
            {menuItems?.length > 0 &&
              menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={'/menu-items/edit/' + item._id}
                  className="bg-lightBlack text-white rounded-lg p-4 hover:bg-white/50 hover:font-semibold lg:text-lg  text-sm"
                >
                  <div className="relative ">
                    <Image
                      src={item.image}
                      alt={''}
                      sizes="100vw"
                      style={{
                        width: '100%',
                        height: 'auto',
                      }}
                      width={500}
                      height={300}
                      className="rounded-md"
                    />
                  </div>
                  <div className="text-center">{item.name}</div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default MenuItemsPage;
