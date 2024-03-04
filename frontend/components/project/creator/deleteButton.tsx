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
        <Button
          className="border-2 border-destructive text-destructive lg:w-52 rounded-sm hover:bg-red-700 hover:text-white"
          variant={'secondary'}
        >
          Dar de baja el proyecto
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] rounded-lg bg-white px-14 pt-14">
        <AlertDialogHeader>
          <AlertDialogTitle>Dar de baja el proyecto</AlertDialogTitle>
          <AlertDialogDescription className="text-foreground py-5">
            Estás a punto de eliminar tu proyecto de recaudación de fondos.
            ¿Estás seguro/a de que deseas proceder? Ten en cuenta que esta
            acción no se puede deshacer y se perderán todos los datos asociados
            al proyecto. Por favor, confirma tu decisión para continuar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex w-full md:justify-center">
          <AlertDialogCancel className="bg-white border-2 border-foreground text-foreground rounded-sm lg:w-1/2">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-inherit border-2 border-destructive text-destructive hover:bg-red-700 hover:text-white rounded-sm lg:w-1/2"
            onClick={() => handleDeleteProject(projectId, token)}
          >
            Dar de baja el proyecto
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteButton;
