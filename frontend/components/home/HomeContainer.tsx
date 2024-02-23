import Navbar from '@/components/navbar/Navbar';
import { Button } from '@/components/ui/button';

const HomeContainer = () => {
  return (
    <>
      <Navbar />
      <main className="h-full w-full">
        <div className="bg-[url('/home_image.png')] bg-center bg-cover pt-5 h-[calc(100dvh-10%)]">
          <section className="flex flex-col items-center justify-center h-full gap-20 lg:gap-40">
            <p className="text-primary-foreground font-semibold text-center text-4xl lg:text-6xl">
              Tu <span className="text-primary">apoyo</span> hace{' '}
              <span className="text-primary">lo imposible.</span>
            </p>
            <Button className="font-bold w-96 h-12 rounded-full lg:text-2xl">
              Comienza tu proyecto!
            </Button>
          </section>
        </div>
      </main>
    </>
  );
};
export default HomeContainer;
