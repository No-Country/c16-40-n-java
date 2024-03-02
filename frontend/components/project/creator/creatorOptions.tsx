'use client';

import { deleteProject } from '@/lib/actions/project/deleteProject';
import { Button } from '../../ui/button';
import { useAuth } from '@/providers/authProvider';
import { useEffect, useState } from 'react';
import { Icons } from '../../icons';
import DeleteButton from './deleteButton';
import { useRouter } from 'next/navigation';

interface Props {
  projectId: number | undefined;
}

const CreatorOptions = ({ projectId }: Props) => {
  const { token } = useAuth();
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [token]);

  const handleDeleteProject = async (projectId: number, token: string) => {
    await deleteProject(projectId, token);
    console.log('DELETING...');
  };

  if (isLoading) return <></>;

  return (
    <>
      {projectId && token && (
        <div className="flex flex-col items-center md:flex-row m-auto w-full md:px-5 lg:px-0 lg:w-5/6 rounded-lg gap-5 md:gap-0 pb-10">
          <p className="flex items-center gap-1 text-sm lg:text-base">
            <Icons.Eye /> De esta manera visualizan otros tu proyecto.
          </p>
          <div className="md:ml-auto flex gap-4">
            <Button
              variant={'secondary'}
              className="border-2 border-foreground w-36"
              onClick={() => router.push(`/project/${projectId}/edit`)}
            >
              Editar
            </Button>
            <DeleteButton
              action={() => handleDeleteProject(projectId, token)}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default CreatorOptions;