import ProjectCard from '@/components/projectCard';
import { getAllProjects } from '@/lib/actions/project/getAllProjects';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HomeProjectsContainer = async () => {
  const projects = await getAllProjects();
  return (
    <section className="w-full flex flex-col p-5">
      <div className="pb-5">
        <h2 className="text-base lg:text-xl font-bold">
          Descubre proyectos que te inspiren y te impulsen a actuar.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {projects?.map((data: any) => (
          <ProjectCard key={data.id} data={data} />
        ))}
      </div>
      <div className="flex items-center justify-center py-5 gap-3">
        <Link href={'/projects'}>
          <Button className="font-bold w-64 lg:w-72 h-10 rounded-full lg:text-lg">
            Ver todos los proyectos
          </Button>{' '}
        </Link>
      </div>
    </section>
  );
};
export default HomeProjectsContainer;
