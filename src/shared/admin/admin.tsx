import { NewProjectForm } from "./components/newProject";
import { EditProjectForm } from "./components/editProject";
import { NewSubjectForm } from "./components/newSubject";

export default function Admin() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Administrar proyectos
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Gestiona los proyectos y asignaturas desde aca.
              </p>
            </div>
            <div className="grid gap-4">
              <NewProjectForm />
              <NewSubjectForm />
            </div>
          </div>
          <div className="lg:block sm:mt-28">
            <EditProjectForm />
          </div>
        </div>
      </div>
    </section>
  );
}
