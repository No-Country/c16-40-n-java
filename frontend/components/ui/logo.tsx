import { Icons } from '@/components/icons';

interface Props {
  variant?: 'default' | 'light';
}

const Logo = ({ variant }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Icons.AppLogo className="w-10 lg:w-14 h-auto" />
      <h1
        className={`text-2xl lg:text-4xl ${
          variant === 'light' ? 'text-white' : 'text-secondary-foreground'
        }`}
      >
        Colaborapp!
      </h1>
    </div>
  );
};
export default Logo;
