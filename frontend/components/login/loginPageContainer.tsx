import { Icons } from '@/components/icons';
import LoginForm from '@/components/login/loginForm';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import Logo from '@/components/ui/logo';

const LoginPageContainer = () => {
  return (
    <main className="h-full w-full px-5">
      <div className="w-[100%] lg:w-5/6 h-16 p-2 mt-5 lg:mt-10 flex items-center rounded-full bg-primary mx-auto">
        <Logo />
      </div>
      <div className="flex flex-col md:flex-row w-[95%] md:w-[75%] items-center m-auto py-10">
        <div className="flex flex-col items-center gap-5 md:w-1/2">
          <Icons.AppLogo className="w-24 lg:w-60 h-auto" />
          <h2 className="text-4xl">Bienvenido!</h2>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl mb-5">Iniciar sesión</h2>
          <LoginForm />
          <div className="flex items-center space-x-2 py-5">
            <Checkbox id="terms" className="rounded-none" />
            <Label htmlFor="remember me">Recordarme</Label>
          </div>
          <p className="text-sm md:text-base">
            Recibe una notificación cuando tus amigos patrocinen y publiquen
            proyectos. Nunca publicaremos nada en Facebook sin tu permiso. Si
            continúas con Facebook, importaremos tu nombre y foto de perfil, y
            accederemos a tu lista de amigos.
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full items-center h-32 justify-between mb-10">
        <div className="border border-black w-full" />
        <p>
          ¿Nuevo usuario en Colaborapp?{' '}
          <Link href={'/register'}>
            <span className="hover:underline underline-offset-2">
              ¡Regístrame!
            </span>
          </Link>
        </p>
        <div className="border border-black w-full" />
      </div>
      <footer className="w-full h-40 bg-primary"></footer>
    </main>
  );
};
export default LoginPageContainer;
