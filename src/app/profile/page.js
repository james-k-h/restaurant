'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfoBox from '../components/layout/InfoBox';
import toast from 'react-hot-toast';
import Error from 'next/error';
import Link from 'next/link';
import Tabs from '../components/layout/header/Tabs';
import EditableImage from '../components/layout/EditableImage';

const ProfilePage = () => {
  const session = useSession();

  const [image, setImage] = useState('');
  const [userName, setUserName] = useState();
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const [profileFetched, setProfileFetched] = useState(false);

  const { status } = session;

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
      fetch('/api/profile').then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleChange(ev) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userName,
          image,
          streetAddress,
          phone,
          postalCode,
          city,
          country,
        }),
      });
      if (response.ok) {
        resolve();
      } else reject();
    });
    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile Saved',
      error: 'Error',
    });
  }

  if (status === 'loading' || !profileFetched) {
    return 'Loading...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <section className="mt-8">
      <Tabs isAdmin={isAdmin} />

      <div className="max-w-4xl  mx-auto border mt-4">
        <div className="flex gap-4  p-2 ">
          <div>
            <div className="bg-lightBlack rounded-lg p-2 relative max-w-[400px]">
              <EditableImage link={image} setLink={setImage} />
            </div>
          </div>
          <form className="grow" onSubmit={handleChange}>
            <label>Given and Surname</label>
            <input
              type="text"
              placeholder="First and Last name"
              className="text-lightBlack"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            ></input>
            <label>Email</label>
            <input
              type="email"
              value={session.data.user.email}
              disabled={true}
            ></input>
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
            <label>Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
            />
            <div className="flex gap-2">
              <div>
                <label>Postal Code</label>
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </div>
              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
              </div>
            </div>
            <label>Street Address</label>
            <input
              type="text"
              placeholder="Street Address"
              value={streetAddress}
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default ProfilePage;
