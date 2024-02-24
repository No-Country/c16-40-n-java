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
    <Link href={`/project/${data.id}`}>
      <Card className="w-96 bg-white text-secondary-foreground cursor-pointer">
        <CardHeader className="text-lg">
          <CardTitle className="text-lg">{data.title}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Image src={data.image} alt={''} width={350} height={10} />
          <CardDescription>{data.description}</CardDescription>
        </CardContent>
        <CardFooter>
          <Progress value={data.progress} />
        </CardFooter>
      </Card>
    </Link>
  );
};
export default ProjectCard;
