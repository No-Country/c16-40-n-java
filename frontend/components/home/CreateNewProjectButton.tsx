'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/authProvider';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

const CreateNewProjectButton = () => {
  const { userData } = useAuth();

  return (
    <>
      <AlertDialog>
        {!userData ? (
          <>
            <AlertDialogTrigger asChild>
              <Button className="font-bold w-72 lg:w-96 h-12 rounded-full lg:text-2xl">
                Comienza tu proyecto!
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Debes iniciar sesión para crear un proyecto
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Al iniciar sesión puedes crear un proyecto y realizar
                  donaciones o ofrecerte como voluntario en otros proyectos.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <Link href={'/login'}>
                  <AlertDialogAction>Iniciar sesión</AlertDialogAction>
                </Link>
              </AlertDialogFooter>
            </AlertDialogContent>
          </>
        ) : (
          <Link href={'/new-project'}>
            <Button className="font-bold w-72 lg:w-96 h-12 rounded-full lg:text-2xl">
              Comienza tu proyecto!
            </Button>
          </Link>
        )}{' '}
      </AlertDialog>
    </>
  );
};
export default CreateNewProjectButton;
