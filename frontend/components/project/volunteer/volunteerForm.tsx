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
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import VolunteerSuccesfulDialog from './volunteerSuccesfulDialog';
import { Textarea } from '@/components/ui/textarea';
import { beVolunteerToProject } from '@/lib/actions/project/beVolunteerToProject';
import { Icons } from '@/components/icons';

interface Props {
  project: project;
}

const formSchema = z.object({
  fullName: z
    .string()
    .min(4, { message: 'El nombre debe contener al menos 4 caracteres.' }),
  volunteerPhoneNumber: z
    .string()
    .min(10, { message: 'El numero ingresado es invalido' })
    .max(14, { message: 'El numero ingresado es invalido' }),
  email: z.string().email('El formato del mail ingresado es incorrecto.'),
  details: z
    .string()
    .min(1, { message: 'Ingresa alguno de los detalles mencionados.' }),
});

const VolunteerForm = ({ project }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      volunteerPhoneNumber: '',
      email: '',
      details: '',
    },
  });

  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const formResponse = await beVolunteerToProject(project.id, values, token!);
    if (formResponse) {
      setOpen(true);
      return;
    } else {
      toast({
        variant: 'destructive',
        title: '¡Ups! Algo salió mal!',
        description:
          'Hubo un problema al intentar realizar la solicitud de voluntariado, por favor intente nuevamente.',
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col justify-between gap-2 w-full">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-medium text-base">
                  Nombre completo
                </FormLabel>
                <FormControl>
                  <Input
                    type="fullName"
                    className="border border-foreground bg-white rounded-sm"
                    placeholder="Nombre completo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="volunteerPhoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-medium text-base">
                  Número de teléfono
                </FormLabel>
                <FormControl>
                  <Input
                    type="phone"
                    className="border border-foreground bg-white rounded-sm"
                    placeholder="Número de teléfono"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-medium text-base">
                  Dirección de correo electrónico
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="border border-foreground bg-white rounded-sm"
                    placeholder="Dirección de correo electrónico"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-medium text-base">
                  Detalles
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Por favor, comparte tus detalles relevantes para el voluntariado (dirección opcional, edad, experiencia previa, habilidades, disponibilidad, intereses, referencias y expectativas)."
                    className="border border-foreground bg-white rounded-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex items-center justify-between gap-4 pt-10">
            <Button
              type="button"
              variant={'secondary'}
              className="w-1/2 h-11 m-auto rounded-sm bg-white border border-foreground text-foreground"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <VolunteerSuccesfulDialog open={open} setOpen={setOpen} />
            <Button
              disabled={isLoading}
              type="submit"
              className="w-1/2 h-11 m-auto rounded-sm"
            >
              {isLoading ? (
                <Icons.Spinner className="mr-2 h-8 w-8 animate-spin" />
              ) : (
                'Continuar'
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default VolunteerForm;
