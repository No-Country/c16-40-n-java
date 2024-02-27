import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import RegisterForm from '@/components/register/registerForm';

const RegisterPageContainer = () => {
  return (
    <section className="flex flex-col justify-center items-center m-auto px-5 pb-10 mt-28 lg:mt-40">
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
    </section>
  );
};
export default RegisterPageContainer;
