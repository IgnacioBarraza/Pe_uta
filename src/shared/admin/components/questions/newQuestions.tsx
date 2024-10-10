import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useBackend } from "@/hooks/useBackend";
import { useDataProvider } from "@/hooks/useData";
import { CreateQuestionsDto } from "@/utils/utils";
import { useFieldArray, useForm } from "react-hook-form";

export const NewQuestions = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateQuestionsDto>({
    defaultValues: {
      label: '',
      options: Array(4).fill({ label: "", value: "" }), // Predefine 5 options
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const { createQuestion } = useBackend()
  const { toast } = useToast()
  const { addQuestionLocally } = useDataProvider()
  
  const onSubmit = async (questionData: CreateQuestionsDto) => {
    try {
      const response = await createQuestion(questionData)
      console.log(response)
      const { data, status } = response
      if (status === 201) {
        addQuestionLocally(data)
        toast({
          title: 'Pregunta agregada con exito'
        })
        reset()
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Crear Pregunta</CardTitle>
        <CardDescription>Agrega una nueva pregunta con 5 opciones y su respectivo puntaje.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          {/* Pregunta */}
          <div className="space-y-2">
            <Label htmlFor="question">Pregunta</Label>
            <Input
              id="question"
              placeholder="Ingresa la pregunta"
              {...register('label', { required: true })}
            />
            {errors.label && (
              <span className="text-red-500">Este campo es obligatorio</span>
            )}
          </div>

          {/* Opciones */}
          <div className="space-y-4">
            <Label>Opciones</Label>
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-3 gap-2">
                {/* Opción Label */}
                <Input
                  className="col-span-2"
                  placeholder={`Ingresa la opción ${index + 1}`}
                  {...register(`options.${index}.label`, { required: true })}
                />
                {errors?.options?.[index]?.label && (
                  <span className="text-red-500">Este campo es obligatorio</span>
                )}

                {/* Opción Puntaje */}
                <Input
                  type="number"
                  placeholder="Puntaje"
                  {...register(`options.${index}.value`, { required: true })}
                />
                {errors?.options?.[index]?.value && (
                  <span className="text-red-500">Este campo es obligatorio</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Guardar Pregunta
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
