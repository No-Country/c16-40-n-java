import { getProjectById } from '@/lib/actions/project/getProjectById';
import VolunteerForm from '@/components/project/volunteer/volunteerForm';

interface Props {
  projectId: string;
}

const VolunteerContainer = async ({ projectId }: Props) => {
  const selectedProject = await getProjectById(projectId);

  if (!selectedProject) {
    return (
      <div>
        <h2>Error</h2>
        <p>No se encontró el proyecto</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center h-full">
      <div className="w-[95%] lg:w-2/3 mt-28 lg:mt-36 pt-5 pb-10">
        <h2 className="text-2xl lg:text-3xl font-medium pb-4">
          Quiero ser voluntario.
        </h2>
        <p>
          Por favor, proporciónanos algunos datos para que el creador del
          proyecto pueda ponerse en contacto.
        </p>
      </div>
      <div className="flex flex-col bg-white rounded-lg p-5 lg:p-14 m-auto w-[95%] lg:w-2/3 mb-20">
        <VolunteerForm project={selectedProject} />
      </div>
    </section>
  );
};
export default VolunteerContainer;
