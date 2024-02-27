'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const NavBarUserMenuMobile = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [user, setUser] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('email') : null
  );

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setUser(null);
  };

  return (
    <>
      {isClient && user ? (
        <>
          <p
            className="hover:underline underline-offset-2"
            onClick={() => handleLogOut()}
          >
            Cerrar sesión
          </p>
          <p className="mt-auto font-semibold">{user}</p>
        </>
      ) : (
        <Link href={'/login'}>Iniciar sesión</Link>
      )}
    </>
  );
};
export default NavBarUserMenuMobile;
