import Logo from '@/components/ui/logo';
import Link from 'next/link';

const AuthNavbar = () => {
  return (
    <nav className="absolute w-[95%] top-0 lg:w-5/6 left-1/2 translate-x-[-50%] h-16 flex justify-between items-center p-2 mt-5 lg:mt-10 rounded-full bg-primary text-secondary-foreground font-regular">
      <Link href={'/'}>
        <Logo />
      </Link>
    </nav>
  );
};
export default AuthNavbar;
