import { Project, Subject } from './interface'

export function getMembersArray(
  members: string,
  selectedProject: Project
): string[] {
  return members.trim().length
    ? members.split(',').map((member) => member.trim())
    : selectedProject.members
}

export const subjectColor: { [key: string]: string } = {
  'Introducción a la Física': 'bg-violet-600',
  'Mecánica Clásica': 'bg-blue-600',
  'Electromagnetismo': 'bg-green-600',
  'Física Contemporanea': 'bg-yellow-400',
  'Invitado Especial': 'bg-red-600',
  'Introducción a Formulación de Proyectos': 'bg-orange-600',
  'Kinesiología': ''
}

export const subjectOrder = [
  "a183dbaa-c34f-4539-972d-74ea2c0503b6", // Introducción a la Física
  "90c0f2ae-c1f5-4d59-ba10-68cfeff4461a", // Mecánica Clásica
  "ff247758-48d3-4cbb-90b2-8bae169b76b8", // Electromagnetismo
  "1a788cd4-081d-425b-975d-f8948dae750a", // Física Contemporanea
  "6b4db117-f3fa-4b8e-82ff-bf95a62fde56", // Introducción a Formulación de Proyectos
  "1a35eb7d-884d-44af-9e3b-56b27629e473"  // Invitado Especial
]

export const sortSubjects = (subjects: Subject[]) => {
  return subjects
    .filter(
      (subject) => subject.showOnExpo && subjectOrder.includes(subject.id)
    )
    .sort((a, b) => subjectOrder.indexOf(a.id) - subjectOrder.indexOf(b.id))
}

export const calculateTotalScore = (scores: { [questionId: string]: string }): number => {
  const weights: { [key: string]: number } = {
    "612d8190-fcec-4978-889b-715fa2968b3c": 0.45, // Pregunta 1
    "3b734267-0ed7-44aa-907f-2785b155d2f7": 0.05, // Pregunta 2
    "07c430a7-aa44-4c6a-a12d-72c17891b55b": 0.05, // Pregunta 3
    "32c0e0a1-8074-4560-b727-f6c8fc75a2c7": 0.35, // Pregunta 4
    "374932b4-69f1-4042-93e5-6c39f5aeaca0": 0.05, // Pregunta 5
    "63a2a9e0-8c0d-4672-aa3b-fa041c1aec34": 0.05, // Pregunta 6
  };

  // Calculamos la nota final basada en las ponderaciones y los puntajes seleccionados
  const totalScore = Object.keys(scores).reduce((acc, questionId) => {
    const score = parseInt(scores[questionId] || "0", 10); // Valor seleccionado
    const weight = weights[questionId] || 0; // Ponderación asignada
    return acc + score * weight;
  }, 0);

  // Redondeo a un decimal
  return Math.round((totalScore + Number.EPSILON) * 10) / 10;
};
