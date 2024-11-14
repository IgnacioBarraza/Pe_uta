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