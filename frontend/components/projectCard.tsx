import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

interface Props {
  data: {
    id: number;
    title: string;
    image: string;
    description: string;
    goalAmount: number;
    progress: number;
  };
}

const ProjectCard = ({ data }: Props) => {
  return (
    <Link href={`/project/${data.id}`} className="m-auto">
      <Card className="w-auto bg-white text-foreground cursor-pointer">
        <CardHeader className="text-lg">
          <CardTitle className="text-lg">{data.title}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Image src={data.image} alt={''} width={350} height={10} />
          <CardDescription className="text-foreground line-clamp-3">
            {data.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex flex-col gap-1">
          <Progress className="border-1" value={data.progress} />
          <p className="mr-auto font-semibold">
            {`$${data?.goalAmount.toLocaleString('es-ES')}`} ARS
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};
export default ProjectCard;
