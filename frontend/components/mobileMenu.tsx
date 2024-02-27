import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Icons } from '@/components/icons';
import Link from 'next/link';

const MobileMenu = () => {
  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Icons.Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col text-md">
          <Link href={'/'} className="hover:underline underline-offset-2">
            Inicio
          </Link>
          <Link href={'/about'} className="hover:underline underline-offset-2">
            ¿Quiénes somos?
          </Link>
          <Link href={'/login'}>Iniciar sesión</Link>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MobileMenu;
