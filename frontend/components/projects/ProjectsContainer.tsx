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
import { useEffect, useState } from 'react';
import { project } from '@/lib/actions/project/getProjectById';
import { Skeleton } from '../ui/skeleton';
import { getProjectsByCategory } from '@/lib/actions/project/getProjectsByCategory';

const ProjectsContainer = () => {
  const [projects, setProjects] = useState<project[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getProjectsByCategory('ALL');
      setProjects(response);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleFilter = async (selectedCategory: string) => {
    setIsLoading(true);
    const data = await getProjectsByCategory(selectedCategory);
    setProjects(data);
    setIsLoading(false);
  };

  return (
    <section className="w-full flex flex-col pt-10 p-5">
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
                value="ALL"
              >
                Todos
              </SelectItem>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          <Skeleton className="w-full h-96" />
          <Skeleton className="w-full h-96" />
          <Skeleton className="w-full h-96" />
        </div>
      ) : projects && projects.length >= 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {projects.map((data: any) => (
            <ProjectCard key={data.id} data={data} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-96">
          <p>No se encontraron proyectos de la categoría seleccionada.</p>
        </div>
      )}
    </section>
  );
};
export default ProjectsContainer;
