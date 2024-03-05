import { project } from '@/lib/actions/project/getProjectById';

interface Props {
  project: project;
}

const DonationFormTop = ({ project }: Props) => {
  return (
    <>
      <div className="w-full h-64">
        {project?.image && (
          <div
            className="bg-center bg-cover h-full rounded-lg"
            style={{ backgroundImage: `url(${project.image})` }}
          />
        )}
      </div>
      <p className="py-5">
        Estás respaldando el proyecto de{' '}
        <span className="font-semibold">{`"${project.title}"`}</span>, tu
        generosa contribución se destinará directamente al creador del proyecto,
        beneficiándolo/a directamente a{' '}
        <span className="font-semibold">
          {project.creator.name} {project.creator.lastName}
        </span>
        .
      </p>
    </>
  );
};
export default DonationFormTop;
