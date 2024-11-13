import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FormProps, Project, ProjectProps, Questions } from "@/utils/interface";
import { useBackend } from "@/hooks/useBackend";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const DeleteQuestion = ({questions}: FormProps) => {
  const { deleteQuestion } = useBackend()
  const [selectedQuestion, setSelectedQuestion] = useState<Questions | null>(null)
  const { toast } = useToast()

  const handleQuestionSelect = (questionId) => {
    const selected = questions.find((question) => question.id === questionId);
    setSelectedQuestion(selected || null);
  }

  const onSubmit = async () => {
    try {
      const response = await deleteQuestion(selectedQuestion.id)
      const { status } = response
      if (status === 200) {
        toast({
          title: 'Pregunta borrada con exito'
        })
        setSelectedQuestion(null)
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Hubo un problema al borrar la pregunta",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Eliminar pregunta</CardTitle>
        <CardDescription>Selecciona la pregunta a eliminar</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label htmlFor="project">Seleccionar una pregunta</Label>
            <Select
              key="project"
              value={selectedQuestion?.id}
              onValueChange={handleQuestionSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar pregunta" />
              </SelectTrigger>
              <SelectContent>
                {questions.map((project) => (
                  <SelectItem key={project.id} value={`${project.id}`}>
                    {project.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <CardFooter className="flex justify-end">
            <Button onClick={onSubmit}>Borrar pregunta</Button>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  )
}
