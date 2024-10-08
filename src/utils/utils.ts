export interface LoginUserDto {
  rut: string,
  password: string
}

export interface AuthApiResponse {
  data: {
    accessToken: string;
  }
  status: number;
}

export interface RegisterUserDto {
  rut: string;
  password: string;
  name: string;
}

export interface QuestionsForm {
  id: string,
  label: string,
  options: QuestionsOptions[]
}

interface QuestionsOptions {
  value: string,
  label: string
}

export interface CreateQuestionsDto {
  label: string;
  options: QuestionsOptions[]
}

export interface FormProps {
  questions: QuestionsForm[];
}

export interface ProjectData {
  id: string;
  project_name: string;
  description: string;
  image_url: string;
  members: string[];
  subject: Subject;
  to?: string
}

export interface ProjectDataProps {
  project: ProjectData;
}

export interface CreateSubjectDto {
  subject_name: string;
  showOnExpo: boolean;
  description: string;
  subject_field: string;
}

export interface UpdateSubjectDto {
  subject_name?: string;
  showOnExpo?: boolean;
  description?: string;
  subject_field?: string;
}

export interface SubjectApiResponse {
  data: Subject[];
  status: number;
}

export interface DeleteApiResponse {
  data: string;
  status: number;
}

export interface Subject {
  id: string;
  subject_name: string;
  showOnExpo: boolean;
  description: string;
  subject_field: string;
}

export interface SubjectProps {
  subjects: Subject[]
}

export interface ProjectProps {
  projects: Project[]
}

export interface Project {
  id: string;
  project_name: string;
  description: string;
  image_url: string;
  members: string[];
  subject: Subject;
}

export interface ProjectApiResponse {
  data: Project[],
  status: number;
}

export interface CreateProjectApiResponse {
  data: {
    id: string;
    project_name: string;
    description: string;
    image_url: string;
    members: string[];
    subject: Subject;
  };
  status: number;
}

export interface CreateProjectDto {
  project_name: string;
  description: string;
  image_url: string;
  members: string[];
  subject: string;
}

export interface UpdateProjectDto {
  project_name?: string;
  description?: string;
  image_url?: string;
  members?: string[];
  subject?: string;
}

export const Questions: QuestionsForm[] = [
  {
    id: "q1",
    label: "How would you rate the project overall?",
    options: [
      { value: "1", label: "1 - Poor" },
      { value: "2", label: "2 - Fair" },
      { value: "3", label: "3 - Average" },
      { value: "4", label: "4 - Good" },
      { value: "5", label: "5 - Excellent" },
    ],
  },
  {
    id: "q2",
    label: "How satisfied are you with the project's progress?",
    options: [
      { value: "1", label: "1 - Very Dissatisfied" },
      { value: "2", label: "2 - Dissatisfied" },
      { value: "3", label: "3 - Neutral" },
      { value: "4", label: "4 - Satisfied" },
      { value: "5", label: "5 - Very Satisfied" },
    ],
  },
  {
    id: "q3",
    label: "How likely are you to recommend this project to others?",
    options: [
      { value: "1", label: "1 - Not at all likely" },
      { value: "2", label: "2 - Slightly likely" },
      { value: "3", label: "3 - Moderately likely" },
      { value: "4", label: "4 - Very likely" },
      { value: "5", label: "5 - Extremely likely" },
    ],
  },
  {
    id: "q4",
    label: "How would you rate the quality of the project's deliverables?",
    options: [
      { value: "1", label: "1 - Poor" },
      { value: "2", label: "2 - Fair" },
      { value: "3", label: "3 - Average" },
      { value: "4", label: "4 - Good" },
      { value: "5", label: "5 - Excellent" },
    ],
  },
  {
    id: "q5",
    label: "How well did the project team communicate and collaborate?",
    options: [
      { value: "1", label: "1 - Very Poor" },
      { value: "2", label: "2 - Poor" },
      { value: "3", label: "3 - Average" },
      { value: "4", label: "4 - Good" },
      { value: "5", label: "5 - Excellent" },
    ],
  },
]

export const EvaluatedProjects = [
  {
    id: 1,
    name: "Project A",
    rating: 4,
    satisfaction: 4,
    recommendation: 5,
    deliverables: 4,
    teamCollaboration: 5,
    comments: "Great project overall, team did an excellent job.",
  },
  {
    id: 2,
    name: "Project B",
    rating: 3,
    satisfaction: 3,
    recommendation: 3,
    deliverables: 3,
    teamCollaboration: 4,
    comments: "Average project, some areas could be improved.",
  },
  {
    id: 3,
    name: "Project C",
    rating: 5,
    satisfaction: 5,
    recommendation: 5,
    deliverables: 5,
    teamCollaboration: 5,
    comments: "Exceptional project, exceeded all expectations.",
  },
]