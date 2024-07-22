'use client';
import Image from 'next/image';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginPending, setLoginPending] = useState('');

  async function handleSubmit(ev) {
    ev.preventDefault();
    setLoginPending(true);

    await signIn('Credentials', { email, password, callbackUrl: '/' });

    setLoginPending(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="block max-w-sm mx-auto" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          disabled={loginPending}
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          disabled={loginPending}
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        ></input>
        <button type="submit">Login</button>
        <div className="my-4 text-center text-gray">
          Or - Login with a provider:
        </div>
        <button
          onClick={() => signIn('google')}
          className="flex gap-4 justify-center bg-primary"
          disabled={loginPending}
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
    </section>
  );
};
export default Login;
