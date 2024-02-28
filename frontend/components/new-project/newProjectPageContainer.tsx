import NewProjectForm from './newProjectForm';

const NewProjectPageContainer = () => {
  return (
    <section className="flex flex-col items-center h-full">
      <div className="m-auto w-[95%] lg:w-5/6 rounded-lg px-5 py-10 mt-20 lg:mt-24 mb-10">
        <h2 className="text-3xl mb-5">Crear proyecto</h2>
        <NewProjectForm />
      </div>
    </section>
  );
};
export default NewProjectPageContainer;
