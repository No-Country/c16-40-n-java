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
import { useAuth } from '@/providers/authProvider';
import ProvinceSelect from './provinceSelect';
import { useState } from 'react';

const formSchema = z.object({
  title: z
    .string()
    .min(10, { message: 'El titulo debe contener al menos 10 caracteres' }),
  description: z.string().min(20, {
    message: 'La descripción debe contener al menos 20 caracteres',
  }),
  image: z
    .string({ required_error: 'La imagen es requerida' })
    .url({ message: 'La dirección url ingresada no es válida' }),
  goalAmount: z.coerce
    .number()
    .min(1000, { message: 'El monto mínimo es de 1.000 ARS' })
    .max(10000000, { message: 'El monto máximo es de 10.000.000 ARS' }),
  address: z.object({
    province: z.string({ required_error: 'La provincia es requerida.' }),
    city: z.string({ required_error: 'La ciudad es requerida.' }),
    street: z.string().optional(),
    number: z.coerce.number().optional(),
  }),
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
      goalAmount: undefined,
      categoryType: undefined,
      endDate: undefined,
      address: {
        province: '',
        city: '',
        street: '',
        number: undefined,
      },
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const valuesFormated = {
      ...values,
      endDate: format(values.endDate, 'dd/MM/yyyy'),
    };
    const projectData = await createProject(valuesFormated, token!);
    if (projectData) {
      router.push(`/project/${projectData.id}`);
      toast({
        className: 'bg-green-500 text-green-100',
        title: 'Todo salió bien!',
        description: 'Se creó exitosamente el proyecto.',
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
    } else {
      toast({
        variant: 'destructive',
        title: '¡Ups! Algo salió mal!',
        description:
          'Hubo un problema al intentar crear el proyecto, por favor revise que los datos sean correctos e intente nuevamente.',
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
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Titulo*</FormLabel>
                <FormControl>
                  <Input
                    className="border border-foreground bg-white rounded-sm"
                    placeholder="Titulo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Descripción*</FormLabel>
                <FormControl>
                  <Input
                    className="border border-foreground bg-white rounded-sm"
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
            name="goalAmount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Monto a alcanzar*</FormLabel>
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
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Imagen*</FormLabel>
                <FormControl>
                  <Input
                    className="border border-foreground bg-white rounded-sm"
                    placeholder="Dirección URL de la imagen"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 w-full">
            <ProvinceSelect form={form} />
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Localidad*</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-foreground bg-white rounded-sm"
                      placeholder="Localidad"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem className="lg:w-3/4">
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-foreground bg-white rounded-sm"
                      placeholder="Dirección"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-foreground bg-white rounded-sm"
                      placeholder="Número"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Fecha de finalización*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal border border-foreground bg-white rounded-sm',
                          !field.value &&
                            'border border-foreground bg-white rounded-sm'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'dd/MM/yyyy')
                        ) : (
                          <span className="text-muted-foreground">
                            Selecciona una fecha
                          </span>
                        )}
                        <Icons.Calendar className="ml-auto h-4 w-4" />
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
          <CategorySelect form={form} />
        </div>
        <div className="w-full flex items-center justify-between gap-4 pt-10">
          <Button
            type="button"
            variant={'secondary'}
            className="w-1/2 h-11 m-auto rounded-sm bg-white border border-foreground text-foreground"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
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
      </form>
    </Form>
  );
};
export default NewProjectForm;
