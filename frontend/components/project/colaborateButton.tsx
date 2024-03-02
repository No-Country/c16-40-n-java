import { Button } from '@/components/ui/button';
import LoginAlert from '@/components/loginAlert';

const ColaborateButton = () => {
  return (
    <LoginAlert>
      <Button
        variant={'outline'}
        className="w-48 md:w-64 rounded-full bg-inherit border-2 border-foreground text-foreground"
      >
        Quiero ser voluntario
      </Button>
    </LoginAlert>
  );
};
export default ColaborateButton;
