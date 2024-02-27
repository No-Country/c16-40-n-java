import { Button } from '@/components/ui/button';
import ProjectsContainer from '@/components/home/ProjectsContainer';
import Link from 'next/link';

const HomeContainer = () => {
  return (
    <section>
      <div className="bg-[url('/home_image.webp')] bg-center bg-cover pt-5 h-[36rem] md:h-[37rem] lg:h-[43rem]">
        <section className="flex flex-col items-center justify-center h-full gap-20 lg:gap-40 pt-20">
          <p className="text-primary-foreground font-semibold text-center text-4xl lg:text-6xl">
            Tu <span className="text-primary">apoyo</span> hace{' '}
            <span className="text-primary">lo imposible.</span>
          </p>
          <Link href={'/new-project'}>
            <Button className="font-bold w-72 lg:w-96 h-12 rounded-full lg:text-2xl">
              Comienza tu proyecto!
            </Button>
          </Link>
        </section>
      </div>
      <ProjectsContainer />
    </section>
  );
};
export default HomeContainer;
