import { Input } from '@/components/ui/input'
import { useLocation } from 'react-router-dom'
import { useDataProvider } from '@/hooks/useData'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'
import { FilteredProjects } from './components/filteredProjects'

export const Projects = () => {
  const { projects, evaluations, loading, subjects } = useDataProvider()
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [selectedSubjects, setSelectedSubjects] = useState([])
  const subjectId = new URLSearchParams(location.search).get('subject')

  useEffect(() => {
    if (subjectId) {
      setSelectedSubjects([subjectId])
    }
  }, [subjectId])

  useEffect(() => {
    const filtered = projects.filter((project) => {
      const matchesSubject =
        selectedSubjects.length === 0 ||
        selectedSubjects.includes(project.subject.id)
      const matchesSearch = project.project_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const isEvaluated = evaluations.some(
        (evaluation) => evaluation.project.id === project.id
      )

      return matchesSubject && matchesSearch && !isEvaluated
    })

    setFilteredProjects(filtered)
  }, [projects, evaluations, searchTerm, selectedSubjects])

  const toggleSubject = (id) => {
    setSelectedSubjects((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    )
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Buscar Proyectos
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore los últimos proyectos e innovaciones presentados en la
              Expo de la Ciencia.
            </p>
          </div>
          <div className="w-full max-w-2xl">
            <Input
              placeholder="Buscar proyectos..."
              className="w-full rounded-md bg-muted px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {subjects
              .filter((subject) => subject.showOnExpo)
              .map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => toggleSubject(subject.id)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedSubjects.includes(subject.id)
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {subject.subject_name}
                </button>
              ))}
          </div>
          {loading ? (
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="grid gap-1">
                  <Skeleton className="w-32 h-8 rounded-lg" />
                  <Skeleton className="w-48 h-6 rounded-lg" />
                  <Skeleton className="w-full h-5 rounded-lg" />
                </div>
              ))}
            </div>
          ) : (
            <FilteredProjects filteredProjects={filteredProjects} />
          )}
        </div>
      </div>
    </section>
  )
}
