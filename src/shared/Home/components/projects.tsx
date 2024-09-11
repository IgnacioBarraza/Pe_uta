import { SubjectProjects } from "@/utils/utils";
import { Link } from "react-router-dom";

export const Projects = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Disciplinas
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Explora las asignaturas
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Sumergete en los diversos campos de la ciencia y la física, y
              descubre novedosos proyectos de cada disciplina.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {SubjectProjects.filter((project) => project.showInExpo).map(
            (project) => (
              <Link to={'/'}>
                <div className="grid gap-1" key={project.key}>
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  {project.subjectField}
                </div>
                <h3 className="text-xl font-bold">{project.subject}</h3>
                <p className="text-muted-foreground">
                  {project.description}
                </p>
              </div>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
};
