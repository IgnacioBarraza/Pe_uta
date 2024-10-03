import { useBackend } from "@/hooks/useBackend";
import { Subject, SubjectProps, UpdateSubjectDto } from "@/utils/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

export const EditSubject = ({ subjects }: SubjectProps) => {
  const { register, handleSubmit, control, reset } =
    useForm<UpdateSubjectDto>();
  const { updateSubject } = useBackend();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const { toast } = useToast();

  const onSubmit = async (updateSubjectData: UpdateSubjectDto) => {
    try {
      const response = await updateSubject(
        selectedSubject.id,
        updateSubjectData
      );
      const { data, status } = response;
      if (status === 200) {
        toast({
          title: "Asignatura actualizada con exito",
          variant: "default",
        });
        setSelectedSubject(null);
        reset();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Hubo un problema al actualizar la asignatura",
        variant: "destructive",
      });
    }
  };

  const handleSubjectSelect = (subjectId) => {
    const selected = subjects.find((subject) => subject.id === subjectId);
    setSelectedSubject(selected || null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Editar asignatura</CardTitle>
        <CardDescription>Selecciona la asignatura a editar</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label htmlFor="subject">Seleccionar una asignatura</Label>
            <Select
              key="subject"
              value={selectedSubject?.id}
              onValueChange={handleSubjectSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar asignatura" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={`${subject.id}`}>
                    {subject.subject_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedSubject && (
            <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre de la asignatura</Label>
                  <Input
                    id="subjectName"
                    placeholder="Ingrese nueva asignatura"
                    {...register("subject_name", {
                      value: selectedSubject.subject_name,
                    })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">Mostrar en la feria</Label>
                  <Controller
                    name="showOnExpo"
                    control={control}
                    defaultValue={selectedSubject?.showOnExpo || false}
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) =>
                          field.onChange(value === "true")
                        }
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
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Descripción de la asignatura"
                    {...register("description", { value: selectedSubject.description })}
                  />
                </div>
                {/* Subject Field */}
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="subjectField">Campo de la asignatura</Label>
                  <Input
                    id="subjectField"
                    placeholder="Ingrese el campo de la asignatura (e.g., Ciencia, Tecnología)"
                    {...register("subject_field", { value: selectedSubject.subject_field })}
                  />
                </div>
              </div>
              <CardFooter className="flex justify-end">
                <Button type="submit">Actualizar asignatura</Button>
              </CardFooter>
            </form>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
