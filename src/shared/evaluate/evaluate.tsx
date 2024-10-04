import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProjectsInfo, Questions, QuestionsForm } from "@/utils/utils";
import { Loader } from "./components/loader";
import { Form } from "./components/form";
import { ProjectDescription } from "./components/description";
import { useDataProvider } from "@/hooks/useData";

export default function Evaluate() {
  const [searchParams] = useSearchParams();
  const { projects } = useDataProvider()
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState<QuestionsForm[]>([])
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const project = projects.find((project) => project.id === id);

  useEffect(() => {
    setTimeout(() => {
      setQuestions(Questions)
      setLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    if (!project) {
      navigate("/inicio/proyectos");
    }
  }, [project, navigate]);

  if (!project) return null

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            {loading ? (
              <Loader />
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Evaluar Proyecto
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Por favor envíe sus comentarios sobre el proyecto.
                  </p>
                </div>
                <Form questions={questions}/>
              </div>
            )}
          </div>
          <ProjectDescription project={project}/>
        </div>
      </div>
    </section>
  );
}
