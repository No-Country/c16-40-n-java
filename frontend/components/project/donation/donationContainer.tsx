import { getProjectById } from '@/lib/actions/project/getProjectById';
import DonationForm from './donationForm';

interface Props {
  projectId: string;
}

const DonationContainer = async ({ projectId }: Props) => {
  const selectedProject = await getProjectById(projectId);

  return (
    <section className="flex flex-col items-center h-full">
      <div className="bg-white m-auto w-[95%] lg:w-2/3 rounded-lg p-5 lg:p-14 mt-28 lg:mt-36 mb-10 flex flex-col lg:flex-row justify-between gap-5">
        {selectedProject && (
          <div className="flex flex-col">
            <div className="w-full h-64">
              {selectedProject?.image && (
                <div
                  className="bg-center bg-cover h-full rounded-lg"
                  style={{ backgroundImage: `url(${selectedProject.image})` }}
                />
              )}
            </div>
            <p className="py-5">
              Estás respaldando el proyecto de{' '}
              <span className="font-semibold">
                {`"${selectedProject.title}"`}
              </span>
              , tu generosa contribución se destinará directamente al creador
              del proyecto, beneficiándolo/a directamente a{' '}
              <span className="font-semibold">
                {selectedProject.creator.name}{' '}
                {selectedProject.creator.lastName}
              </span>
              .
            </p>
            <DonationForm project={selectedProject} />
            <p className="pt-10">
              Al elegir el método de pago anterior, aceptas los Términos de
              Servicio de Colaborapp! y declaras tu conformidad con la
              Declaración de Privacidad.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
export default DonationContainer;
