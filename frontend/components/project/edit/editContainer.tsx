import { getProjectById } from '@/lib/actions/project/getProjectById';
import EditForm from './editForm';

interface Props {
  projectId: string;
}

const EditContainer = async ({ projectId }: Props) => {
  const selectedProject = await getProjectById(projectId);

  return (
    <section className="flex flex-col items-center h-full">
      <div className="m-auto w-[95%] lg:w-3/4 rounded-lg px-5 py-10 mt-20 lg:mt-28 mb-10 flex flex-col lg:flex-row justify-between gap-5">
        <div>
          <h2 className="text-xl lg:text-2xl font-medium">
            Editar tu proyecto
          </h2>
          {selectedProject && <EditForm project={selectedProject} />}
        </div>
      </div>
    </section>
  );
};
export default EditContainer;
