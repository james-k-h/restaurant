'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(ev) {
    ev.preventDefault();

    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl font-semibold mb-4">
        Register
      </h1>
      <form className="block max-w-sm mx-auto" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        ></input>
        <button type="submit">Register</button>
        <div className="my-4 text-center text-gray">
          Or - Login with a provider:
        </div>
        <button className="flex gap-4 justify-center bg-almond">
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
