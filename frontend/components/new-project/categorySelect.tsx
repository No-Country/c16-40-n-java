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
      title: string;
      description: string;
      image: string;
      goalAmount: number;
      categoryType: string;
      endDate: Date;
    },
    any
  >;
}

const CategorySelect = ({ form }: Props) => {
  return (
    <FormField
      control={form.control}
      name="categoryType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Categoría</FormLabel>
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className="border-none bg-zinc-300">
                <SelectValue placeholder="Categoría" {...field} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="EDUCATION">Educación</SelectItem>
              <SelectItem value="HEALTH">Salud</SelectItem>
              <SelectItem value="SOCIAL">Social</SelectItem>
              <SelectItem value="ENVIRONMENT">Medio ambiente</SelectItem>
              <SelectItem value="OTHER">Otro</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CategorySelect;
