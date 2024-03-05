'use client';

import { Button } from '@/components/ui/button';
import LoginAlert from '@/components/loginAlert';
import { useRouter } from 'next/navigation';

interface Props {
  projectId: number | undefined;
}

const ColaborateButton = ({ projectId }: Props) => {
  const router = useRouter();

  return (
    <LoginAlert>
      <Button
        variant={'outline'}
        className="w-48 md:w-64 rounded-full bg-inherit border-2 border-foreground text-foreground"
        onClick={() => router.push(`/project/${projectId}/volunteer`)}
      >
        Quiero ser voluntario
      </Button>
    </LoginAlert>
  );
};
export default ColaborateButton;
