'use client';

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel,
} from './ui/alert-dialog';
import { Children, ReactNode } from 'react';
import { useAuth } from '@/providers/authProvider';
import { useRouter } from 'next/navigation';

const LoginAlert = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { checkTokenExpiration } = useAuth();

  const tokenStatus = checkTokenExpiration();

  return (
    <AlertDialog>
      {tokenStatus ? (
        <>
          <AlertDialogTrigger asChild>
            {Children.toArray(children)[0]}
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[90%] rounded-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>{tokenStatus.title}</AlertDialogTitle>
              <AlertDialogDescription>
                {tokenStatus.description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-2 border-foreground text-foreground">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => router.push('/login')}>
                Iniciar sesión
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </>
      ) : (
        Children.toArray(children)[1] || Children.toArray(children)[0]
      )}
    </AlertDialog>
  );
};
export default LoginAlert;
