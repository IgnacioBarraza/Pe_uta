import { Link } from 'react-router-dom'

export const FilteredProjects = ({filteredProjects}) => {
  const descriptionLimit = 150
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <div
                    className="bg-background p-6 rounded-lg shadow-lg"
                    key={project.id}
                  >
                    <img
                      src={project.image_url}
                      width="140"
                      height="70"
                      alt="Project 1"
                      className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center mx-auto"
                    />
                    <div className="space-y-2 mt-4">
                      <h3 className="text-xl font-bold">
                        {project.project_name}
                      </h3>
                      <p className="text-muted-foreground">
                        {`${project.description.slice(
                          0,
                          descriptionLimit
                        )}...`}
                      </p>
                      <Link
                        to={`/inicio/evaluar?subject=${project.subject.id}&id=${project.id}`}
                        className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      >
                        Ver más
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No se encontraron proyectos.</p>
              )}
            </div>
  )
}
