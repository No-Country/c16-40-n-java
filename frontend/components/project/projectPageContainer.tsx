import { projectsData } from '@/lib/constants';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Icons } from '../icons';

interface Props {
  projectId: string;
}

const ProjectPageContainer = ({ projectId }: Props) => {
  const selectedProject = projectsData.find(
    (project) => project.id.toString() === projectId
  );

  return (
    <section className="flex flex-col items-center h-full">
      <div className="bg-[#d9d9d9] m-auto w-[95%] lg:w-5/6 rounded-lg px-5 py-10 mt-24 lg:mt-32 mb-10">
        <h2 className="text-xl lg:text-3xl text-start font-semibold">
          {selectedProject?.title}
        </h2>
        <div className="flex flex-col lg:flex-row gap-4 py-10">
          <div>
            {selectedProject?.image ? (
              <Image
                src={selectedProject?.image}
                alt={''}
                width={500}
                height={500}
                className="rounded-lg"
              />
            ) : (
              ''
            )}
            <Progress className="mt-5" value={selectedProject?.progress} />
            <p className="pt-1 font-semibold">
              {`$${selectedProject?.goalAmount.toLocaleString('es-ES')}`} ARS
            </p>
          </div>
          <div className="flex flex-col items-center m-auto gap-5">
            <div className="flex items-center mr-auto">
              <Icons.PlusIcon />{' '}
              <p className="font-semibold">
                {selectedProject?.goalAmount.toString().slice(0, 2)} donativos
              </p>
            </div>
            <Button className="w-56 md:w-80 rounded-full">Donar ahora</Button>
            <Button
              variant={'outline'}
              className="w-48 md:w-64 rounded-full bg-inherit border-2 border-foreground text-foreground"
            >
              Quiero ser voluntario
            </Button>
          </div>
        </div>
        <p>{selectedProject?.description}</p>
      </div>
    </section>
  );
};
export default ProjectPageContainer;
