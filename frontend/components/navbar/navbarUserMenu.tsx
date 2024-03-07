'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/providers/authProvider';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const NavbarUserMenu = () => {
  const router = useRouter();
  const { userData, logout } = useAuth();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [userData]);

  const handleLogOut = () => {
    logout();
  };

  if (isLoading) return <Skeleton className="w-10 h-10 rounded-full" />;

  return (
    <>
      {userData ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="border-2 border-foreground font-medium">
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
        <Button
          variant={'secondary'}
          className="rounded-full text-md text-sm lg:text-base border-foreground border-2"
          onClick={() => router.push('/login')}
        >
          Iniciar sesión
        </Button>
      )}
    </>
  );
};
export default NavbarUserMenu;
