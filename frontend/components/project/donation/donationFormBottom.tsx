'use client';
import { Icons } from '@/components/icons';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<
    {
      amount: number;
      name: string;
      lastName: string;
      email: string;
    },
    any,
    {
      amount: number;
      name: string;
      lastName: string;
      email: string;
    }
  >;
}

const DonationFormBottom = ({ form }: Props) => {
  return (
    <section>
      <div>
        <h2 className="py-2 font-medium">Metodo de pago</h2>
      </div>
      <div className="grid gap-6">
        <RadioGroup defaultValue="card" className="flex gap-2 lg:gap-3">
          <div>
            <RadioGroupItem value="card" id="card" className="peer sr-only" />
            <Label
              htmlFor="card"
              className="flex w-16 h-16 lg:w-20 lg:h-20 flex-col items-center justify-center rounded-sm border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-foreground [&:has([data-state=checked])]:border-foreground cursor-pointer"
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
              className="flex w-16 h-16 lg:w-20 lg:h-20 flex-col items-center justify-center rounded-sm border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-foreground [&:has([data-state=checked])]:border-foreground cursor-pointer"
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
              className="flex w-16 h-16 lg:w-20 lg:h-20 flex-col items-center justify-center rounded-sm border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-foreground [&:has([data-state=checked])]:border-foreground cursor-pointer"
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
              className="flex w-16 h-16 lg:w-20 lg:h-20 flex-col items-center justify-center rounded-sm border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-foreground [&:has([data-state=checked])]:border-foreground cursor-pointer"
            >
              <Icons.PayPalIcon className="w-12 lg:w-36" />
            </Label>
          </div>
        </RadioGroup>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-medium text-base">Nombre</FormLabel>
                <FormControl>
                  <Input
                    className="border border-foreground bg-white rounded-sm"
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
                <FormLabel className="font-medium text-base">
                  Apellido
                </FormLabel>
                <FormControl>
                  <Input
                    className="border border-foreground bg-white rounded-sm"
                    placeholder="Apellido"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-medium text-base">Correo</FormLabel>
                <FormControl>
                  <Input
                    className="border border-foreground bg-white rounded-sm"
                    placeholder="Correo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="number">Número de tarjeta</Label>
          <Input
            id="number"
            placeholder="Número de tarjeta"
            className="border border-foreground bg-white rounded-sm"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="month">Fecha de vencimiento</Label>
            <Select>
              <SelectTrigger
                id="month"
                className="border border-foreground bg-white rounded-sm"
              >
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
              <SelectTrigger
                id="year"
                className="border border-foreground bg-white rounded-sm mt-auto"
              >
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => (
                  <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                    {new Date().getFullYear() + i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cvc">Código de seguridad</Label>
            <Input
              id="cvc"
              placeholder="CVC"
              className="border border-foreground bg-white rounded-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default DonationFormBottom;
