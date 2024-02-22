import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-2 m-5 rounded-full bg-primary text-primary-foreground font-regular">
      <Link href={'/'}>
        <div>LOGO</div>
      </Link>
      <div className="flex gap-5 items-center">
        <Link href={'/about'} className="hover:underline underline-offset-2">
          ¿Quiénes somos?
        </Link>
        <Link href={'/login'}>
          <Button variant={'secondary'} className="rounded-full">
            Iniciar sesión
          </Button>
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
