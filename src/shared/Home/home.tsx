import { Link } from "react-router-dom";
import { Projects } from "./components/projectCards";
import { Schedule } from "./components/schedule";

export const Home = () => {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Descubre las maravillas de la ciencia
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Únete a nosotros en un emocionante viaje al mundo de la
                  innovación en nuestra Expo de Ciencias, organizada por los
                  estudiantes del departamento de ingeniería. Descubre proyectos
                  de vanguardia, exhibiciones interactivas y presentaciones
                  dinámicas, todos diseñados por los futuros líderes en
                  tecnología. Participa en demostraciones prácticas y explora
                  cómo la creatividad estudiantil está dando forma al futuro de
                  la ciencia y la ingeniería.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  to="proyectos"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Explora los proyectos
                </Link>
              </div>
            </div>
            <img
              src="/expo_placeholder.jpeg"
              width="550"
              height="550"
              alt="Science Expo"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>
      <Schedule />
      <Projects />
    </>
  );
};
