import Navbar from '@/components/navbar/Navbar';
import { Button } from '@/components/ui/button';
import ProjectsContainer from './ProjectsContainer';
import Footer from '../footer';

const HomeContainer = () => {
  return (
    <main className="h-full w-full">
      <Navbar />
      <div className="bg-[url('/home_image.png')] bg-center bg-cover pt-5 h-[85%] lg:h-[90%]">
        <section className="flex flex-col items-center justify-center h-full gap-20 lg:gap-40 pt-20">
          <p className="text-primary-foreground font-semibold text-center text-4xl lg:text-6xl">
            Tu <span className="text-primary">apoyo</span> hace{' '}
            <span className="text-primary">lo imposible.</span>
          </p>
          <Button className="font-bold w-96 h-12 rounded-full lg:text-2xl">
            Comienza tu proyecto!
          </Button>
        </section>
      </div>
      <ProjectsContainer />
      <Footer />
    </main>
  );
};
export default HomeContainer;
