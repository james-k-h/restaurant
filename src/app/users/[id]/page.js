'use client';
import Tabs from '@/app/components/layout/header/Tabs';
import UserForm from '@/app/components/layout/header/UserForm';
import { useProfile } from '@/app/hooks/GetProfile';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const EditUserPage = () => {
  const { loading, data } = useProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch('/api/profile?_id=' + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, []);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(promise, {
      loading: 'Saving user...',
      success: 'User saved',
      error: 'Error while saving, please try again later',
    });
  }

  if (loading) {
    return 'Loading user profile...';
  }

  if (!data.admin) {
    return 'Not an admin';
  }

  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <Tabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
};
export default EditUserPage;
