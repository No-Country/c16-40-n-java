'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import { createProject } from '@/lib/actions/project/createProject';
import CategorySelect from './categorySelect';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Icons } from '../icons';
import { useState } from 'react';
import { useAuth } from '@/providers/authProvider';

const formSchema = z.object({
  title: z
    .string()
    .min(10, { message: 'El titulo debe contener al menos 10 caracteres' }),
  description: z.string().min(20, {
    message: 'La descripción debe contener al menos 20 caracteres',
  }),
  image: z.string({ required_error: 'La imagen es requerida' }),
  goalAmount: z.coerce
    .number()
    .min(1000, { message: 'El monto mínimo es de 1.000 ARS' })
    .max(10000000, { message: 'El monto máximo es de 10.000.000 ARS' }),
  categoryType: z.string({ required_error: 'La categoría es requerida' }),
  endDate: z.date({
    required_error: 'La fecha de finalización es requerida.',
  }),
});

const NewProjectForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
      goalAmount: 1000,
      categoryType: undefined,
      endDate: undefined,
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const { token } = useAuth();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const valuesFormated = {
      ...values,
      endDate: format(values.endDate, 'dd/MM/yyyy'),
    };
    const projectData = await createProject(valuesFormated, token!);
    if (projectData) {
      router.push(`/project/${projectData.id}`);
      return toast({
        className: 'bg-green-500 text-green-100',
        title: 'Todo salió bien!',
        description: 'Se creó exitosamente el proyecto.',
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
    } else {
      return toast({
        variant: 'destructive',
        title: '¡Ups! Algo salió mal!',
        description:
          'Hubo un problema al intentar crear el proyecto, por favor revise que los datos sean correctos e intente nuevamente.',
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col justify-between gap-5 w-full">
          <div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input
                      className="border-none bg-zinc-300"
                      placeholder="Titulo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CategorySelect form={form} />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input
                    className="border-none bg-zinc-300"
                    placeholder="Descripción"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Imagen</FormLabel>
                <FormControl>
                  <Input
                    className="border-none bg-zinc-300"
                    placeholder="Dirección URL de la imagen"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between gap-5 w-full">
          <FormField
            control={form.control}
            name="goalAmount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Monto a alcanzar</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="border-none bg-zinc-300"
                    placeholder="Monto a alcanzar"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de finalización</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'border-none bg-zinc-300'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'dd/MM/yyyy')
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                        <Icons.Calendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex items-center">
          <Button type="submit" className="w-3/4 h-16 m-auto rounded-full">
            CREAR PROYECTO
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default NewProjectForm;
