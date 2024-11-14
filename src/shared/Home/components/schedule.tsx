export const Schedule = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Cronograma
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Revisa el cronograma
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Descubre la emocionante programación de eventos, talleres y
              presentaciones que tendrán lugar durante la Expo de Ciencias.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <img
            src="/home_placeholder.webp"
            width="550"
            height="310"
            alt="Schedule"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6">
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Apertura - 09:30 AM</h3>
                  <p className="text-muted-foreground">
                    Escucha la apertura de la mano de la academica Olga Penagos,
                    docente de los ramos de Física del departamento de
                    ingeniería.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">
                    Presentaciones interactivas - 10:00 AM
                  </h3>
                  <p className="text-muted-foreground">
                    Participa en actividades interactivas y experimentos
                    prácticos realizados por los estudiantes expositores.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Cierre 2:00 PM</h3>
                  <p className="text-muted-foreground">
                    Escucha el cierre de la feria junto a la academica Olga
                    Penagos y más academicos e invitados.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
