import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useBackend } from "@/hooks/useBackend";
import { useDataProvider } from "@/hooks/useData";
import { EvaluationData, EvaluationFormData, EvaluationFormProps } from "@/utils/interface";
import { calculateTotalScore } from "@/utils/util";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Form = ({ questions, userId }: EvaluationFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EvaluationFormData>();
  const { submitEvaluation } = useBackend()
  const { toast } = useToast()
  const { addEvaluationLocally } = useDataProvider()
  const navigate = useNavigate()

  const projectId = new URLSearchParams(location.search).get('id')

  const onSubmit = async (formData: EvaluationFormData) => {
    const scores = formData.scores;
    const total_evaluation_score = calculateTotalScore(scores, questions);

    const evaluationData: EvaluationData = {
      user: { id: userId },
      project: { id: projectId },
      total_evaluation_score: total_evaluation_score,
      question_scores: questions.map((question) => ({
        id: question.id,
        score: parseInt(scores[question.id] || "0", 10),
      })),
      comment: formData.comment,
    };

    try {
      const response = await submitEvaluation(evaluationData)
      const { data, status } = response
      if (status === 201) {
        addEvaluationLocally(data)
        reset()
        toast({
          title: 'Evaluación enviada con exito!',
          description: 'Gracias por evaluar a este grupo!'
        })
        navigate('/inicio')

      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error en la evaluación.',
        description: error.response.data.message,
        variant: 'destructive'
      })
      navigate('/inicio')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {questions.map((question) => (
        <div key={question.id} className="grid gap-2">
          <Label htmlFor={question.id}>{question.label}</Label>
          <Controller
            name={`scores.${question.id}`}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el puntaje" />
                </SelectTrigger>
                <SelectContent>
                  {question.options.map((option) => (
                    <SelectItem key={option.value} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.scores?.[question.id] && (
            <span className="text-red-500">Seleccione un puntaje</span>
          )}
        </div>
      ))}
      <div className="grid gap-2">
        <Label htmlFor="comment">Comentarios adicionales</Label>
        <Textarea
          id="comment"
          rows={4}
          placeholder="Ingrese los comentarios aqui..."
          {...register("comment")}
        />
      </div>
      <Button type="submit" className="mt-4">
        Submit Evaluation
      </Button>
    </form>
  );
};
