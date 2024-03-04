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
      province?: string;
      city?: string;
      street?: string;
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
          <FormLabel>
            ¿En que categoría se encuentra tu proyecto para recaudar fondos?
          </FormLabel>
          <FormControl>
            <RadioGroup
              defaultValue={field.value}
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
                    className="flex flex-col text-muted-foreground items-center justify-between rounded-sm border border-muted-foreground bg-popover p-4 hover:bg-accent hover:text-foreground hover:border-foreground peer-data-[state=checked]:border-foreground [&:has([data-state=checked])]:border-foreground peer-data-[state=checked]:border-2 [&:has([data-state=checked])]:border-2 peer-data-[state=checked]:text-foreground [&:has([data-state=checked])]:text-foreground cursor-pointer w-36"
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
