import { Icons } from '@/components/icons';
import LoginForm from '@/components/login/loginForm';
import Link from 'next/link';

const LoginPageContainer = () => {
  return (
    <section>
      <div className="flex flex-col md:flex-row w-[95%] lg:w-5/6 lg:px-0 items-center m-auto px-5 pb-10 mt-28 lg:mt-40">
        <div className="flex sm:flex-col items-center gap-5 md:w-1/2">
          <Icons.AppLogo className="w-24 lg:w-60 h-auto" />
          <h2 className="text-4xl">Bienvenido!</h2>
        </div>
        <div className="md:w-1/2 pt-8 lg:pt-0">
          <h2 className="text-3xl mb-5">Iniciar sesión</h2>
          <LoginForm />
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
    </section>
  );
};
export default LoginPageContainer;
