import ProjectPageContainer from '@/components/project/projectPageContainer';

const ProjectPage = ({ params }: { params: { id: string } }) => {
  return <ProjectPageContainer projectId={params.id} />;
};
export default ProjectPage;
