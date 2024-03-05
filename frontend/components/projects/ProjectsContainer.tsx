'use client';
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
import { useEffect, useState } from 'react';
import { project } from '@/lib/actions/project/getProjectById';
import { Skeleton } from '../ui/skeleton';
import Loader from '../ui/loader';

const ProjectsContainer = () => {
  const [projects, setProjects] = useState<project[] | undefined>(undefined);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getAllProjects();
      setProjects(response);
      setFilteredProjects(response);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleFilter = (selectedCategory: string) => {
    setFilteredProjects(
      projects?.filter((project) => project.category === selectedCategory)
    );
  };

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
          <Select onValueChange={(e) => handleFilter(e)}>
            <SelectTrigger className="w-52 lg:w-64 font-medium bg-primary text-primary-foreground rounded-full border-0">
              <SelectValue placeholder="Recaudar fondos para" />
            </SelectTrigger>
            <SelectContent className="font-medium bg-primary text-primary-foreground border-0">
              <SelectItem
                className="text-primary-foreground cursor-pointer"
                value="HEALTH"
              >
                Salud
              </SelectItem>
              <SelectItem
                className="text-primary-foreground cursor-pointer"
                value="EDUCATION"
              >
                Educación
              </SelectItem>
              <SelectItem
                className="text-primary-foreground cursor-pointer"
                value="SOCIAL"
              >
                Social
              </SelectItem>
              <SelectItem
                className="text-primary-foreground cursor-pointer"
                value="ENVIRONMENT"
              >
                Medio ambiente
              </SelectItem>
              <SelectItem
                className="text-primary-foreground cursor-pointer"
                value="OTHER"
              >
                Otros
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center w-full min-h-64">
          <Loader className="w-48 h-48" />
        </div>
      ) : filteredProjects && filteredProjects?.length >= 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {filteredProjects?.map((data: any) => (
            <ProjectCard key={data.id} data={data} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-64">
          <p>No se encontraron proyectos de la categoría seleccionada.</p>
        </div>
      )}
    </section>
  );
};
export default ProjectsContainer;
