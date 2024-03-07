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
import { LoginResponse, loginUser } from '@/lib/actions/auth/login';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Icons } from '../icons';
import { useState } from 'react';
import { useAuth } from '@/providers/authProvider';

const formSchema = z.object({
  email: z.string().email('El formato del mail ingresado es incorrecto.'),
  password: z.string().min(4, {
    message: 'La contraseña debe contener al menos 4 caracteres.',
  }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (userData: LoginResponse) => {
    login(userData);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const userData = await loginUser(values);
    if (userData?.email && userData?.token) {
      handleLogin(userData);
      router.push('/');
    } else {
      toast({
        variant: 'destructive',
        title: '¡Ups! Algo salió mal!',
        description:
          'Hubo un problema al intentar iniciar sesión, por favor revise sus datos e intente nuevamente.',
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input
                  className="border-none  bg-zinc-300"
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

        <p className="mt-0 text-sm hover:underline underline-offset-2 cursor-pointer">
          Olvidaste la contraseña?
        </p>
        <div className="w-full flex flex-col">
          <Button
            disabled={isLoading}
            type="submit"
            className="w-3/4 h-16 m-auto rounded-full"
          >
            {isLoading ? (
              <Icons.Spinner className="mr-2 h-8 w-8 animate-spin" />
            ) : (
              'INICIAR SESIÓN'
            )}
          </Button>
          <div className="flex items-center space-x-2 py-5">
            <Checkbox id="terms" className="rounded-none" />
            <Label htmlFor="remember me">Recordarme</Label>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default LoginForm;
