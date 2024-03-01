import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface Props {
  form: UseFormReturn<
    {
      title: string;
      description: string;
      image: string;
      goalAmount: number;
      province: string;
      locality: string;
      address: string;
      categoryType: string;
      endDate: Date;
    },
    any
  >;
}

const availeableCategories = [
  { id: 1, name: 'Educación', value: 'EDUCATION' },
  { id: 2, name: 'Salud', value: 'HEALTH' },
  { id: 3, name: 'Social', value: 'SOCIAL' },
  { id: 4, name: 'Medio ambiente', value: 'ENVIRONMENT' },
  { id: 5, name: 'Otros', value: 'OTHER' },
];

const CategorySelect = ({ form }: Props) => {
  return (
    <FormField
      control={form.control}
      name="categoryType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Categoría</FormLabel>
          <FormControl>
            <RadioGroup
              defaultValue={undefined}
              className="flex flex-wrap justify-center gap-4"
            >
              {availeableCategories.map((category) => (
                <div key={category.id}>
                  <RadioGroupItem
                    {...field}
                    value={category.value}
                    id={category.value}
                    onClick={field.onChange}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={category.value}
                    className="flex flex-col items-center justify-between rounded-md border border-foreground bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer lg:min-w-max"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CategorySelect;
