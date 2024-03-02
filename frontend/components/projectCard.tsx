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
    creator: {
      id: number;
      name: string;
      lastName: string;
      email: string;
      phoneNumber: string | null;
    };
    category: string;
    title: string;
    status: string;
    image: string;
    description: string;
    goalAmount: number;
    currentAmount: number;
    startDate: string;
    endDate: string;
  };
}

const ProjectCard = ({ data }: Props) => {
  return (
    <Link href={`/project/${data.id}`} className="flex flex-col h-full">
      <Card className="w-auto h-full bg-white text-foreground cursor-pointer">
        <CardHeader className="text-lg">
          <CardTitle className="text-lg">{data.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col p-0">
          <div className="w-full h-48">
            {data?.image && (
              <div
                className="bg-center bg-cover h-full"
                style={{ backgroundImage: `url(${data.image})` }}
              />
            )}
          </div>
          <div>
            <CardDescription className="text-foreground line-clamp-3">
              {data.description}
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-1">
          <Progress
            className="border-1"
            value={(data.currentAmount * 100) / data.goalAmount}
          />
          <p className="mr-auto font-semibold">
            {`$${data?.goalAmount.toLocaleString('es-ES')}`} ARS
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};
export default ProjectCard;
