'use client';
import Left from '@/app/components/icons/Left';
import EditableImage from '@/app/components/layout/EditableImage';
import Tabs from '@/app/components/layout/header/Tabs';
import MenuItemForm from '@/app/components/layout/MenuItemForm';
import { useProfile } from '@/app/hooks/GetProfile';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const NewMenuItemPage = () => {
  const { loading, data } = useProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) return resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Saved',
      error: 'Error',
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect('/menu-items');
  }

  if (loading) {
    return 'Loading';
  }
  if (!data.admin) {
    return 'Not an Administrator';
  }
  return (
    <section className="mt-8">
      <Tabs isAdmin={true} />
      <div className="max-w-md mx-auto mt-8">
        <Link href="/menu-items" className="button">
          <Left />
          <span>Show All Menu Items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
};
export default NewMenuItemPage;
