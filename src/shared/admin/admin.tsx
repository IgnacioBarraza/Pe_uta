import { NewProjectForm } from "./components/projects/newProject";
import { EditProjectForm } from "./components/projects/editProject";
import { NewSubjectForm } from "./components/subject/newSubject";
import { EditSubject } from "./components/subject/editSubject";
import { DeleteSubject } from "./components/subject/deleteSubject";
import { DeleteProject } from "./components/projects/deleteProject";
import { useDataProvider } from "@/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";
import { NewQuestions } from "./components/questions/newQuestions";
import { DeleteQuestion } from "./components/questions/deleteQuestion";
import { useBackend } from "@/hooks/useBackend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const { projects, subjects, questions, loading, error } = useDataProvider();
  const { exportExcel } = useBackend()
  const { toast } = useToast()
  const date = new Date();
  const currentYear = date.getFullYear();

  const excel = async () => {
    try {
      await exportExcel().then((res) => {
        const { data, status } = res
        if (status === 200) {
          const url = window.URL.createObjectURL(new Blob([data]))
          const link = document.createElement('a')

          link.href = url
          link.download = `Resumen Evaluaciones Feria ${currentYear}.xlsx`
          document.body.appendChild(link)
          link.click()


          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)

          toast({
            title: 'Archivo excel generado con exito',
            description: 'Espera un momento mientras se descarga el archivo',
            variant: 'default'
          })
        } else {
          console.error('Error al generar el archivo excel...')
          toast({
            title: 'Hubo un error al generar el archivo excel',
            description: 'Contacte a desarrollo',
            variant: 'destructive'
          })
        }
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Hubo un error al generar el archivo excel',
        description: 'Contacte a desarrollo',
        variant: 'destructive'
      })
    }
  }
  if (loading) {
    return(
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-64" />
              <div className="grid gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
            <div className="grid sm:mt-28 gap-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Administrar Feria
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Gestiona los proyectos y asignaturas desde aca.
              </p>
            </div>
            <div className="grid gap-4">
              <button className="w-60 h-10 bg-green-700 rounded-xl text-white" onClick={() => excel()}>
                <FontAwesomeIcon icon={faFileExcel} size="xl" className="mr-2"/>
                Generar Excel
              </button>
            </div>
            <div className="grid gap-4 ">
              <NewProjectForm subjects={subjects} />
              <NewSubjectForm />
              <NewQuestions />
            </div>
          </div>
          <div className="grid sm:mt-28 gap-4">
            <EditProjectForm projects={projects} subjects={subjects} />
            <EditSubject subjects={subjects} />
            <DeleteSubject subjects={subjects} />
            <DeleteProject projects={projects} />
            <DeleteQuestion questions={questions} />
          </div>
        </div>
      </div>
    </section>
  );
}
