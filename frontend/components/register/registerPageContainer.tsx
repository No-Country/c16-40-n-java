import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Logo from '@/components/ui/logo';
import RegisterForm from './registerForm';

const RegisterPageContainer = () => {
  return (
    <main className="h-full w-full px-5">
      <div className="w-[100%] lg:w-5/6 h-16 p-2 mt-5 lg:mt-10 flex items-center rounded-full bg-primary mx-auto">
        <Logo />
      </div>
      <div className="flex flex-col justify-center items-center m-auto py-10">
        <div className="md:w-1/2">
          <h2 className="text-3xl mb-5">Registrarse</h2>
          <RegisterForm />
          <div className="flex items-center space-x-2 py-5">
            <Checkbox id="terms" className="rounded-none self-start" />
            <Label htmlFor="terms" className="font-normal">
              Recibe consejos que te ayudarán a aprovechar al máximo tu
              recaudación de fondos y actualizaciones sobre causas importantes.
              Puedes darte de baja en cualquier momento.
            </Label>
          </div>
          <p className="text-sm md:text-base">
            Al hacer clic en el botón Regístrate que aparece a continuación,
            aceptas los Términos de Servicio de Colaborapp y declaras tu
            conformidad con la Declaración de Privacidad.
          </p>
        </div>
      </div>

      <footer className="w-full h-40 bg-primary"></footer>
    </main>
  );
};
export default RegisterPageContainer;
