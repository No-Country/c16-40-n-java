import { AppLogo } from '@/components/icons';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <AppLogo className="w-10 lg:w-14 h-auto" />
      <h1 className="text-2xl lg:text-4xl text-secondary-foreground">
        Colaborapp!
      </h1>
    </div>
  );
};
export default Logo;
