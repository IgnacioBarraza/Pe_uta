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
import { useFirebase } from "@/hooks/useFirebase";
import { Project, Subject, UpdateProjectDto } from "@/utils/utils";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ProgressModal } from "../progressModal";
import { ErrorModal } from "../errorModal";

export const EditProjectForm = ({
  projects,
  subjects,
}: {
  projects: Project[];
  subjects: Subject[];
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateProjectDto>();
  const { updateProject } = useBackend();
  const { toast } = useToast();
  const { uploadProjectImage, deleteProjectImage } = useFirebase();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectSelect = (projectId) => {
    const selected = projects.find((project) => project.id === projectId)
    setSelectedProject(selected || null);
  };

  const onSubmit = async (updateProjectDto) => {
    let image_url;
    if (image) {
      deletePreviousImage(selectedProject.image_url);
      image_url = await handleUploadImage(image);
    }
  
    try {
      const membersArray = updateProjectDto.members?.trim().length 
        ? updateProjectDto.members.split(",").map((member) => member.trim())
        : selectedProject.members;
      const projectData = {
        project_name: updateProjectDto.project_name?.trim().length ? updateProjectDto.project_name : selectedProject.project_name,
        subject: updateProjectDto.subject?.id ? updateProjectDto.subject.id : selectedProject.subject.id,
        description: updateProjectDto.description?.trim().length ? updateProjectDto.description : selectedProject.description,
        members: membersArray,
        image_url: image_url || selectedProject.image_url,
      };

      const response = await updateProject(selectedProject.id, projectData);

      if (response.status === 201) {
        toast({
          title: "Proyecto actualizado con éxito",
        });
        reset();
        setImage(null);
        setPreview(null);
        setProgress(0);
        setSelectedProject(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError(null); // Reset error when a file is selected
    }
  };

  const handleUploadImage = (image: File) => {
    return new Promise<string>((resolve, reject) => {
      uploadProjectImage(
        image,
        (progress) => setProgress(progress),
        (error) => {
          setError(error);
          reject(error);
        },
        (downloadUrl) => {
          resolve(downloadUrl);
        }
      );
    });
  };

  const deletePreviousImage = (url: string) => {
    console.log(url)
    const decodedURL = decodeURIComponent(url);
    const parts = decodedURL.split('/');
    const fileNameWithToken = parts.pop();
    const fileName = fileNameWithToken.split('?')[0];
    console.log(fileName)
    deleteProjectImage(fileName)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Editar proyecto</CardTitle>
        <CardDescription>Selecciona el proyecto a editar.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label htmlFor="project">Seleccionar un proyecto</Label>
            <Select
              key="project"
              value={selectedProject?.id}
              onValueChange={handleProjectSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar proyecto" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={`${project.id}`}>
                    {project.project_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedProject && (
            <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="project_name">Nombre del Proyecto</Label>
                  <Input
                    id="project_name"
                    placeholder="Ingresa el nombre del proyecto"
                    {...register("project_name")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe el proyecto"
                    {...register("description")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="image">Imagen del Proyecto</Label>
                  <Input id="image" type="file" onChange={handleImageFile} />
                  {preview && (
                    <div className="mt-2">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                  {progress > 0 && <ProgressModal progress={progress} />}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Asignatura del proyecto</Label>
                  <Controller
                    name="subject"
                    control={control}
                    defaultValue={selectedProject.subject.subject_name || ""}
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
                              : "Seleccionar asignatura"}
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
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="members">Miembros del Proyecto</Label>
                <Textarea
                  id="members"
                  placeholder="Ingresa los nombres de los miembros del proyecto separados por comas"
                  {...register("members")}
                />
              </div>
              <CardFooter className="flex justify-end">
                <Button type="submit">Actualizar proyecto</Button>
              </CardFooter>
            </form>
          )}
        </div>
      </CardContent>
      {error && <ErrorModal error={error} />}
    </Card>
  );
};
