const AboutPageContainer = () => {
  return (
    <section className="flex flex-col items-center">
      <div className="flex flex-col items-center py-10 mt-24 lg:mt-32 mb-10">
        <h2 className="font-medium text-xl lg:text-3xl text-center">
          Información acerca de Colaboraap!
        </h2>
        <div className="w-[95%] lg:w-3/4 h-64 my-10">
          <div className="bg-center bg-cover h-full rounded-lg bg-[url('/about_us.webp')]" />
        </div>
        <div className="w-[95%] lg:w-[60%] text-base lg:text-lg flex flex-col gap-5">
          <h3 className="font-medium">Misión:</h3>
          <p>
            En Colaboraap, nos dedicamos a apoyar proyectos inspiradores y de
            impacto positivo en diversas áreas, desde la educación y la salud
            hasta el medio ambiente y el desarrollo comunitario. Nuestra misión
            es fomentar la colaboración y la solidaridad entre individuos,
            empresas y organizaciones para crear un mundo más justo y
            sostenible.
          </p>
          <h3 className="font-medium">Visión:</h3>
          <p>
            Misión: En Colaboraap, nos dedicamos a apoyar proyectos inspiradores
            y de impacto positivo en diversas áreas, desde la educación y la
            salud hasta el medio ambiente y el desarrollo comunitario. Nuestra
            misión es fomentar la colaboración y la solidaridad entre
            individuos, empresas y organizaciones para crear un mundo más justo
            y sostenible. Visión: Nuestra visión es ser un catalizador de
            cambio, conectando a personas comprometidas con causas
            significativas y brindando los recursos necesarios para hacer
            realidad proyectos transformadores. Nos esforzamos por ser un puente
            entre quienes desean contribuir al bienestar de la sociedad y
            aquellos que necesitan apoyo para llevar a cabo sus iniciativas.
          </p>
        </div>
        <div className="w-[60%] md:w-[30%] lg:w-[20%] h-96 my-10">
          <div className="bg-center bg-cover h-full rounded-lg bg-[url('/about_map.webp')]" />
        </div>
        <div className="w-[95%] lg:w-[60%] text-base lg:text-lg flex flex-col gap-5">
          <h3 className="font-medium">Alcance Nacional de Colaboraap!</h3>
          <p>
            Nuestra plataforma tiene un alcance nacional en toda Argentina.
            Trabajamos con una amplia red de proyectos y donantes en todas las
            provincias del país para impulsar iniciativas que generen un impacto
            positivo en nuestras comunidades.
          </p>
          <p>
            Nuestro alcance nacional nos permite llegar a personas de todas las
            regiones, desde las zonas urbanas hasta las áreas rurales, Ya sea
            que estés en Buenos Aires, Córdoba, Mendoza, Tierra del Fuego o
            cualquier otra provincia, puedes formar parte de nuestra comunidad y
            contribuir a construir un futuro mejor para todos.
          </p>
        </div>
      </div>
    </section>
  );
};
export default AboutPageContainer;
