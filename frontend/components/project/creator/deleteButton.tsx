import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { deleteProject } from '@/lib/actions/project/deleteProject';
import { useRouter } from 'next/navigation';

interface Props {
  projectId: number;
  token: string;
}

const DeleteButton = ({ projectId, token }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteProject = async (projectId: number, token: string) => {
    const response = await deleteProject(projectId, token);
    if (response) {
      router.push(`/`);
      return toast({
        className: 'bg-green-500 text-green-100',
        title: 'Todo salió bien!',
        description: 'Se dió de baja exitosamente el proyecto.',
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
    } else {
      return toast({
        variant: 'destructive',
        title: '¡Ups! Algo salió mal!',
        description:
          'Hubo un problema al intentar dar de baja el proyecto, por favor intente nuevamente.',
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-36" variant={'destructive'}>
          Dar de baja
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Dar de baja el proyecto</AlertDialogTitle>
          <AlertDialogDescription className="text-foreground">
            Esta seguro de que desea dar de baja el proyecto? Esta acción no se
            puede desahacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white border-2 border-foreground text-foreground">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-red-700"
            onClick={() => handleDeleteProject(projectId, token)}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteButton;
