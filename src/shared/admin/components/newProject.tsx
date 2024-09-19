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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useBackend } from "@/hooks/useBackend";
import { CreateProjectDto, SubjectProps } from "@/utils/utils";
import { useForm, Controller } from "react-hook-form";

export const NewProjectForm = ({ subjects }: SubjectProps) => {
  const { 
    register, 
    handleSubmit, 
    control, 
    reset,
    formState: { errors }
  } = useForm<CreateProjectDto>();
  const { createProject } = useBackend()
  const { toast } = useToast()

  const onSubmit = async (createProjectData) => {
    const membersArray = createProjectData.members
      .split(",")
      .map((member) => member.trim());

    const projectData: CreateProjectDto = {
      ...createProjectData,
      members: membersArray,
    };

    try {
      const response = await createProject(projectData);
      console.log(response);
      const { data, status } = response
      if (status === 201) {
        toast({
          title: 'Proyecto creado con exito'
        })
        reset()
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Agregar Nuevo Proyecto</CardTitle>
        <CardDescription>
          Rellene el siguiente formulario para crear un nuevo proyecto para la
          exposición.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="project_name">Nombre del Proyecto</Label>
              <Input
                id="project_name"
                name="project_name"
                placeholder="Ingresa el nombre del proyecto"
                {...register('project_name', { required: true })}
              />
              {errors.project_name && (
                <span className="text-red-500">Este campo es obligatorio</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe el proyecto"
                {...register('description', { required: true })}
              />
              {errors.description && (
                <span className="text-red-500">Este campo es obligatorio</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="image">Imagen del Proyecto</Label>
              <Input id="image" type="file" {...register('image_url', { required: true })}/>
              {errors.image_url && (
                <span className="text-red-500">Este campo es obligatorio</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Asignatura del proyecto</Label>
              <Controller
                name="subject"
                control={control}
                defaultValue="Seleccionar asignatura"
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {field.value
                          ? subjects.find(
                              (subject) => subject.id === field.value
                            )?.subject_name
                          : "Seleccionar asignatura" }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.subject_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.subject && (
                <span className="text-red-500">Este campo es obligatorio</span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="members">Miembros del Proyecto</Label>
            <Textarea
              id="members"
              name="members"
              placeholder="Ingresa los nombres de los miembros del proyecto separados por comas"
              {...register('members', { required: true })}
            />
            {errors.image_url && (
              <span className="text-red-500">Este campo es obligatorio</span>
            )}
          </div>
          <CardFooter className="flex justify-end">
            <Button type="submit">Guardar proyecto</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
