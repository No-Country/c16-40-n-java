import { projectsData } from '@/lib/constants';
import ProjectCard from '@/components/projectCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Icons } from '../icons';

const ProjectsContainer = () => {
  return (
    <section className="w-full flex flex-col p-5">
      <div className="pb-5">
        <h2 className="text-secondary-foreground text-base lg:text-xl font-bold">
          Descubre proyectos que te inspiren y te impulsen a actuar.
        </h2>
        <div className="flex py-5 gap-3">
          <div className="relative">
            <Icons.Search className="absolute top-1/4 left-[5%] text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar"
              className="w-32 lg:w-52 rounded-full pl-10"
            />
          </div>
          <Select>
            <SelectTrigger className="w-52 lg:w-64 font-medium bg-primary text-primary-foreground rounded-full">
              <SelectValue placeholder="Recaudar fondos para" />
            </SelectTrigger>
            <SelectContent className='font-medium bg-primary text-primary-foreground"'>
              <SelectItem className="text-primary-foreground" value="salud">
                Salud
              </SelectItem>
              <SelectItem className="text-primary-foreground" value="educacion">
                Educación
              </SelectItem>
              <SelectItem className="text-primary-foreground" value="social">
                Social
              </SelectItem>
              <SelectItem className="text-primary-foreground" value="ambiente">
                Medio ambiente
              </SelectItem>
              <SelectItem className="text-primary-foreground" value="otros">
                Otros
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 m-auto">
        {projectsData.map((data) => (
          <ProjectCard key={data.id} data={data} />
        ))}
      </div>
    </section>
  );
};
export default ProjectsContainer;
