import { useState, createContext, useEffect, ReactNode } from "react";
import { Evaluation, Project, Questions, Subject } from "@/utils/utils";
import { useBackend } from "@/hooks/useBackend";

interface DataContextProps {
  projects: Project[];
  subjects: Subject[];
  questions: Questions[];
  evaluations: Evaluation[];
  loading: boolean;
  error: string | null;
  refreshData: () => void;
  addSubjectLocally: (newSubject: Subject[]) => void;
  addProjectLocally: (newProject: Project) => void;
  addQuestionLocally: (newQuestion: Questions[]) => void;
  addEvaluationLocally: (newEvaluation: Evaluation[]) => void;
}

export const DataContext = createContext<DataContextProps | undefined>(
  undefined
);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>(() => {
    // Retrieve evaluations from localStorage if available and valid
    const storedEvaluations = localStorage.getItem("userEvaluations");
    
    try {
      return storedEvaluations ? JSON.parse(storedEvaluations) : [];
    } catch (error) {
      console.error("Error parsing userEvaluations from localStorage", error);
      return [];
    }
  });
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { getProjects, getSubjects, getQuestions } = useBackend();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectsResponse, subjectsResponse, questionResponse] =
        await Promise.all([getProjects(), getSubjects(), getQuestions()]);

      if (projectsResponse.status === 200) {
        setProjects(
          Array.isArray(projectsResponse.data)
            ? projectsResponse.data
            : [projectsResponse.data]
        );
      }
      if (subjectsResponse.status === 200) {
        setSubjects(
          Array.isArray(subjectsResponse.data)
            ? subjectsResponse.data
            : [subjectsResponse.data]
        );
      }
      if (questionResponse.status === 200) {
        setQuestions(
          Array.isArray(questionResponse.data)
            ? questionResponse.data
            : [questionResponse.data]
        );
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
    const subjectsArray = Array.isArray(newSubject) ? newSubject : [newSubject];
    setSubjects((prevSubjects) => [...prevSubjects, ...subjectsArray]);
  };

  const addProjectLocally = (newProject: Project) => {
    const projectsArray = Array.isArray(newProject) ? newProject : [newProject];
    setProjects((prevProjects) => [...prevProjects, ...projectsArray]);
  };

  const addQuestionLocally = (newQuestion: Questions[]) => {
    const questionsArray = Array.isArray(newQuestion)
      ? newQuestion
      : [newQuestion];
    setQuestions((prevQuestions) => [...prevQuestions, ...questionsArray]);
  };

  const addEvaluationLocally = (newEvaluation: Evaluation[]) => {
    const evaluationArray = Array.isArray(newEvaluation)
      ? newEvaluation
      : [newEvaluation];

    setEvaluations((prevEvaluations) => {
      const updatedEvaluations = [...prevEvaluations, ...evaluationArray];
      localStorage.setItem("userEvaluations", JSON.stringify(updatedEvaluations));
      return updatedEvaluations;
    });
  };

  // Use useEffect to sync evaluations state with localStorage when it changes
  useEffect(() => {
    // Sync localStorage with evaluations state when it changes
    localStorage.setItem("userEvaluations", JSON.stringify(evaluations));
  }, [evaluations]);

  useEffect(() => {
    fetchData(); // Fetch data on mount
  }, []);

  return (
    <DataContext.Provider
      value={{
        projects,
        subjects,
        questions,
        evaluations,
        loading,
        error,
        refreshData: fetchData,
        addSubjectLocally,
        addProjectLocally,
        addQuestionLocally,
        addEvaluationLocally,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
