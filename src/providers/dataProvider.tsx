import { useState, createContext, useEffect, ReactNode } from "react";
import { Project, Subject } from "@/utils/utils";
import { useBackend } from "@/hooks/useBackend";

interface DataContextProps {
  projects: Project[];
  subjects: Subject[];
  loading: boolean;
  error: string | null;
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

  useEffect(() => {
    fetchData(); // Fetch data on mount
  }, []);

  return (
    <DataContext.Provider value={{ projects, subjects, loading, error }}>
      {children}
    </DataContext.Provider>
  );
}