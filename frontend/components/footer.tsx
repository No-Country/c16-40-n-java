import Logo from '@/components/ui/logo';
import { Icons } from './icons';

const Footer = () => {
  return (
    <footer className="w-full bg-foreground text-white text-xs lg:text-sm flex flex-col justify-between p-5">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col items-center justify-start pb-5">
          <Logo />
          <p>© 2024 Colaborapp! S.A. Todos los derechos reservados.</p>
        </div>
        <div className="flex justify-between lg:justify-evenly w-full lg:w-2/3">
          <div className="flex flex-col pr-2 w-auto">
            <h4 className="font-bold">Categorías</h4>
            <ul>
              <li>Recaudación de fondos para salud</li>
              <li>Recaudación de fondos para educación</li>
              <li>Recaudación de fondos para el medio ambiente</li>
              <li>Recaudación de fondos para comunidades</li>
            </ul>
          </div>
          <div className="flex flex-col pr-2 w-auto">
            <h4 className="font-bold">Información</h4>
            <ul>
              <li>Centro de ayuda</li>
              <li>Historias de éxito</li>
              <li>Preguntas frecuentes</li>
              <li>Políticas de privacidad</li>
              <li>Términos y condiciones</li>
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
export default Footer;
