export interface LoginData {
  rut: string,
  password: string
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
    to: "proyecto?subject=mecanica_clasica&id=6503b4f1c29b8b3f2a1a4e91"
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
    to: "proyecto?subject=electromagnetismo&id=6503b4f1c29b8b3f2a1a4e92"
    
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
    to: "proyecto?subject=fisica_contemporanea&id=6503b4f1c29b8b3f2a1a4e93"
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
    to: "proyecto?subject=kinesiologia&id=6503b4f1c29b8b3f2a1a4e94"
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
    to: "proyecto?subject=fisica_contemporanea&id=6503b4f1c29b8b3f2a1a4e95"
  }
]

