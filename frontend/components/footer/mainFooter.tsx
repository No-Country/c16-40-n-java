import Logo from '@/components/ui/logo';
import { Icons } from '@/components/icons';

const MainFooter = () => {
  return (
    <footer className="mt-auto w-full bg-foreground text-white text-xs lg:text-sm flex flex-col justify-between p-5">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col items-center justify-start gap-1 pb-5">
          <Logo variant="light" />
          <p>© 2024 Colaborapp! S.A. Todos los derechos reservados.</p>
        </div>
        <div className="flex justify-between lg:justify-evenly w-full lg:w-2/3">
          <div className="flex flex-col pr-2 w-auto">
            <h4 className="font-bold">Categorías</h4>
            <ul>
              <li className="cursor-pointer hover:underline underline-offset-2">
                Recaudación de fondos para salud
              </li>
              <li className="cursor-pointer hover:underline underline-offset-2">
                Recaudación de fondos para educación
              </li>
              <li className="cursor-pointer hover:underline underline-offset-2">
                Recaudación de fondos para el medio ambiente
              </li>
              <li className="cursor-pointer hover:underline underline-offset-2">
                Recaudación de fondos para comunidades
              </li>
            </ul>
          </div>
          <div className="flex flex-col pr-2 w-auto">
            <h4 className="font-bold">Información</h4>
            <ul>
              <li className="cursor-pointer hover:underline underline-offset-2">
                Centro de ayuda
              </li>
              <li className="cursor-pointer hover:underline underline-offset-2">
                Historias de éxito
              </li>
              <li className="cursor-pointer hover:underline underline-offset-2">
                Preguntas frecuentes
              </li>
              <li className="cursor-pointer hover:underline underline-offset-2">
                Políticas de privacidad
              </li>
              <li className="cursor-pointer hover:underline underline-offset-2">
                Términos y condiciones
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border boder-white w-full h-0 my-4"></div>
      <div className="flex justify-end gap-2 w-full items-center">
        <Icons.FacebookLogo className="w-8 h-auto" />
        <Icons.InstagramLogo className="w-8 h-auto" />
        <Icons.WhatsappLogo className="w-8 h-auto" />
        <Icons.TwitterLogo className="w-8 h-auto" />
        <Icons.YoutubeLogo className="w-8 h-auto" />
      </div>
    </footer>
  );
};
export default MainFooter;
