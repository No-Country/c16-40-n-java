import { getProjectById } from '@/lib/actions/project/getProjectById';
import EditForm from './editForm';

interface Props {
  projectId: string;
}

const EditContainer = async ({ projectId }: Props) => {
  const selectedProject = await getProjectById(projectId);

  return (
    <section className="flex flex-col items-center h-full">
      <div className="bg-white m-auto w-[95%] lg:w-1/2 rounded-lg px-5 py-10 mt-28 lg:mt-36 mb-10 flex flex-col lg:flex-row justify-between gap-5">
        {selectedProject && <EditForm project={selectedProject} />}
      </div>
    </section>
  );
};
export default EditContainer;
