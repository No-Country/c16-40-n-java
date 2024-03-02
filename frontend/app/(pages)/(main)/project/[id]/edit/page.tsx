import EditContainer from '@/components/project/edit/editContainer';

const EditProjectPage = ({ params }: { params: { id: string } }) => {
  return <EditContainer projectId={params.id} />;
};
export default EditProjectPage;
