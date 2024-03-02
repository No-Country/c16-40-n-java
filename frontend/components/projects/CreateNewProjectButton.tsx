'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import LoginAlert from '@/components/loginAlert';

const CreateNewProjectButton = () => {
  const router = useRouter();

  return (
    <LoginAlert>
      <Button className="font-bold w-72 lg:w-96 h-12 rounded-full lg:text-xl mt-auto mx-auto">
        Inicia con Colaborapp!
      </Button>
      <Button
        className="font-bold w-72 lg:w-96 h-12 rounded-full lg:text-xl mt-auto mx-auto"
        onClick={() => router.push('/new-project')}
      >
        Inicia con Colaborapp!
      </Button>
    </LoginAlert>
  );
};
export default CreateNewProjectButton;
