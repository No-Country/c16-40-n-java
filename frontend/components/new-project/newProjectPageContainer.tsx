import { Icons } from '../icons';
import NewProjectForm from './newProjectForm';

const NewProjectPageContainer = () => {
  return (
    <section className="flex flex-col items-center h-full">
      <div className="m-auto w-[95%] lg:w-5/6 rounded-lg px-5 py-10 mt-20 lg:mt-24 mb-10 flex flex-col lg:flex-row justify-between gap-5">
        <div className="flex flex-col items-center justify-center gap-4 p-5 lg:w-2/6">
          <Icons.AppLogo className="w-24 h-24 lg:w-48 lg:h-48 mx-auto" />
          <h2 className="font-medium">
            ¡Dale! a empezar a juntar fondos desde ahora mismo.
          </h2>
          <p className="text-start">
            Nuestra ayuda está disponible para ti en cada paso de este proceso.
          </p>
        </div>
        <div className="flex flex-col bg-white rounded-lg p-5 lg:p-10 lg:w-4/6">
          <h2 className="text-3xl mb-5 font-semibold">Crear un proyecto</h2>
          <NewProjectForm />
        </div>
      </div>
    </section>
  );
};
export default NewProjectPageContainer;
