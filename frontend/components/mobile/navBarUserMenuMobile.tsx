'use client';

import { useAuth } from '@/providers/authProvider';
import Link from 'next/link';

const NavBarUserMenuMobile = () => {
  const { userData, logout } = useAuth();

  const handleLogOut = () => {
    logout();
  };

  return (
    <>
      {userData ? (
        <>
          <p
            className="hover:underline underline-offset-2"
            onClick={() => handleLogOut()}
          >
            Cerrar sesión
          </p>
          <p className="mt-auto font-semibold">{userData}</p>
        </>
      ) : (
        <Link href={'/login'}>Iniciar sesión</Link>
      )}
    </>
  );
};
export default NavBarUserMenuMobile;
