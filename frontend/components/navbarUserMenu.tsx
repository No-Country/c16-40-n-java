'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/providers/authProvider';

const NavbarUserMenu = () => {
  const { userData, logout } = useAuth();

  const handleLogOut = () => {
    logout();
  };

  return (
    <>
      {userData ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="border-foreground">
              <AvatarFallback>
                {userData?.slice(0, 2).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-10">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleLogOut()}
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
