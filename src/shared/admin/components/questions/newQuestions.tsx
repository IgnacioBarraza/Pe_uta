import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'
import { useBackend } from '@/hooks/useBackend'
import { useDataProvider } from '@/hooks/useData'
import { CreateQuestionsDto, NewQuestionProps } from '@/utils/interface'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

export const NewQuestions = ({ subjects }: NewQuestionProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateQuestionsDto>({
    defaultValues: {
      label: '',
      options: Array(4).fill({ label: '', value: '' }), // Predefine 5 options
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'options',
  })

  const { createQuestion } = useBackend()
  const { toast } = useToast()
  const { addQuestionLocally } = useDataProvider()
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([])

  const handleCheckboxChange = (subjectId: string) => {
    setSelectedSubjectIds((prevIds) =>
      prevIds.includes(subjectId)
        ? prevIds.filter((id) => id !== subjectId)
        : [...prevIds, subjectId]
    )
  }

  const onSubmit = async (questionData: CreateQuestionsDto) => {
    try {
      const response = await createQuestion({
        ...questionData,
        associatedTo: selectedSubjectIds
      })
      const { data, status } = response
      if (status === 201) {
        addQuestionLocally(data)
        toast({
          title: 'Pregunta agregada con exito',
        })
        reset()
        setSelectedSubjectIds([])
      }
    } catch (error) {
      console.error(error)
    }
  }

  const expoSubjects = subjects.filter((subject) => subject.showOnExpo)

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Crear Pregunta</CardTitle>
        <CardDescription>
          Agrega una nueva pregunta con 5 opciones y su respectivo puntaje.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {/* Pregunta */}
          <Label htmlFor="question">Pregunta</Label>
          <div className="grid grid-cols-3 gap-2">
            <Input
              className="col-span-2"
              id="question"
              placeholder="Ingresa la pregunta"
              {...register('label', { required: true })}
            />
            {/* Ponderación*/}
            <Input
              className="col-span-1"
              type="number"
              step="any"
              placeholder="Ponderación"
              {...register('ponderation', { required: true, valueAsNumber: true })}
            />
            {errors.label && (
              <span className="text-red-500">Este campo es obligatorio</span>
            )}
          </div>
          {/* Asociar asignaturas */}
          {expoSubjects.length > 0 && (
            <ScrollArea>
              {expoSubjects.map((subject) => (
                <div key={subject.id} className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedSubjectIds.includes(subject.id)}
                    onCheckedChange={() => handleCheckboxChange(subject.id)}
                  />
                  <span>{subject.subject_name}</span>
                </div>
              ))}
            </ScrollArea>
          )}
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

                {/* Opción Puntaje */}
                <Input
                  type="number"
                  placeholder="Puntaje"
                  {...register(`options.${index}.value`, { required: true })}
                />
                {errors?.options?.[index]?.label && (
                  <span className="text-red-500">
                    Este campo es obligatorio
                  </span>
                )}
                {errors?.options?.[index]?.value && (
                  <span className="text-red-500">
                    Este campo es obligatorio
                  </span>
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
  )
}
