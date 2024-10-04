import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { EvaluatedProjects } from '@/utils/utils';
import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Evaluated() {
  const [evaluatedProjects, setEvaluatedProjects] = useState([]);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            Proyectos evaluados
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Revisa los proyectos que has evaluado previamente.
          </p>
        </div>

        {/* Conditional Rendering */}
        {evaluatedProjects.length === 0 ? (
          <div className="text-center mt-8">
            <p className="text-2xl text-muted-foreground">
              No has evaluado proyectos aún.
            </p>
            <Link to="/inicio/proyectos" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Ir a Proyectos
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 mt-8">
            {evaluatedProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Overall Rating:</span>
                      <span>{project.rating} / 5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Satisfaction:</span>
                      <span>{project.satisfaction} / 5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Recommendation:</span>
                      <span>{project.recommendation} / 5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Deliverables:</span>
                      <span>{project.deliverables} / 5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Team Collaboration:</span>
                      <span>{project.teamCollaboration} / 5</span>
                    </div>
                    <Separator className="my-4" />
                    <div>
                      <span className="text-muted-foreground">Comentarios:</span>
                      <p>{project.comments}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
