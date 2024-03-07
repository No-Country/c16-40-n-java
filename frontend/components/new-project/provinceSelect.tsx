import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
      categoryType: string;
      title: string;
      description: string;
      image: string;
      goalAmount: number;
      endDate: Date;
      address: {
        province: string;
        city: string;
        street?: string | undefined;
        number?: number | undefined;
      };
    },
    any
  >;
}

const availableProvinces = [
  { id: 1, name: 'Catamarca', value: 'CATAMARCA' },
  { id: 2, name: 'Chaco', value: 'CHACO' },
  { id: 3, name: 'Chubut', value: 'CHUBUT' },
  { id: 4, name: 'Córdoba', value: 'CORDOBA' },
  { id: 5, name: 'Corrientes', value: 'CORRIENTES' },
  { id: 6, name: 'Entre Rios', value: 'ENTRE_RIOS' },
  { id: 7, name: 'Formosa', value: 'FORMOSA' },
  { id: 8, name: 'Jujuy', value: 'JUJUY' },
  { id: 9, name: 'La Pampa', value: 'LA_PAMPA' },
  { id: 10, name: 'La Rioja', value: 'LARIOJA' },
  { id: 11, name: 'Mendoza', value: 'MENDOZA' },
  { id: 12, name: 'Misiones', value: 'MISIONES' },
  { id: 13, name: 'Neuquen', value: 'NEUQUEN' },
  { id: 14, name: 'Buenos Aires', value: 'BUENOS_AIRES' },
  { id: 15, name: 'Salta', value: 'SALTA' },
  { id: 16, name: 'San Juan', value: 'SAN_JUAN' },
  { id: 17, name: 'San Luis', value: 'SAN_LUIS' },
  { id: 18, name: 'Santa Cruz', value: 'SANTA_CRUZ' },
  { id: 19, name: 'Santa Fe', value: 'SANTA_FE' },
  { id: 20, name: 'Tucuman', value: 'TUCUMAN' },
  { id: 21, name: 'Tierra del Fuego', value: 'TIERRA_DEL_FUEGO' },
  { id: 22, name: 'Rio Negro', value: 'RIO_NEGRO' },
];

const ProvinceSelect = ({ form }: Props) => {
  return (
    <FormField
      control={form.control}
      name="address.province"
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>Provincia</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="border border-foreground bg-white rounded-sm">
                <SelectValue
                  className="cursor-pointer"
                  placeholder="Provincia"
                  {...field}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {availableProvinces.map((element) => (
                <SelectItem key={element.id} value={element.value}>
                  {element.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProvinceSelect;
