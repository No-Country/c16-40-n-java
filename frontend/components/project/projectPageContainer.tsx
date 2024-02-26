import { projectsData } from '@/lib/constants';
import Image from 'next/image';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import Footer from '../footer';
import Navbar from '../navbar/Navbar';

interface Props {
  projectId: string;
}

const ProjectPageContainer = ({ projectId }: Props) => {
  const selectedProject = projectsData.find(
    (project) => project.id.toString() === projectId
  );

  return (
    <main>
      <Navbar />
      <div className="flex flex-col items-center h-full">
        <div className="bg-[#d9d9d9] m-auto w-[95%] lg:w-5/6 rounded-lg px-5 py-10 mt-24 lg:mt-32 mb-10">
          <h2 className="text-xl lg:text-3xl text-start">
            {selectedProject?.title}
          </h2>
          <div className="flex flex-col lg:flex-row gap-4 py-10">
            <div>
              {selectedProject?.image ? (
                <Image
                  src={selectedProject?.image}
                  alt={''}
                  width={500}
                  height={500}
                  className="rounded-lg"
                />
              ) : (
                ''
              )}
              <Progress className="mt-5" value={selectedProject?.progress} />
              <p>{`$${selectedProject?.goalAmount}`}</p>
            </div>
            <div className="flex items-center m-auto">
              <Button className="w-32 lg:w-80">Donar ahora</Button>
            </div>
          </div>
          <p>{selectedProject?.description}</p>
        </div>
      </div>
      <Footer />
    </main>
  );
};
export default ProjectPageContainer;
