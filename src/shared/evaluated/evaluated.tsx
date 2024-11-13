import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useDataProvider } from '@/hooks/useData'
import { Link } from 'react-router-dom'

export default function Evaluated() {
  const { evaluations, questions, loading } = useDataProvider()

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
        {loading ? (
          <div className="grid gap-6 mt-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Separator className="my-4" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : evaluations.length === 0 ? (
          <div className="text-center mt-8">
            <p className="text-2xl text-muted-foreground">
              No has evaluado proyectos aún.
            </p>
            <Link
              to="/inicio/proyectos"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Ir a Proyectos
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 mt-8">
            {evaluations.map((evaluation) => (
              <Card key={evaluation.id}>
                <CardHeader>
                  <CardTitle>{evaluation.project.project_name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Promedio general:
                      </span>
                      <span>
                        {evaluation.total_evaluation_score.toFixed(1)} / 7
                      </span>
                    </div>
                    {evaluation.question_scores.map((questionScore) => {
                      const question = questions.find(
                        (q) => q.id === questionScore.id
                      )
                      return (
                        <div
                          key={questionScore.id}
                          className="flex items-center justify-between"
                        >
                          <span className="text-muted-foreground">
                            {question?.label}:
                          </span>
                          <span>{questionScore.score}</span>
                        </div>
                      )
                    })}
                    <Separator className="my-4" />
                    <div>
                      <span className="text-muted-foreground">
                        Comentarios:
                      </span>
                      <p>{evaluation.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
