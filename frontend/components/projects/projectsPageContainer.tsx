import Image from 'next/image';
import CreateNewProjectButton from '@/components/projects/CreateNewProjectButton';
import ProjectsContainer from '@/components/projects/ProjectsContainer';

const ProjectsPageContainer = () => {
  return (
    <section className="flex flex-col items-center h-full">
      <div className="m-auto w-[95%] lg:w-5/6 rounded-lg py-10 mt-24 lg:mt-32 mb-10">
        <div className="flex flex-col md:flex-row gap-3 lg:h-80 xl:h-96 border-gray-400 border-b-2">
          <div className="flex flex-col gap-5 pb-10">
            <p className="font-bold text-2xl">
              La creatividad y la pasión lo impulsan Permitamos que otros se
              sumen y lo mejoren aún más.
            </p>
            <p>
              Puedes ayudar a otros contribuyendo a su campaña de recaudación de
              fondos o iniciando una para alguien cercano a ti que lo necesite
            </p>
            <CreateNewProjectButton />
          </div>
          <div className="flex items-center h-auto">
            <Image
              className="rounded-lg"
              src={'/projects_image.webp'}
              alt={''}
              width={550}
              height={550}
              priority
            />
          </div>
        </div>
        <ProjectsContainer />
      </div>
    </section>
  );
};
export default ProjectsPageContainer;
