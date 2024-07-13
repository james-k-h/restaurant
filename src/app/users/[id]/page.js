'use client';
import Tabs from '@/app/components/layout/header/Tabs';
import UserForm from '@/app/components/layout/header/UserForm';
import { useProfile } from '@/app/hooks/GetProfile';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const EditUserPage = () => {
  const { loading, data } = useProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch('/api/users').then((res) => {
      res.json().then((users) => {
        const user = users.find((u) => u._id === id);
        setUser(user);
      });
    });
  }, []);

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
        <UserForm user={user} />
      </div>
    </section>
  );
};
export default EditUserPage;
