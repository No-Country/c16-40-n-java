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
import { Icons } from '../../icons';
import { useAuth } from '@/providers/authProvider';
import { project } from '@/lib/actions/project/getProjectById';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Icon } from '@radix-ui/react-select';

interface Props {
  project: project;
}

const formSchema = z.object({
  amount: z.coerce
    .number()
    .min(1000, { message: 'El monto mínimo es de 1.000 ARS' })
    .max(10000000, { message: 'El monto máximo es de 10.000.000 ARS' }),
  province: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
  categoryType: z.string({ required_error: 'La categoría es requerida' }),
  endDate: z.date({
    required_error: 'La fecha de finalización es requerida.',
  }),
});

const DonationForm = ({ project }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      categoryType: undefined,
      endDate: undefined,
      province: '',
      city: '',
      street: '',
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const { token } = useAuth();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values) {
      router.push(`/project/${project.id}`);
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
          <section>
            <div>
              <h2 className="py-2 font-medium">Metodo de pago</h2>
            </div>
            <div className="grid gap-6">
              <RadioGroup defaultValue="card" className="flex gap-2 lg:gap-3">
                <div>
                  <RadioGroupItem
                    value="card"
                    id="card"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="card"
                    className="flex w-16 h-16 lg:w-24 lg:h-24 flex-col items-center justify-center rounded-sm border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-foreground [&:has([data-state=checked])]:border-foreground cursor-pointer"
                  >
                    <Icons.CreditCard className="w-12 lg:w-36" />
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="mercadolibre"
                    id="mercadolibre"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="mercadolibre"
                    className="flex w-16 h-16 lg:w-24 lg:h-24 flex-col items-center justify-center rounded-sm border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-foreground [&:has([data-state=checked])]:border-foreground cursor-pointer"
                  >
                    <Icons.MercadoLibreIcon className="w-12 lg:w-36" />
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="westernunion"
                    id="westernunion"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="westernunion"
                    className="flex w-16 h-16 lg:w-24 lg:h-24 flex-col items-center justify-center rounded-sm border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-foreground [&:has([data-state=checked])]:border-foreground cursor-pointer"
                  >
                    <Icons.WesternUnionIcon className="w-12 lg:w-36" />
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="paypal"
                    id="paypal"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="paypal"
                    className="flex w-16 h-16 lg:w-24 lg:h-24 flex-col items-center justify-center rounded-sm border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-foreground [&:has([data-state=checked])]:border-foreground cursor-pointer"
                  >
                    <Icons.PayPalIcon className="w-12 lg:w-36" />
                  </Label>
                </div>
              </RadioGroup>
              <div className="flex gap-2">
                <div className="grid gap-2 w-1/2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" placeholder="Nombre" className="bg-white" />
                </div>
                <div className="grid gap-2 w-1/2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    placeholder="Apellido"
                    className="bg-white"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo</Label>
                <Input id="email" placeholder="Correo" className="bg-white" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="number">Número de tarjeta</Label>
                <Input
                  id="number"
                  placeholder="Número de tarjeta"
                  className="bg-white"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="month">Fecha de vencimiento</Label>
                  <Select>
                    <SelectTrigger id="month" className="bg-white">
                      <SelectValue placeholder="Mes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Enero</SelectItem>
                      <SelectItem value="2">Febrero</SelectItem>
                      <SelectItem value="3">Marzo</SelectItem>
                      <SelectItem value="4">Abril</SelectItem>
                      <SelectItem value="5">Mayo</SelectItem>
                      <SelectItem value="6">Junio</SelectItem>
                      <SelectItem value="7">Julio</SelectItem>
                      <SelectItem value="8">Agosto</SelectItem>
                      <SelectItem value="9">Septiembre</SelectItem>
                      <SelectItem value="10">Octubre</SelectItem>
                      <SelectItem value="11">Noviembre</SelectItem>
                      <SelectItem value="12">Diciembre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="year">Año</Label>
                  <Select>
                    <SelectTrigger id="year" className="bg-white mt-auto">
                      <SelectValue placeholder="Año" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem
                          key={i}
                          value={`${new Date().getFullYear() + i}`}
                        >
                          {new Date().getFullYear() + i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">Código de seguridad</Label>
                  <Input id="cvc" placeholder="CVC" className="bg-white" />
                </div>
              </div>
            </div>
          </section>
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
          <Button type="submit" className="w-1/2 h-11 m-auto rounded-sm">
            Donar ahora
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default DonationForm;
