import { useState, createContext, useEffect, ReactNode } from "react";
import { Project, Subject } from "@/utils/utils";
import { useBackend } from "@/hooks/useBackend";

interface DataContextProps {
  projects: Project[];
  subjects: Subject[];
  loading: boolean;
  error: string | null;
  refreshData: () => void;
  addSubjectLocally: (newSubject: Subject[]) => void;
  addProjectLocally: (newProject: Project) => void;
}

export const DataContext = createContext<DataContextProps | undefined>(undefined)

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { getProjects, getSubjects } = useBackend()

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectsResponse, subjectsResponse] = await Promise.all([
        getProjects(),
        getSubjects(),
      ]);

      if (projectsResponse.status === 200) {
        setProjects(Array.isArray(projectsResponse.data) ? projectsResponse.data : [projectsResponse.data]);
      }
      if (subjectsResponse.status === 200) {
        setSubjects(Array.isArray(subjectsResponse.data) ? subjectsResponse.data : [subjectsResponse.data]);
      }

      setError(null); // Clear error if successful
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const addSubjectLocally = (newSubject: Subject[]) => {
    // Ensure newSubject is always an array
    const subjectsArray = Array.isArray(newSubject) ? newSubject : [newSubject];
  
    setSubjects((prevSubjects) => [...prevSubjects, ...subjectsArray]);
  };

  const addProjectLocally = (newProject: Project) => {
    // Ensure newProject is treated as an array
    const projectsArray = Array.isArray(newProject) ? newProject : [newProject];
  
    // Update the projects state with the new array of projects
    setProjects((prevProjects) => [...prevProjects, ...projectsArray]);
  };
  
  

  useEffect(() => {
    fetchData(); // Fetch data on mount
  }, []);

  return (
    <DataContext.Provider value={{ projects, subjects, loading, error, refreshData: fetchData, addSubjectLocally, addProjectLocally }}>
      {children}
    </DataContext.Provider>
  );
}