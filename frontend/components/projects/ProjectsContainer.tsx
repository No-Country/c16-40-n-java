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
import { getAllProjects } from '@/lib/actions/project/getAllProjects';

const ProjectsContainer = async () => {
  const projects = await getAllProjects();
  return (
    <section className="w-full flex flex-col pt-10">
      <div className="pb-5">
        <h2 className="text-base lg:text-xl font-bold">
          Explora todos los proyectos
        </h2>
        <div className="flex py-5 gap-3">
          <div className="relative">
            <Icons.Search className="absolute top-1/4 left-[5%] text-foreground" />
            <Input
              type="search"
              placeholder="Buscar"
              className="w-32 lg:w-52 rounded-full pl-10 border-2 border-foreground bg-white"
            />
          </div>
          <Select>
            <SelectTrigger className="w-52 lg:w-64 font-medium bg-primary text-primary-foreground rounded-full border-0">
              <SelectValue placeholder="Recaudar fondos para" />
            </SelectTrigger>
            <SelectContent className="font-medium bg-primary text-primary-foreground border-0">
              <SelectItem
                className="text-primary-foreground cursor-pointer"
                value="salud"
              >
                Salud
              </SelectItem>
              <SelectItem
                className="text-primary-foreground cursor-pointer"
                value="educacion"
              >
                Educación
              </SelectItem>
              <SelectItem
                className="text-primary-foreground cursor-pointer"
                value="social"
              >
                Social
              </SelectItem>
              <SelectItem
                className="text-primary-foreground cursor-pointer"
                value="ambiente"
              >
                Medio ambiente
              </SelectItem>
              <SelectItem
                className="text-primary-foreground cursor-pointer"
                value="otros"
              >
                Otros
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {projects?.map((data: any) => (
          <ProjectCard key={data.id} data={data} />
        ))}
      </div>
    </section>
  );
};
export default ProjectsContainer;
