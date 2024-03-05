import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { project } from '@/lib/actions/project/getProjectById';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  project: project;
  donationData: {
    amount: number;
    user: string;
  };
}

const DonationSuccesfulDialog = ({
  project,
  donationData,
  open,
  setOpen,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[95%] md:max-w-xl p-5 md:p-14 bg-white border border-foreground">
        <DialogHeader>
          <DialogTitle className="text-center text-primary text-xl lg:text-3xl font-medium">
            ¡Gracias!
          </DialogTitle>
          <DialogDescription className="text-center text-primary text-lg lg:text-xl">
            Tu ayuda nos da el ánimo de continuar.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <p className="font-medium text-lg lg:text-xl">
            Los ${donationData.amount} fueron enviados éxitosamente a{' '}
            {project.creator.name} {project.creator.lastName}.
          </p>
          <div className="flex flex-col gap-2 text-sm lg:text-base">
            <p>
              Nombre del proyecto:{' '}
              <span className="font-medium">{project.title}.</span>
            </p>
            <p>
              Beneficiario:{' '}
              <span className="font-medium">
                {project.creator.name} {project.creator.lastName}.
              </span>
            </p>
            <p>
              Donante: <span className="font-medium">{donationData.user}.</span>
            </p>
            <p>
              Monto:{' '}
              <span className="font-medium">${donationData.amount}.</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DonationSuccesfulDialog;
