'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState();

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session.data.user.name);
    }
  }, [session, status]);

  async function handleChange(ev) {
    ev.preventDefault();
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName }),
    });
  }

  if (status === 'loading') {
    return 'Loading...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  const userImage = session.data.user.image;

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4 font-semibold">
        Profile
      </h1>

      <div className="max-w-md mx-auto border">
        <div className="flex gap-4 items-center p-2 ">
          <div>
            <div className="bg-lightBlack rounded-lg p-2 relative ">
              <Image
                className="w-full h-full rounded-lg mb-4"
                src={userImage}
                width={250}
                height={250}
                alt="avatar"
              />
              <button type="button">Edit</button>
            </div>
          </div>
          <form className="grow" onSubmit={handleChange}>
            <input
              type="text"
              placeholder="First and Last name"
              className="text-lightBlack"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            ></input>
            <input
              type="email"
              value={session.data.user.email}
              disabled={true}
            ></input>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default ProfilePage;
