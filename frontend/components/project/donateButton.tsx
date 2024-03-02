import { Button } from '@/components/ui/button';
import LoginAlert from '@/components/loginAlert';

const DonateButton = () => {
  return (
    <LoginAlert>
      <Button className="w-56 md:w-80 rounded-full">Donar ahora</Button>
    </LoginAlert>
  );
};
export default DonateButton;
