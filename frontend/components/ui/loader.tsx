import { cn } from '@/lib/utils';
import { Icons } from '../icons';

const Loader = ({ className }: { className?: string }) => {
  return (
    <Icons.Spinner
      className={cn('animate-spin text-primary stroke-1', className)}
    />
  );
};

export default Loader;
