'use client';
import { Button } from '@/components/ui/button';
import LoginAlert from '@/components/loginAlert';
import { useRouter } from 'next/navigation';

interface Props {
  projectId: number | undefined;
}

const DonateButton = ({ projectId }: Props) => {
  const router = useRouter();

  return (
    <LoginAlert>
      <Button className="w-56 md:w-80 rounded-full">Donar ahora</Button>
      <Button
        className="w-56 md:w-80 rounded-full"
        onClick={() => router.push(`/project/${projectId}/donation`)}
      >
        Donar ahora
      </Button>
    </LoginAlert>
  );
};
export default DonateButton;
