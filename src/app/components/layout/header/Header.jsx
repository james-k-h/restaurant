'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../../AppContext';
import ShoppingCart from '../../icons/ShoppingCart';

const Header = () => {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);

  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  return (
    <>
      <header className="flex items-center justify-between">
        <Link className="text-primary font-semibold text-2xl" href="/">
          House of Howard
        </Link>
        <nav className="flex items-center gap-8 text-light font-semibold">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <nav className="flex items-center gap-8 text-light">
          {status === 'authenticated' && (
            <>
              <Link href="/profile">{userName}</Link>
              <button
                onClick={() => signOut()}
                className="bg-primary text-light px-6 py-2 rounded-full"
              >
                Logout
              </button>
            </>
          )}
          {status === 'unauthenticated' && (
            <>
              <Link
                className="bg-primary text-light px-6 py-2 rounded-full"
                href="/login"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-primary text-light px-6 py-2 rounded-full"
              >
                Register
              </Link>
            </>
          )}
          {cartProducts?.length > 0 && (
            <Link href="/cart" className="relative">
              <ShoppingCart />
              <span
                className="absolute
              py-1 px-1
              -top-3 -right-4 text-sm p-1 rounded-full leading-3"
              >
                ({cartProducts.length})
              </span>
            </Link>
          )}
        </nav>
      </header>
    </>
  );
};
export default Header;
