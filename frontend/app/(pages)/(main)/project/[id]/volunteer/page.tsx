import VolunteerContainer from '@/components/project/volunteer/volunteerContainer';

const VolunteerPage = ({ params }: { params: { id: string } }) => {
  return <VolunteerContainer projectId={params.id} />;
};
export default VolunteerPage;
