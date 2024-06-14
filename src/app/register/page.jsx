'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import SignInFetch from '../hooks/SignInFetch';
import { signIn } from 'next-auth/react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    // const response = await fetch('/api/register', {
    //   method: 'POST',
    //   body: JSON.stringify({ email, password }),
    //   headers: { 'Content-Type': 'application/json' },
    // });
    const response = SignInFetch(ev, 'register', email, password);
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl font-semibold mb-4">
        Register
      </h1>
      {userCreated && (
        <div className="my-4 text-center">
          User created. <br />
          <Link href="/login" className="font-semibold underline">
            Proceed here to login
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">Error. Please try again.</div>
      )}
      <form className="block max-w-sm mx-auto" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          disabled={creatingUser}
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          disabled={creatingUser}
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        ></input>
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="my-4 text-center text-gray">
          Or - Login with a provider:
        </div>
        <button
          className="flex gap-4 justify-center bg-almond"
          onClick={() => signIn('google')}
        >
          <Image
            src={'/google.png'}
            alt="Login with Google"
            width={32}
            height={32}
          />
          Login with Google
        </button>
      </form>
      <div></div>
    </section>
  );
};
export default Register;
