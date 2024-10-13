export interface LoginUserDto {
  rut: string,
  password: string
}

export interface AuthApiResponse {
  data: {
    accessToken: string;
    evaluations
  }
  status: number;
}

export interface RegisterUserDto {
  rut: string;
  password: string;
  name: string;
}

export interface Questions {
  id: string,
  label: string,
  options: QuestionsOptions[]
}

export interface QuestionsApiResponse {
  data: Questions[]
  status: number
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
  questions: Questions[];
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

export interface EvaluationFormData {
  userId: string;
  projectId: string;
  comment: string;
  scores: {
    [questionId: string]: string;
  };
}

export interface EvaluationData {
  user: {
    id: string;
  };
  project: {
    id: string;
  };
  total_evaluation_score: number;
  question_scores: QuestionScore[];
  comment: string;
}

export interface EvaluationFormProps extends FormProps {
  userId: string;
}

export interface Evaluation{
  id: string
  total_evaluation_score: number
  question_scores: QuestionScore[]
  comment: string
  user: User
  project: Project
}

interface QuestionScore {
  id: string
  score: number
}

interface User {
  id: string
  name: string
  rut: string
  user_type: string
}

export interface EvaluationApiResponse {
  data: Evaluation[]
  status: number
}