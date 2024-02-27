import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import NavBarUserMenuMobile from '@/components/mobile/navBarUserMenuMobile';

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
          <NavBarUserMenuMobile />
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MobileMenu;
