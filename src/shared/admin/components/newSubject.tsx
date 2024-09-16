import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { CreateSubjectDto } from "@/utils/utils";
import { useBackend } from "@/hooks/useBackend";

export const NewSubjectForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateSubjectDto>();
  const { createSubject } = useBackend();

  const onSubmit = async (subjectData) => {
    console.log(subjectData);
    try {
      const response = await createSubject(subjectData)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar Nueva Asignatura</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2 grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="subject">Asignatura</Label>
              <Input
                id="subjectName"
                placeholder="Ingrese nueva asignatura"
                {...register("subject_name")}
              />
              {errors.subject_name && (
                <span className="text-red-500">Este campo es obligatorio</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="showOnExpo">Mostrar en la feria</Label>
              <Controller
                name="showOnExpo"
                control={control}
                defaultValue={true}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value ? "true" : "false"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Sí</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.showOnExpo && (
                <span className="text-red-500">Este campo es obligatorio</span>
              )}
            </div>
          </div>
          <Button type="submit" className="mt-4">
            Guardar Asignatura
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
