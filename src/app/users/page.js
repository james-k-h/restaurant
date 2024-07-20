'use client';
import { useEffect, useState } from 'react';
import Tabs from '../components/layout/header/Tabs';
import { useProfile } from '../hooks/GetProfile';
import Link from 'next/link';

const UsersPage = () => {
  const { loading, data } = useProfile();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users').then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return 'Loading user info';
  }

  if (!data.admin) {
    return 'Not an admin';
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto h-screen">
      <Tabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user, i) => (
            <div
              key={i}
              className="bg-primary rounded-lg mb-2 p-1 px-4 items-center gap-4 flex"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <div className="text-lightBlack">
                  {!!user.name && <span>{user.name}</span>}
                  {!user.name && <span className="italic">No Name</span>}
                </div>

                <span className="text-gray">{user.email}</span>
              </div>
              <div>
                <Link href={'/users/' + user._id} className="button">
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
export default UsersPage;
