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

export interface FormProps {
  questions: QuestionsForm[];
}

export interface ProjectData {
  id: string,
  projectName: string,
  description: string,
  image: string,
  members: string[],
  subject: string,
  to?: string
}

export interface ProjectDataProps {
  project: ProjectData;
}

export interface CreateSubjectDto {
  subject_name: string;
  showOnExpo: boolean;
}

export interface UpdateSubjectDto {
  subject_name?: string;
  showOnExpo?: boolean;
}

export interface SubjectApiResponse {
  data: Subject[];
  status: number;
}

export interface SubjectDeleteApiResponse {
  data: string;
  status: number;
}

export interface Subject {
  id: string;
  subject_name: string;
  showOnExpo: boolean;
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


export const SubjectProjects = [
  {
    key: "1",
    subject: "Introducción a la Física",
    subjectField: "Física",
    description: "Una exploración básica de los conceptos fundamentales de la física y su aplicación en el mundo real.",
    showInExpo: true
  },
  {
    key: "2",
    subject: "Mecánica Clásica",
    subjectField: "Física",
    description: "Descubre las leyes del movimiento y cómo Newton revolucionó nuestra comprensión del universo físico.",
    showInExpo: true
  },
  {
    key: "3",
    subject: "Electromagnetismo",
    subjectField: "Física",
    description: "Aprende sobre los campos eléctricos y magnéticos y su rol en la tecnología moderna.",
    showInExpo: true
  },
  {
    key: "4",
    subject: "Física Contemporanea",
    subjectField: "Física",
    description: "Explora las teorías avanzadas que explican fenómenos a escalas atómicas y cósmicas.",
    showInExpo: true
  },
  {
    key: "5",
    subject: "Kinesiología",
    subjectField: "Kinesiología",
    description: "Estudia el movimiento del cuerpo humano y su aplicación en la rehabilitación y el rendimiento físico.",
    showInExpo: false
  },
]

export const ProjectsInfo = [
  {
    id: "6503b4f1c29b8b3f2a1a4e91",
    projectName: "Estudio del Movimiento Pendular",
    description: "Este proyecto investiga el movimiento armónico simple utilizando un péndulo para demostrar las leyes de la mecánica clásica.",
    image: "/project-placeholder.jpg",
    members: [
      "Ana Gómez",
      "Carlos Pérez",
      "Lucía Rodríguez"
    ],
    subject: "Mecánica Clásica",
    to: "/inicio/evaluar?subject=mecanica_clasica&id=6503b4f1c29b8b3f2a1a4e91"
  },
  {
    id: "6503b4f1c29b8b3f2a1a4e92",
    projectName: "Aplicaciones del Electromagnetismo en la Tecnología Moderna",
    description: "El proyecto explora cómo se aplican los principios del electromagnetismo en dispositivos cotidianos como teléfonos móviles y computadoras.",
    image: "/project-placeholder.jpg",
    members: [
      "Jorge Fernández",
      "Marta López"
    ],
    subject: "Electromagnetismo",
    to: "/inicio/evaluar?subject=electromagnetismo&id=6503b4f1c29b8b3f2a1a4e92"
    
  },
  {
    id: "6503b4f1c29b8b3f2a1a4e93",
    projectName: "Energía Renovable a través de Celdas Solares",
    description: "Este proyecto investiga la eficiencia de diferentes materiales en la fabricación de celdas solares para optimizar la producción de energía renovable.",
    image: "/project-placeholder.jpg",
    members: [
      "Daniela Suárez",
      "Pablo Martínez",
      "Sofía Hernández"
    ],
    subject: "Física Contemporánea",
    to: "/inicio/evaluar?subject=fisica_contemporanea&id=6503b4f1c29b8b3f2a1a4e93"
  },
  {
    id: "6503b4f1c29b8b3f2a1a4e94",
    projectName: "Análisis Biomecánico en Rehabilitación Física",
    description: "Un estudio sobre cómo la biomecánica puede mejorar los tratamientos de rehabilitación para pacientes con lesiones musculares y articulares.",
    image: "/project-placeholder.jpg",
    members: [
      "Valentina Ruiz",
      "Felipe Castillo"
    ],
    subject: "Kinesiología",
    to: "/inicio/evaluar?subject=kinesiologia&id=6503b4f1c29b8b3f2a1a4e94"
  },
  {
    id: "6503b4f1c29b8b3f2a1a4e95",
    projectName: "Simulación de Partículas Cuánticas",
    description: "El proyecto desarrolla un software que simula el comportamiento de partículas a nivel cuántico utilizando algoritmos de computación avanzada.",
    image: "/project-placeholder.jpg",
    members: [
      "Santiago Álvarez",
      "Clara Torres",
      "Fernando Vargas"
    ],
    subject: "Física Contemporánea",
    to: "/inicio/evaluar?subject=fisica_contemporanea&id=6503b4f1c29b8b3f2a1a4e95"
  }
]

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