'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const VolunteerSuccesfulDialog = ({ open, setOpen }: Props) => {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[95%] md:max-w-xl p-5 md:p-14 bg-white border border-foreground">
        <DialogHeader>
          <DialogTitle className="text-center text-primary text-xl lg:text-3xl font-medium pb-5">
            ¡Gracias por registrarte como voluntario!
          </DialogTitle>
          <DialogDescription className="text-center text-foreground text-lg lg:text-xl font-medium">
            Tus datos se han enviado correctamente a tu correo electrónico y al
            creador del proyecto. Pronto te contactaremos para coordinar los
            próximos pasos. ¡Gracias por tu interés en colaborar con nosotros!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex w-full items-center">
          <Button
            type="button"
            variant={'secondary'}
            className="w-1/2 h-11 m-auto rounded-sm bg-white border border-foreground text-foreground"
            onClick={() => router.back()}
          >
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default VolunteerSuccesfulDialog;
