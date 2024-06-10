import Link from 'next/link';

const Header = () => {
  return (
    <>
      <header className="flex items-center justify-between">
        <Link className="text-primary font-semibold text-2xl" href="/">
          House of Howard
        </Link>
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link href="">Home</Link>
          <Link href="">Menu</Link>
          <Link href="">About</Link>
          <Link href="">Contact</Link>
        </nav>
        <nav className="flex items-center gap-8 text-gray">
          <Link
            className="bg-primary text-white px-6 py-2 rounded-full"
            href="/login"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-primary text-white px-6 py-2 rounded-full"
          >
            Register
          </Link>
        </nav>
      </header>
    </>
  );
};
export default Header;
