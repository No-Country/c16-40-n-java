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

interface Props {
  action: () => Promise<void>;
}

const DeleteButton = ({ action }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-36" variant={'destructive'}>
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar proyecto</AlertDialogTitle>
          <AlertDialogDescription className="text-foreground">
            Esta seguro de que desea eliminar el proyecto? Esta acción no se
            puede desahacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white border-2 border-foreground text-foreground">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-red-700"
            onClick={action}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteButton;
