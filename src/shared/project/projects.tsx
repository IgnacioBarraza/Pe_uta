import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ProjectsInfo } from "@/utils/utils";
import { useDataProvider } from "@/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";

export const Projects = () => {
  const { projects, loading } = useDataProvider();

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Search Projects
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore the latest projects and innovations showcased at the
              Science Expo.
            </p>
          </div>
          <div className="w-full max-w-2xl">
            <Input
              placeholder="Search projects..."
              className="w-full rounded-md bg-muted px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          {loading ? (
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="grid gap-1">
                  <Skeleton className="w-32 h-8 rounded-lg" />
                  <Skeleton className="w-48 h-6 rounded-lg" />
                  <Skeleton className="w-full h-5 rounded-lg" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
              {projects.map((project) => (
                <div
                  className="bg-background p-6 rounded-lg shadow-lg"
                  key={project.id}
                >
                  <img
                    src={project.image_url}
                    width="140"
                    height="70"
                    alt="Project 1"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center mx-auto"
                  />
                  <div className="space-y-2 mt-4">
                    <h3 className="text-xl font-bold">{project.project_name}</h3>
                    <p className="text-muted-foreground">
                      {project.description}
                    </p>
                    <Link
                      to={`/inicio/evaluar?subject=${project.subject.subject_name}&id=${project.id}`}
                      className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      Ver más
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
