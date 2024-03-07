'use client';
import { Button } from '@/components/ui/button';
import LoginAlert from '@/components/loginAlert';
import { useRouter } from 'next/navigation';

interface Props {
  projectId: number | undefined;
  disabled: boolean;
}

const DonateButton = ({ projectId, disabled }: Props) => {
  const router = useRouter();

  return (
    <LoginAlert>
      <Button disabled={disabled} className="w-56 md:w-80 rounded-full mx-auto">
        Donar ahora
      </Button>
      <Button
        disabled={disabled}
        className="w-56 md:w-80 rounded-full mx-auto"
        onClick={() => router.push(`/project/${projectId}/donation`)}
      >
        Donar ahora
      </Button>
    </LoginAlert>
  );
};
export default DonateButton;
