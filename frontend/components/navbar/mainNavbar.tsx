import Link from 'next/link';
import Logo from '@/components/ui/logo';
import MobileMenu from '@/components/mobile/mobileMenu';
import NavbarUserMenu from '@/components/navbar/navbarUserMenu';

const MainNavbar = () => {
  return (
    <nav className="absolute w-[95%] top-0 lg:w-5/6 left-1/2 translate-x-[-50%] h-16 flex justify-between items-center p-2 mt-5 lg:mt-10 rounded-full bg-primary text-secondary-foreground font-regular">
      <Link href={'/'}>
        <Logo />
      </Link>
      <div className="hidden sm:flex gap-5 items-center text-sm lg:text-base">
        <Link href={'/'} className="hover:underline underline-offset-2">
          Inicio
        </Link>
        <Link href={'/projects'} className="hover:underline underline-offset-2">
          Proyectos
        </Link>
        <Link href={'/about'} className="hover:underline underline-offset-2">
          ¿Quiénes somos?
        </Link>
        <NavbarUserMenu />
      </div>
      <MobileMenu />
    </nav>
  );
};
export default MainNavbar;
