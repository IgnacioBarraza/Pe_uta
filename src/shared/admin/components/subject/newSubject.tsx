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
import { CreateSubjectDto } from "@/utils/interface";
import { useBackend } from "@/hooks/useBackend";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component
import { useDataProvider } from "@/hooks/useData";

export const NewSubjectForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateSubjectDto>();
  const { createSubject } = useBackend();
  const { addSubjectLocally } = useDataProvider()
  const { toast } = useToast();

  const onSubmit = async (subjectData: CreateSubjectDto) => {
    try {
      const response = await createSubject(subjectData);
      const { data, status } = response;
      if (status === 201) {
        addSubjectLocally(data);
        toast({
          title: "Asignatura agregada con éxito",
          variant: "default",
        });
        reset();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Hubo un problema al agregar la asignatura",
        variant: "destructive",
      });
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
            {/* Subject Name */}
            <div className="space-y-2">
              <Label htmlFor="subjectName">Asignatura</Label>
              <Input
                id="subjectName"
                placeholder="Ingrese nueva asignatura"
                {...register("subject_name", { required: true })}
              />
              {errors.subject_name && (
                <span className="text-red-500">Este campo es obligatorio</span>
              )}
            </div>
            {/* Show on Expo */}
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
            {/* Description */}
            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Descripción de la asignatura"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="text-red-500">Este campo es obligatorio</span>
              )}
            </div>
            {/* Subject Field */}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="subjectField">Campo de la asignatura</Label>
              <Input
                id="subjectField"
                placeholder="Ingrese el campo de la asignatura (e.g., Ciencia, Tecnología)"
                {...register("subject_field", { required: true })}
              />
              {errors.subject_field && (
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
