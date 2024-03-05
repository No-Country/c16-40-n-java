import { getProjectById } from '@/lib/actions/project/getProjectById';
import DonationForm from '@/components/project/donation/donationForm';

interface Props {
  projectId: string;
}

const DonationContainer = async ({ projectId }: Props) => {
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
      <DonationForm project={selectedProject} />
    </section>
  );
};
export default DonationContainer;
