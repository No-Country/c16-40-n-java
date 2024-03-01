import ProjectsContainer from '@/components/home/ProjectsContainer';
import CreateNewProjectButton from './CreateNewProjectButton';

const HomeContainer = () => {
  return (
    <section>
      <div className="bg-[url('/home_image.webp')] bg-center bg-cover pt-5 h-[36rem] md:h-[37rem] lg:h-[43rem]">
        <section className="flex flex-col items-center justify-center h-full gap-20 lg:gap-40 pt-20">
          <p className="text-primary-foreground font-semibold text-center text-4xl lg:text-6xl">
            Tu <span className="text-primary">apoyo</span> hace{' '}
            <span className="text-primary">lo imposible.</span>
          </p>
          <CreateNewProjectButton />
        </section>
      </div>
      <ProjectsContainer />
    </section>
  );
};
export default HomeContainer;
