import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from '@/components/ui/logo';

const Navbar = () => {
  return (
    <nav className="absolute w-[95%] lg:w-5/6 left-1/2 translate-x-[-50%] flex justify-between items-center p-2 mt-5 lg:mt-10 rounded-full bg-primary text-secondary-foreground font-regular">
      <Link href={'/'}>
        <Logo />
      </Link>
      <div className="flex gap-5 items-center text-sm lg:text-base">
        <Link href={'/about'} className="hover:underline underline-offset-2">
          ¿Quiénes somos?
        </Link>
        <Link href={'/login'}>
          <Button
            variant={'secondary'}
            className="rounded-full text-md text-sm lg:text-base"
          >
            Iniciar sesión
          </Button>
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
