'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { CartContext } from '../../AppContext';
import ShoppingCart from '../../icons/ShoppingCart';
import Bars2 from '../../icons/Bars2';
import Logo from './Logo';

function AuthLinks({ status, userName }) {
  if (status === 'authenticated') {
    return (
      <>
        <Link href={'/profile'} className="whitespace-nowrap text-sm">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className=" rounded-full text-lightGray px-8 py-2 text-sm"
        >
          Logout
        </button>
      </>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'} className="text-sm">
          Login
        </Link>
        <Link
          href={'/register'}
          className=" rounded-full text-lightGray px-8 py-2 text-sm"
        >
          Register
        </Link>
      </>
    );
  }
}

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }
  return (
    <header className="p-2 px-5 sm:px-10 w-full">
      <div className="flex items-center md:hidden justify-between ">
        {/* <Link className="text-primary font-semibold text-2xl" href={'/'}>
          Bayview Eatery
        </Link> */}
        <div className="flex gap-8 items-center text-light">
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-black text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button
            className="p-1 border"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <Bars2 />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray rounded-lg mt-2 flex flex-col gap-2 text-center text-lightGray text-sm"
        >
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 font-semibold text-lightGray text-sm">
          {/* <Link className="text-primary font-semibold text-2xl" href={'/'}>
            Bayview Eatery
          </Link> */}
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
        </nav>
        <Logo className="dark:bg-black" />
        <nav className="flex items-center gap-4 text-light font-semibold">
          <AuthLinks status={status} userName={userName} />
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-black text-lightGray text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
