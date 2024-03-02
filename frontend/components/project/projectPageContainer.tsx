import { Progress } from '@/components/ui/progress';
import { Icons } from '@/components/icons';
import { getProjectById } from '@/lib/actions/project/getProjectById';
import DonateButton from './donateButton';
import ColaborateButton from './colaborateButton';
import CreatorOptions from './creator/creatorOptions';

interface Props {
  projectId: string;
}

const ProjectPageContainer = async ({ projectId }: Props) => {
  const selectedProject = await getProjectById(projectId);

  return (
    <section className="flex flex-col items-center h-full">
      <div className="w-full py-10 mt-24 lg:mt-32 mb-10">
        <CreatorOptions
          projectId={selectedProject?.id}
          projectOwner={selectedProject?.creator.email}
        />
        <div className="bg-[#d9d9d9] p-5 m-auto w-[95%] lg:w-5/6 rounded-lg">
          <h2 className="text-xl lg:text-3xl text-start font-semibold">
            {selectedProject?.title}
          </h2>
          <div className="flex flex-col lg:flex-row gap-4 py-10 lg:h-96">
            <div className="w-full lg:w-1/2 h-64 lg:h-auto">
              {selectedProject?.image && (
                <div
                  className="bg-center bg-cover h-full rounded-lg"
                  style={{ backgroundImage: `url(${selectedProject.image})` }}
                />
              )}
            </div>
            <div className="flex flex-col items-center m-auto gap-5">
              <div>
                <p>Fecha de inicio: {selectedProject?.startDate}</p>
                <p>Fecha de finalización: {selectedProject?.endDate}</p>
              </div>
              <div className="flex items-center mr-auto">
                <Icons.PlusIcon />{' '}
                <p className="font-semibold">{selectedProject?.id} donativos</p>
              </div>
              <DonateButton projectId={selectedProject?.id} />
              <ColaborateButton projectId={selectedProject?.id} />
            </div>
          </div>
          <div className="wfull lg:w-1/2">
            <Progress
              value={
                (selectedProject?.currentAmount! * 100) /
                selectedProject?.goalAmount!
              }
            />
            <p className="pt-1 font-semibold">
              {`$${
                selectedProject?.goalAmount &&
                selectedProject.goalAmount.toLocaleString('es-ES')
              }`}{' '}
              ARS
            </p>
          </div>
          <p className="mt-4">{selectedProject?.description}</p>
        </div>
      </div>
    </section>
  );
};
export default ProjectPageContainer;
