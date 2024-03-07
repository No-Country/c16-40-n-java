'use client';

import { project } from '@/lib/actions/project/getProjectById';
import ColaborateButton from './colaborateButton';
import DonateButton from './donateButton';
import { useAuth } from '@/providers/authProvider';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

interface Props {
  project: project | undefined;
}

const ProjectActions = ({ project }: Props) => {
  const { userData } = useAuth();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [userData]);

  if (isLoading) {
    return (
      <>
        <Skeleton className="w-56 md:w-80 h-10 rounded-full mx-auto" />
        <Skeleton className="w-48 md:w-64 h-10 rounded-full mx-auto" />
      </>
    );
  }

  return (
    <>
      <DonateButton
        disabled={userData === project?.creator.email}
        projectId={project?.id}
      />
      <ColaborateButton
        disabled={userData === project?.creator.email}
        projectId={project?.id}
      />
    </>
  );
};
export default ProjectActions;
