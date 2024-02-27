'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NavbarUserMenu = () => {
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback>
                {user?.slice(0, 2).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-10">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleLogOut}
            >
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={'/login'}>
          <Button
            variant={'secondary'}
            className="rounded-full text-md text-sm lg:text-base border-foreground border-2"
          >
            Iniciar sesión
          </Button>
        </Link>
      )}
    </>
  );
};
export default NavbarUserMenu;
