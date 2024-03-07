'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useAuth } from '@/providers/authProvider';
import { project } from '@/lib/actions/project/getProjectById';
import DonationFormBottom from '@/components/project/donation/donationFormBottom';
import DonationFormTop from '@/components/project/donation/donationFormTop';
import { Button } from '@/components/ui/button';
import DonationSuccesfulDialog from '@/components/project/donation/donationSuccesfulDialog';
import { useState } from 'react';
import { donateToProject } from '@/lib/actions/project/donateToProject';

interface Props {
  project: project;
}

const formSchema = z.object({
  amount: z.coerce
    .number()
    .min(1000, { message: 'El monto mínimo es de 1.000 ARS' })
    .max(10000000, { message: 'El monto máximo es de 10.000.000 ARS' }),
  name: z
    .string()
    .min(4, { message: 'El nombre debe contener al menos 4 caracteres' }),
  lastName: z
    .string()
    .min(4, { message: 'El apellido debe contener al menos 3 caracteres' }),
  email: z.string().email('El formato del mail ingresado es incorrecto.'),
});

const DonationForm = ({ project }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      name: '',
      lastName: '',
      email: '',
    },
  });

  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const { token } = useAuth();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formResponse = await donateToProject(project.id, values, token!);
    if (formResponse) {
      setOpen(true);
      return;
    } else {
      return toast({
        variant: 'destructive',
        title: '¡Ups! Algo salió mal!',
        description:
          'Hubo un problema al intentar realizar la donación, por favor intente nuevamente.',
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-10">
        <div className="flex flex-col bg-white rounded-lg p-5 lg:p-20 m-auto w-[95%] lg:w-2/3 mt-28 lg:mt-36">
          <DonationFormTop project={project} />
          <div className="flex flex-col justify-between gap-2 w-full">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-medium text-base">
                    Indica el monto
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        className="border border-foreground bg-white rounded-sm pl-8"
                        placeholder="Indica el monto"
                        {...field}
                      />
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-sm leading-5 z-10 bg-white border border-t-foreground border-b-foreground border-r-transparent border-l-foreground rounded-l-sm">
                        $
                      </span>
                      <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 z-10 bg-white border border-t-foreground border-b-foreground border-l-transparent border-r-foreground rounded-r-sm">
                        ARS
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="border-t-2 border-foreground w-[90%] mx-auto" />
        <div className="flex flex-col bg-white rounded-lg p-5 lg:p-20 m-auto w-[95%] lg:w-2/3 mt-28 lg:mt-36">
          <DonationFormBottom form={form} />
          <div className="w-full flex items-center justify-between gap-4 pt-10">
            <Button
              type="button"
              variant={'secondary'}
              className="w-1/2 h-11 m-auto rounded-sm bg-white border border-foreground text-foreground"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <DonationSuccesfulDialog
              open={open}
              setOpen={setOpen}
              project={project}
              donationData={{
                amount: form.getValues('amount'),
                user: form.getValues('name') + ' ' + form.getValues('lastName'),
              }}
            />
            <Button type="submit" className="w-1/2 h-11 m-auto rounded-sm">
              Donar ahora
            </Button>
          </div>
          <p className="pt-10">
            Al elegir el método de pago anterior, aceptas los Términos de
            Servicio de Colaborapp! y declaras tu conformidad con la Declaración
            de Privacidad.
          </p>
        </div>
      </form>
    </Form>
  );
};
export default DonationForm;
