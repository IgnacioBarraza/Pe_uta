import { NewProjectForm } from "./components/projects/newProject";
import { EditProjectForm } from "./components/projects/editProject";
import { NewSubjectForm } from "./components/subject/newSubject";
import { EditSubject } from "./components/subject/editSubject";
import { DeleteSubject } from "./components/subject/deleteSubject";
import { useBackend } from "@/hooks/useBackend";
import { Project, Subject } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function Admin() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const { getSubjects, getProjects } = useBackend();

  const getAllSubjects = async () => {
    try {
      const response = await getSubjects();
      const { data, status } = response;
      if (status === 200) {
        const subjectsArray = Array.isArray(data) ? data : [data];
        setSubjects(subjectsArray);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getAllProjects = async () => {
    try {
      const response = await getProjects();
      const { data, status } = response
      if (status === 200) {
        const projectsArray = Array.isArray(data) ? data : [data]
        setProjects(projectsArray)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (subjects.length === 0) {
      getAllSubjects();
    }
  }, [subjects]);

  useEffect(() => {
    if (projects.length === 0) {
      getAllProjects();
    }
  }, [projects]);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
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
              <NewProjectForm subjects={subjects}/>
              <NewSubjectForm />
            </div>
          </div>
          <div className="grid sm:mt-28 gap-4">
            <EditProjectForm projects={projects} subjects={subjects}/>
            <EditSubject subjects={subjects}/>
            <DeleteSubject subjects={subjects}/> 
          </div>
        </div>
      </div>
    </section>
  );
}
