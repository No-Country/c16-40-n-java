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
import { register } from '@/lib/actions/auth/register';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useState } from 'react';
import { Icons } from '@/components/icons';

const formSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: 'El nombre debe contener al menos 4 caracteres' }),
    lastName: z
      .string()
      .min(4, { message: 'El apellido debe contener al menos 3 caracteres' }),
    email: z.string().email('El formato del mail ingresado es incorrecto.'),
    phoneNumber: z
      .string()
      .min(10, { message: 'El numero ingresado es invalido' })
      .max(14, { message: 'El numero ingresado es invalido' }),
    password: z.string().min(4, {
      message: 'La contraseña debe contener al menos 4 caracteres.',
    }),
    confirmPassword: z.string().min(4, {
      message: 'La contraseña debe contener al menos 4 caracteres.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const confirmation = await register(values);
    if (confirmation) {
      router.push('/login');
      return toast({
        className: 'bg-green-500 text-green-100',
        title: 'Todo salió bien!',
        description:
          'Se registró exitosamente el usuario, por favor inicie sesión.',
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
    } else {
      return toast({
        variant: 'destructive',
        title: '¡Ups! Algo salió mal!',
        description:
          'Hubo un problema al intentar registrar el usuario, por favor revise sus datos e intente nuevamente. Si ya tiene una cuenta creada intente iniciar sesión.',
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-between gap-5 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    className="border-none bg-zinc-300"
                    placeholder="Nombre"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input
                    className="border-none bg-zinc-300"
                    placeholder="Apellido"
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
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input
                    className="border-none bg-zinc-300"
                    placeholder="Correo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input
                    className="border-none bg-zinc-300"
                    placeholder="Teléfono"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    className="border-none  bg-zinc-300"
                    placeholder="Contraseña"
                    {...field}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Icons.Eye /> : <Icons.EyeOff />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="border-none  bg-zinc-300"
                    placeholder="Confirmar contraseña"
                    {...field}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <Icons.Eye /> : <Icons.EyeOff />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex items-center">
          <Button
            disabled={isLoading}
            type="submit"
            className="w-3/4 h-16 m-auto rounded-full"
          >
            {isLoading ? (
              <Icons.Spinner className="mr-2 h-8 w-8 animate-spin" />
            ) : (
              'REGISTRARSE'
            )}{' '}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default RegisterForm;
